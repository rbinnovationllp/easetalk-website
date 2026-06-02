# EaseTalk Website Project Status

Last updated: 2026-06-02

## Project Location

- Local folder: `C:\Users\HP\easetalk-website`
- Frontend folder: `C:\Users\HP\easetalk-website\frontend`
- Current hosting target: Hostinger for `https://www.easetalk.in`

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
- Google Play URL is configurable from `frontend/public/admin-config.js` / `frontend/build/admin-config.js`.
- Website visitor counter added using Supabase RPC `easetalk_record_website_visit`.
- Hostinger refresh support added through `.htaccess`, so `/admin` can be opened directly.
- Runtime Supabase config added through `admin-config.js`, so Hostinger values can be changed without editing React source.
- Production build tested successfully with `cmd /c npm run build`.

## Files Added Or Changed

- `frontend/src/AdminDashboard.js` - web admin dashboard with owner verification, limited-admin access and owner approval queue.
- `frontend/src/LegalPages.js` - website legal/support/rules pages.
- `frontend/src/App.js` - routes `/admin` and legal pages; admin route is not publicly linked.
- `frontend/public/admin-config.js` - Supabase URL/key configuration for Hostinger upload.
- `frontend/public/.htaccess` - Apache rewrite support for React routes.
- `supabase_website_visitor_counter.sql` - Supabase setup for public website visit counting.
- `frontend/vercel.json` - Vercel rewrite support retained, but Hostinger is now preferred.
- `frontend/.env.example` - example frontend env names.

## Before Uploading To Hostinger

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
5. Upload the contents inside `frontend/build` to Hostinger `public_html`.
6. Confirm these files exist in Hostinger `public_html` after upload:
   - `index.html`
   - `admin-config.js`
   - `.htaccess`
   - `static/` folder
7. Run the updated `C:\Users\HP\EaseTalk\supabase_admin_role_security.sql` in the mobile app Supabase project so limited authorised admin, owner approval and audit-log functions are created.
8. Open `https://www.easetalk.in/admin` directly and verify owner login. This link is intentionally hidden from public website navigation.
9. As owner, create one test authorised admin with limited duties and verify that only assigned cards/data are visible.
10. As that limited admin, submit one test change request; then log in as owner and approve/reject it from the approval queue.
11. Open `https://www.easetalk.in` and verify the Google Play button and visitor counter.
12. Check footer links:
   - `https://www.easetalk.in/privacy`
   - `https://www.easetalk.in/terms`
   - `https://www.easetalk.in/refund`
   - `https://www.easetalk.in/support`
   - `https://www.easetalk.in/rules`

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
- Optional: add Hindi/Kannada versions of website legal pages later if desired.
- Optional: create a separate owner screen for applying approved change requests automatically after policy is finalized.
