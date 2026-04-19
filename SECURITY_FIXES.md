# Email Integration Security Fixes

## ✅ Fixed (Critical & High Priority)

### 1. Server-Side File Validation ✅
**What was wrong:** Files were only validated in the browser, which can be bypassed.

**Fixed in:** `src/app/api/enquiry/route.ts`
- Added server-side MIME type validation
- Enforces file count limit (max 3)
- Validates file types against allowlist
- Updated size limit to 4MB (matches Vercel limits)

### 2. Content-Type Validation ✅
**What was wrong:** API endpoint didn't verify request Content-Type, allowing CSRF attacks.

**Fixed in:** `src/app/api/enquiry/route.ts`
- Added Content-Type header check
- Returns 415 error if not `application/json`

### 3. Comprehensive Validation Schema ✅
**What was wrong:** Missing validation for attachments, no max lengths, weak phone validation.

**Fixed in:** `src/lib/validation/enquiry.ts`
- Added max length limits for all fields
- Improved phone number regex validation
- Added full Zod schema for attachments
- Enforced honeypot must be empty
- Prevents DoS through oversized payloads

### 4. TypeScript Type Safety ✅
**What was wrong:** Using implicit `any` types for attachments.

**Fixed in:** `src/types/enquiry.ts` and `src/app/api/enquiry/route.ts`
- Created `FileAttachment` interface
- Proper typing throughout API route

### 5. Improved Error Logging ✅
**What was wrong:** Logging full error objects could expose sensitive data.

**Fixed in:** `src/app/api/enquiry/route.ts`
- Only logs safe error properties (message, name)
- Adds helpful metadata to success logs (recipient, attachment count)

### 6. Better IP Detection ✅
**What was wrong:** IP spoofing possible through header manipulation.

**Fixed in:** `src/app/api/enquiry/route.ts`
- Takes first IP from `x-forwarded-for` chain
- Properly handles Vercel's proxy setup

### 7. UI Size Limit Update ✅
**What was wrong:** UI said 5MB per file but Vercel limits to 4.5MB total.

**Fixed in:** `src/components/content/enquiry-form.tsx`
- Updated message to say "4MB total"
- Matches actual server validation

---

## ⚠️ Action Required (Critical - Do Before Production)

### 1. Rotate Resend API Key 🔴 URGENT
**Why:** Your API key was exposed during code review.

**Steps:**
1. Go to https://resend.com/api-keys
2. Delete your current key
3. Create a new key
4. Update `.env.local` with new key:
   ```
   RESEND_API_KEY=your_new_key_here
   ```
5. Add to Vercel environment variables (for production)

### 2. Verify Domain & Update "From" Address 🔴 CRITICAL
**Why:** Using `onboarding@resend.dev` looks unprofessional and may be flagged as spam.

**Steps:**
1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Add your domain (e.g., `taraniselectrical.com`)
4. Add the DNS records shown (SPF, DKIM, DMARC)
5. Wait for verification (usually ~10 minutes)
6. Update `src/app/api/enquiry/route.ts` line 98:
   ```typescript
   from: 'Taranis Electrical <enquiries@taraniselectrical.com>',
   ```

---

## 📋 Known Limitations (Acceptable for MVP)

### Rate Limiting Resets on Deploy
**Issue:** In-memory rate limiter resets when Vercel deploys new version.

**Impact:** Spammers could bypass rate limits by waiting for deployments.

**Mitigation Options:**
1. Accept limitation (probably fine for small business)
2. Upgrade to Vercel KV for persistent rate limiting
3. Use Upstash Redis (free tier available)

**Recommendation:** Monitor for abuse in first week. Upgrade if needed.

---

## 🔒 Security Features Implemented

✅ Server-side validation (Zod)  
✅ Rate limiting (5 requests/hour per IP)  
✅ Honeypot spam protection  
✅ XSS protection (HTML escaping)  
✅ File type validation (client + server)  
✅ File size limits (4MB total)  
✅ CSRF protection (Content-Type check)  
✅ Input sanitization  
✅ Max length validation (prevents DoS)  
✅ Type safety (TypeScript)  
✅ Secure error handling  

---

## 📝 Pre-Production Checklist

### Configuration
- [ ] Rotate Resend API key
- [ ] Verify domain in Resend
- [ ] Update "from" email address
- [ ] Set `ENQUIRY_EMAIL=taraniselectrical@outlook.com` in Vercel
- [ ] Set new `RESEND_API_KEY` in Vercel
- [ ] Configure DNS records (SPF, DKIM, DMARC)

### Testing
- [ ] Test form submission with valid data
- [ ] Test with 0, 1, 2, 3 files
- [ ] Test file type validation (try uploading .exe)
- [ ] Test file size limits (try 5MB file)
- [ ] Test rate limiting (submit 6 times quickly)
- [ ] Test all validation errors
- [ ] Check email arrives in spam folder or inbox
- [ ] Test on mobile devices

### Monitoring
- [ ] Check Vercel logs after first submissions
- [ ] Monitor Resend dashboard for delivery rates
- [ ] Check email quota (100/day on free tier)
- [ ] Set up alerts for API errors

---

## 🚀 Deployment to Production

### Vercel Environment Variables
Add these in Vercel dashboard → Project → Settings → Environment Variables:

```
RESEND_API_KEY=re_your_new_production_key
ENQUIRY_EMAIL=taraniselectrical@outlook.com
```

### Post-Deployment Verification
1. Submit test enquiry from live site
2. Check email arrives at taraniselectrical@outlook.com
3. Verify formatting is correct
4. Test "reply" goes to customer's email
5. Monitor Vercel logs for errors

---

## 📊 What's Working Well

✅ Clean code structure  
✅ Good separation of concerns  
✅ Excellent user experience (loading states, clear errors)  
✅ Professional email template  
✅ Accessibility (labels, ARIA)  
✅ Mobile responsive form  
✅ TypeScript type safety  
✅ Environment-based configuration  

---

## 📞 Support

If you see any errors in production:
1. Check Vercel logs (dashboard → project → Logs)
2. Check Resend dashboard (https://resend.com/emails)
3. Verify environment variables are set correctly
4. Check DNS records if emails aren't delivering

**Free tier limits:**
- Resend: 100 emails/day, 3,000/month
- Vercel: 4.5MB request body limit
