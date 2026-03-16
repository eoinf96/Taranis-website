import { promises as fs } from 'fs'
import path from 'path'

interface ComputedStyle {
  tagName: string
  className: string
  styles: {
    color: string
    backgroundColor: string
    fontSize: string
    fontFamily: string
    fontWeight: string
    lineHeight: string
    letterSpacing: string
    margin: string
    padding: string
    borderRadius: string
    border: string
    boxShadow: string
  }
}

interface SiteInventory {
  pages: Array<{
    computedStyles: ComputedStyle[]
  }>
}

interface DesignTokens {
  colors: {
    primary: Record<string, string>
    secondary: Record<string, string>
    neutral: Record<string, string>
    semantic: Record<string, string>
  }
  typography: {
    fontFamily: Record<string, string>
    fontSize: Record<string, string>
    fontWeight: Record<string, string>
    lineHeight: Record<string, string>
  }
  spacing: Record<string, string>
  borderRadius: Record<string, string>
  boxShadow: Record<string, string>
}

class DesignTokenExtractor {
  private inventory: SiteInventory
  private colors: Set<string> = new Set()
  private fontSizes: Set<string> = new Set()
  private fontFamilies: Set<string> = new Set()
  private fontWeights: Set<string> = new Set()
  private lineHeights: Set<string> = new Set()
  private spacings: Set<string> = new Set()
  private borderRadii: Set<string> = new Set()
  private boxShadows: Set<string> = new Set()

  constructor(inventory: SiteInventory) {
    this.inventory = inventory
  }

