# EaseTalk Website Project Status

Last updated: 2026-06-03

## Project Location

- Local folder: `C:\Users\HP\easetalk-website`
- Frontend folder: `C:\Users\HP\easetalk-website\frontend`
- Current hosting target: Vercel project `easetalk-website` for `https://www.easetalk.in`

## Website Structure

- React frontend built with CRACO/Create React App.
- Public landing page is in `frontend/src/App.js`.
- Admin dashboard page is in `frontend/src/AdminDashboard.js`.
- Hostinger Apache routing file is in `frontend/public/.htaccess`.
- Runtime admin configuration file is in `frontend/public/admin-config.js`.

## Completed Work

- Existing landing page inspected and kept intact.
- Laptop admin dashboard added at `/admin` but hidden from public navigation/footer links.
- Admin dashboard connects to Supabase RPC `easetalk_admin_dashboard_report`.
- Dashboard requires owner phone number and hidden admin code before showing data.
- Dashboard shows profiles, active subscriptions, grace, expired, trials, blocked trials and recent subscription activity.
- Dashboard includes CSV download for scrutiny/reporting.
- Owner/super admin can appoint authorised admin persons with limited duties.
- Major add/remove/amend actions now use an owner-consent approval queue before they are treated as approved.
- Admin dashboard access, authorised admin changes and approval decisions are logged in Supabase audit tables after the updated SQL is run.
- Google Play download button added to the landing page and download banner.
- Footer links now open working pages: Privacy Policy, Terms & Conditions, Refund Policy, Support Policy and Rules & Regulations.
- Website legal pages expanded into stronger official English legal versions covering microphone/audio processing, STT/TTS, AI-generated content, subscriptions, trial abuse prevention, device ID, accessibility disclaimers, third-party services and user rights.
- Official legal note added to legal pages: English is the official version, Hindi/Kannada translations may be provided for convenience, and English prevails if there is any conflict.
- Account Deletion page added at `/delete-account` for Google Play account deletion compliance.
- Footer now displays Rashi Bhartiya Innovation LLP, Bengaluru, Karnataka, India, support email `support@easetalk.in` and general information email `info@easetalk.in`.
- Google Play URL is configurable from `frontend/public/admin-config.js` / `frontend/build/admin-config.js`.
- Website visitor counter added using Supabase RPC `easetalk_record_website_visit`.
- Vercel rewrite support retained so `/admin`, `/privacy`, `/terms`, `/refund`, `/support`, `/rules` and `/delete-account` can be opened directly.
- Hostinger refresh support also exists through `.htaccess` if hosting is moved later.
- Runtime Supabase config added through `admin-config.js`, so Hostinger values can be changed without editing React source.
- Production build tested successfully with `cmd /c npm run build`.

## Files Added Or Changed

- `frontend/src/AdminDashboard.js` - web admin dashboard with owner verification, limited-admin access and owner approval queue.
- `frontend/src/LegalPages.js` - website legal/support/rules/account-deletion pages.
- `frontend/src/App.js` - routes `/admin` and legal pages; admin route is not publicly linked.
- `frontend/public/admin-config.js` - Supabase URL/key configuration for Hostinger upload.
- `frontend/public/.htaccess` - Apache rewrite support for React routes.
- `supabase_website_visitor_counter.sql` - Supabase setup for public website visit counting.
- `frontend/vercel.json` - Vercel rewrite support retained, but Hostinger is now preferred.
- `frontend/.env.example` - example frontend env names.

## Before Deploying / Publishing

1. Run `supabase_website_visitor_counter.sql` once in Supabase SQL Editor.
2. Open `frontend/public/admin-config.js`.
3. Replace:
   - `https://your-project.supabase.co`
   - `your-supabase-anon-public-key`
   - Confirm or update `playStoreUrl`.
4. Run build:
   ```powershell
   cd C:\Users\HP\easetalk-website\frontend
   cmd /c npm run build
   ```
5. For Vercel, commit and push the website repo. Vercel should deploy automatically from GitHub.
6. If using Hostinger later, upload the contents inside `frontend/build` to Hostinger `public_html`.
7. Confirm these files exist in Hostinger `public_html` after upload:
   - `index.html`
   - `admin-config.js`
   - `.htaccess`
   - `static/` folder
8. Run the updated `C:\Users\HP\EaseTalk\supabase_admin_role_security.sql` in the mobile app Supabase project so limited authorised admin, owner approval and audit-log functions are created.
9. Open `https://www.easetalk.in/admin` directly and verify owner login. This link is intentionally hidden from public website navigation.
10. As owner, create one test authorised admin with limited duties and verify that only assigned cards/data are visible.
11. As that limited admin, submit one test change request; then log in as owner and approve/reject it from the approval queue.
12. Open `https://www.easetalk.in` and verify the Google Play button and visitor counter.
13. Check footer/legal links:
   - `https://www.easetalk.in/privacy`
   - `https://www.easetalk.in/terms`
   - `https://www.easetalk.in/refund`
   - `https://www.easetalk.in/support`
   - `https://www.easetalk.in/rules`
   - `https://www.easetalk.in/delete-account`
14. In Google Play Console, use:
   - Privacy Policy URL: `https://www.easetalk.in/privacy`
   - Account deletion URL: `https://www.easetalk.in/delete-account`

## Important Security Notes

- The Supabase anon key is public by design and can be used in frontend code.
- Real protection is handled by Supabase RPC verification using owner phone plus hidden admin code.
- Do not put Supabase service-role key in the website.
- Do not expose admin data without the `easetalk_admin_dashboard_report` verification function.
- Limited admins can see only the duty areas selected by owner/super admin.
- Major data changes should be submitted through the approval queue; owner/super admin gives final consent.

## Pending / Future Improvements

- Optional: move admin dashboard to `https://admin.easetalk.in` later.
- Optional: add a separate backend API only if needed for server-side private operations.
- Optional: remove old Emergent/PostHog scripts if not required for production analytics.
- Optional: replace the Play Store URL after Google Play listing is fully live if package/listing URL changes.
- Optional: add full reviewed Hindi/Kannada legal translations later; English is currently the official legal version.
- Optional: create a separate owner screen for applying approved change requests automatically after policy is finalized.
