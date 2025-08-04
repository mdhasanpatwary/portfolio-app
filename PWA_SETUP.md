# PWA Setup Guide - MD Hasan Patwary Portfolio

## Environment Variables

Create a `.env.local` file in your project root with the following VAPID keys:

```env
# VAPID Keys for Push Notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BMpbEZsM3-CnQxiu2lbVf1FmiEelsZqWllZSm8BV6VnFk25PVIUZzI_dfDu0SRJghVsAD5i0drl9ioPwchbKWKE
VAPID_PRIVATE_KEY=mZNA4E8ureaYE-InqTF_DU-_FTJxtFIsvSR29_qi8RE
```

## PWA Features Implemented

1. **Web App Manifest** - Updated with comprehensive PWA properties
2. **Service Worker** - Handles caching, push notifications, and offline functionality
3. **Push Notifications** - Enable/disable notifications with proper permissions
4. **Install Prompt** - Custom install prompt for PWA installation
5. **Security Headers** - Added security headers for PWA protection

## Testing Locally

To test PWA features locally:

1. Run with HTTPS: `yarn dev --experimental-https`
2. Accept notification permissions when prompted
3. Test install prompt (Chrome/Edge)
4. Test push notifications

## Production Deployment

For production deployment:

1. Ensure HTTPS is enabled
2. Email already configured: `patwary.dev@gmail.com`
3. Consider implementing database storage for subscriptions
4. Test all PWA features on production
5. Portfolio URL: `https://patwary.vercel.app`

## PWA Capabilities

- ✅ Offline functionality
- ✅ Push notifications
- ✅ Install to home screen
- ✅ App-like experience
- ✅ Background sync (framework ready)
- ✅ Security headers
- ✅ Service worker caching

## Portfolio Information

- **Name**: MD Hasan Patwary
- **Title**: Front-End Web Developer
- **Experience**: 6+ Years
- **Location**: Dhaka, Bangladesh
- **Email**: patwary.dev@gmail.com
- **Phone**: +8801783721411
- **Skills**: HTML, CSS, JavaScript, jQuery, React, Next.js, Docker, AWS
- **Highlights**: Leader in Scalable Web Apps, Delivered for 30K+ Global Clients