  private parseColor(color: string): string | null {
    if (!color || color === 'rgba(0, 0, 0, 0)' || color === 'transparent') return null
    
    // Convert rgb/rgba to hex
    if (color.startsWith('rgb')) {
      const match = color.match(/\\d+/g)
      if (match && match.length >= 3) {
        const [r, g, b] = match.map(Number)
        const toHex = (n: number) => n.toString(16).padStart(2, '0')
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`
      }
    }
    
    return color
  }

  private extractValues() {
    this.inventory.pages.forEach(page => {
      page.computedStyles.forEach(style => {
        // Colors
        const color = this.parseColor(style.styles.color)
        const bgColor = this.parseColor(style.styles.backgroundColor)
        if (color) this.colors.add(color)
        if (bgColor) this.colors.add(bgColor)

        // Typography
        if (style.styles.fontSize && style.styles.fontSize !== '16px') {
          this.fontSizes.add(style.styles.fontSize)
        }
        if (style.styles.fontFamily) {
          this.fontFamilies.add(style.styles.fontFamily)
        }
        if (style.styles.fontWeight) {
          this.fontWeights.add(style.styles.fontWeight)
        }
        if (style.styles.lineHeight && style.styles.lineHeight !== 'normal') {
          this.lineHeights.add(style.styles.lineHeight)
        }

        // Spacing (extract from margin/padding)
        const spacing = [style.styles.margin, style.styles.padding]
        spacing.forEach(space => {
          if (space && space !== '0px') {
            const values = space.split(' ')
            values.forEach(val => {
              if (val && val !== '0px') this.spacings.add(val)
            })
          }
        })

        // Border radius
        if (style.styles.borderRadius && style.styles.borderRadius !== '0px') {
          this.borderRadii.add(style.styles.borderRadius)
        }

        // Box shadows
        if (style.styles.boxShadow && style.styles.boxShadow !== 'none') {
          this.boxShadows.add(style.styles.boxShadow)
        }
      })
    })
  }

  private clusterColors(): { primary: Record<string, string>; secondary: Record<string, string>; neutral: Record<string, string>; semantic: Record<string, string> } {
    const colorArray = Array.from(this.colors)
    
    // Simple color clustering - in a real implementation, you'd use color distance algorithms
    const primary: Record<string, string> = {}
    const secondary: Record<string, string> = {}
    const neutral: Record<string, string> = {}
    const semantic: Record<string, string> = {}

    colorArray.forEach((color, index) => {
      // This is a simplified clustering - you'd want more sophisticated color analysis
      const key = `${index + 1}00`
      
      if (color.includes('#')) {
        const hex = color.toLowerCase()
        
        // Simple heuristics for color categorization
        if (hex.includes('ff') || hex.includes('00')) {
          if (hex === '#ffffff' || hex === '#000000') {
            neutral[key] = color
          } else {
            primary[key] = color
          }
        } else {
          secondary[key] = color
        }
      } else {
        neutral[key] = color
      }
    })

    // Add common semantic colors
    semantic['success'] = '#10b981'
    semantic['warning'] = '#f59e0b'
    semantic['error'] = '#ef4444'
    semantic['info'] = '#3b82f6'

    return { primary, secondary, neutral, semantic }
  }

  private generateFontScale(): Record<string, string> {
    const sizes = Array.from(this.fontSizes)
      .map(size => parseFloat(size))
      .filter(size => !isNaN(size))
      .sort((a, b) => a - b)

    const scale: Record<string, string> = {}
    const sizeNames = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl']

    sizes.forEach((size, index) => {
      const name = sizeNames[index] || `${index + 1}xl`
      scale[name] = `${size}px`
    })

    return scale
  }

  private generateSpacingScale(): Record<string, string> {
    const spacings = Array.from(this.spacings)
      .map(space => parseFloat(space))
      .filter(space => !isNaN(space) && space > 0)
      .sort((a, b) => a - b)

    const scale: Record<string, string> = {}
    
    spacings.forEach((space, index) => {
      // Convert to rem (assuming 16px base)
      const rem = space / 16
      scale[`${index + 1}`] = `${rem}rem`
    })

    return scale
  }

  extractTokens(): DesignTokens {
    this.extractValues()

    const colors = this.clusterColors()
    
    return {
      colors,
      typography: {
        fontFamily: {
          sans: Array.from(this.fontFamilies)[0] || 'system-ui, sans-serif',
          serif: 'Georgia, serif',
          mono: 'Monaco, monospace'
        },
        fontSize: this.generateFontScale(),
        fontWeight: {
          normal: '400',
          medium: '500',
          semibold: '600',
          bold: '700'
        },
        lineHeight: {
          tight: '1.25',
          normal: '1.5',
          loose: '1.75'
        }
      },
      spacing: this.generateSpacingScale(),
      borderRadius: {
        none: '0px',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px'
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
      }
    }
  }
}

async function main() {
  const inventoryPath = path.join(process.cwd(), 'scripts/output/site-inventory.json')
  
  try {
    // Read the site inventory
    const inventoryData = await fs.readFile(inventoryPath, 'utf-8')
    const inventory: SiteInventory = JSON.parse(inventoryData)

    // Extract design tokens
    const extractor = new DesignTokenExtractor(inventory)
    const tokens = extractor.extractTokens()

    // Save tokens
    const tokensPath = path.join(process.cwd(), 'scripts/output/design-tokens.json')
    await fs.writeFile(tokensPath, JSON.stringify(tokens, null, 2))

    // Generate Tailwind config
    const tailwindConfig = generateTailwindConfig(tokens)
    const configPath = path.join(process.cwd(), 'tailwind.config.extracted.js')
    await fs.writeFile(configPath, tailwindConfig)

    console.log('✅ Design tokens extracted successfully!')
    console.log(`📄 Tokens saved to: ${tokensPath}`)
    console.log(`⚙️  Tailwind config saved to: ${configPath}`)

  } catch (error) {
    console.error('Failed to extract design tokens:', error)
    process.exit(1)
  }
}

function generateTailwindConfig(tokens: DesignTokens): string {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: ${JSON.stringify(tokens.colors, null, 6)},
      fontFamily: ${JSON.stringify(tokens.typography.fontFamily, null, 6)},
      fontSize: ${JSON.stringify(tokens.typography.fontSize, null, 6)},
      fontWeight: ${JSON.stringify(tokens.typography.fontWeight, null, 6)},
      lineHeight: ${JSON.stringify(tokens.typography.lineHeight, null, 6)},
      spacing: ${JSON.stringify(tokens.spacing, null, 6)},
      borderRadius: ${JSON.stringify(tokens.borderRadius, null, 6)},
      boxShadow: ${JSON.stringify(tokens.boxShadow, null, 6)}
    },
  },
  plugins: [],
}`
}

if (require.main === module) {
  main()
}