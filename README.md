# VibeKit Studio

> Generate a theme, build a mini-site, publish it.

## Live URL
https://inspiring-salmiakki-b036cf.netlify.app

## Local Setup

1. Clone the repo
   git clone https://github.com/astha-issrani/vibekit-studio.git
   cd vibekit-studio

2. Install dependencies
   npm install

3. Create .env file with these variables:
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   JWT_SECRET=your_jwt_secret
   DATABASE_URL=your_postgres_connection_string

4. Run locally
   netlify dev

5. Open http://localhost:8888

## Environment Variables Required
- VITE_SUPABASE_URL — Supabase project URL
- VITE_SUPABASE_ANON_KEY — Supabase publishable key
- JWT_SECRET — Random 32-byte hex string for signing JWTs
- DATABASE_URL — PostgreSQL connection string (Supabase pooler URL)

## Test Credentials
Sign up with any email/password at /signup

## Auth Approach
JWT stored in httpOnly cookie. On signup/login, server creates a signed JWT 
and sets it as a cookie. All authenticated API routes verify this cookie 
server-side using jsonwebtoken. Passwords hashed with bcryptjs (10 rounds).

## Database
PostgreSQL via Supabase with 3 tables:
- users (id, email, password_hash, created_at)
- pages (id, user_id, title, slug, status, theme, content jsonb, view_count)
- contact_submissions (id, page_id, name, email, message)

## Tradeoffs + What I'd Improve Next
- Would add image upload support instead of URL-only gallery
- Would add auto-save with debouncing instead of manual save
- Would add custom domain support for published pages
- Would add drag-and-drop section reordering
- Would add more theme customization (user can tweak colors)