import { chromium, Browser, Page } from 'playwright'
import { promises as fs } from 'fs'
import path from 'path'
import { URL } from 'url'

interface PageData {
  url: string
  title: string
  html: string
  computedStyles: any[]
  images: string[]
  fonts: string[]
  screenshots: {
    desktop: string
    mobile: string
  }
}

interface SiteInventory {
  baseUrl: string
  crawledAt: string
  pages: PageData[]
  assets: {
    images: string[]
    fonts: string[]
    styles: string[]
  }
}

class SiteCrawler {
  private browser: Browser | null = null
  private baseUrl: string
  private outputDir: string

  constructor(baseUrl: string, outputDir: string = './scripts/output') {
    this.baseUrl = baseUrl
    this.outputDir = outputDir
  }

  async init() {
    this.browser = await chromium.launch({ headless: true })
    await fs.mkdir(this.outputDir, { recursive: true })
    await fs.mkdir(path.join(this.outputDir, 'screenshots'), { recursive: true })
    await fs.mkdir(path.join(this.outputDir, 'assets'), { recursive: true })
  }

  async crawlPage(url: string): Promise<PageData> {
    if (!this.browser) throw new Error('Browser not initialized')

    const page = await this.browser.newPage()
    console.log(`Crawling: ${url}`)

    try {
      // Navigate to page with network idle
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.waitForLoadState('domcontentloaded')

      // Get page title and HTML
      const title = await page.title()
      const html = await page.content()

      // Extract computed styles for design tokens
      const computedStyles = await page.evaluate(() => {
        const styles: any[] = []
        const elements = document.querySelectorAll('*')
        
        elements.forEach((el) => {
          const computed = window.getComputedStyle(el)
          const tagName = el.tagName.toLowerCase()
          
          // Only capture styles for meaningful elements
          if (['body', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'button', 'div', 'section', 'header', 'nav', 'main', 'footer'].includes(tagName)) {
            styles.push({
              tagName,
              className: el.className,
              styles: {
                color: computed.color,
                backgroundColor: computed.backgroundColor,
                fontSize: computed.fontSize,
                fontFamily: computed.fontFamily,
                fontWeight: computed.fontWeight,
                lineHeight: computed.lineHeight,
                letterSpacing: computed.letterSpacing,
                margin: computed.margin,
                padding: computed.padding,
                borderRadius: computed.borderRadius,
                border: computed.border,
                boxShadow: computed.boxShadow,
              }
            })
          }
        })
        
        return styles
      })

      // Extract image sources
      const images = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'))
        return imgs.map(img => img.src).filter(src => src && !src.startsWith('data:'))
      })

      // Extract font URLs
      const fonts = await page.evaluate(() => {
        const fontUrls: string[] = []
        Array.from(document.styleSheets).forEach(sheet => {
          try {
            Array.from(sheet.cssRules).forEach(rule => {
              if (rule.type === CSSRule.FONT_FACE_RULE) {
                const fontFaceRule = rule as CSSFontFaceRule
                const src = fontFaceRule.style.getPropertyValue('src')
                if (src) {
                  const urlMatch = src.match(/url\\(['""]?([^'""\\)]+)['""]?\\)/)
                  if (urlMatch && urlMatch[1]) {
                    fontUrls.push(urlMatch[1])
                  }
                }
              }
            })
          } catch (e) {
            // Skip cross-origin stylesheets
          }
        })
        return fontUrls
      })

      // Take screenshots
      const urlPath = new URL(url).pathname.replace(/\\/g, '_').replace(/^_/, '') || 'home'
      
      // Desktop screenshot (1440px)
      await page.setViewportSize({ width: 1440, height: 900 })
      const desktopScreenshot = `screenshots/${urlPath}_desktop.png`
      await page.screenshot({
        path: path.join(this.outputDir, desktopScreenshot),
        fullPage: true
      })

      // Mobile screenshot (390px)
      await page.setViewportSize({ width: 390, height: 844 })
      const mobileScreenshot = `screenshots/${urlPath}_mobile.png`
      await page.screenshot({
        path: path.join(this.outputDir, mobileScreenshot),
        fullPage: true
      })

      await page.close()

      return {
        url,
        title,
        html,
        computedStyles,
        images,
        fonts,
        screenshots: {
          desktop: desktopScreenshot,
          mobile: mobileScreenshot
        }
      }
    } catch (error) {
      await page.close()
      throw error
    }
  }

  async downloadAsset(url: string, filename: string): Promise<void> {
    if (!this.browser) return

    try {
      const page = await this.browser.newPage()
      const response = await page.goto(url)
      
      if (response && response.ok()) {
        const buffer = await response.body()
        await fs.writeFile(path.join(this.outputDir, 'assets', filename), buffer)
        console.log(`Downloaded: ${filename}`)
      }
      
      await page.close()
    } catch (error) {
      console.warn(`Failed to download ${url}:`, error)
    }
  }

  async crawlSite(): Promise<SiteInventory> {
    const inventory: SiteInventory = {
      baseUrl: this.baseUrl,
      crawledAt: new Date().toISOString(),
      pages: [],
      assets: {
        images: [],
        fonts: [],
        styles: []
      }
    }

    // Define pages to crawl based on the plan
    const pagesToCrawl = [
      this.baseUrl, // Home
      `${this.baseUrl}/services`,
      `${this.baseUrl}/projects`,
      `${this.baseUrl}/about`,
      `${this.baseUrl}/contact`,
      `${this.baseUrl}/privacy`,
      `${this.baseUrl}/terms`
    ]

    // Crawl each page
    for (const url of pagesToCrawl) {
      try {
        const pageData = await this.crawlPage(url)
        inventory.pages.push(pageData)

        // Collect unique assets
        pageData.images.forEach(img => {
          if (!inventory.assets.images.includes(img)) {
            inventory.assets.images.push(img)
          }
        })

        pageData.fonts.forEach(font => {
          if (!inventory.assets.fonts.includes(font)) {
            inventory.assets.fonts.push(font)
          }
        })
      } catch (error) {
        console.warn(`Failed to crawl ${url}:`, error)
      }
    }

    // Download key assets (limit to prevent overwhelming)
    const imagesToDownload = inventory.assets.images.slice(0, 20) // Limit to first 20 images
    for (const imageUrl of imagesToDownload) {
      try {
        const filename = path.basename(new URL(imageUrl).pathname) || 'image.jpg'
        await this.downloadAsset(imageUrl, filename)
      } catch (error) {
        console.warn(`Skipping invalid image URL: ${imageUrl}`)
      }
    }

    // Save inventory
    await fs.writeFile(
      path.join(this.outputDir, 'site-inventory.json'),
      JSON.stringify(inventory, null, 2)
    )

    console.log(`\\n✅ Site crawl completed!`)
    console.log(`📄 ${inventory.pages.length} pages crawled`)
    console.log(`🖼️  ${inventory.assets.images.length} images found`)
    console.log(`🔤 ${inventory.assets.fonts.length} fonts found`)
    console.log(`📁 Output saved to: ${this.outputDir}`)

    return inventory
  }

  async close() {
    if (this.browser) {
      await this.browser.close()
    }
  }
}

async function main() {
  const siteUrl = 'https://taraniselectrical.co.uk'
  const crawler = new SiteCrawler(siteUrl)

  try {
    await crawler.init()
    await crawler.crawlSite()
  } catch (error) {
    console.error('Crawling failed:', error)
    process.exit(1)
  } finally {
    await crawler.close()
  }
}

// Run the crawler
if (require.main === module) {
  main()
}