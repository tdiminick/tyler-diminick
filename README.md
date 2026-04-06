# tylerdiminick.com

Personal site for Tyler Diminick — actor, improviser, and full-stack engineer.

Static site built with vanilla HTML/CSS/JS, bundled by [Vite](https://vite.dev).

## Local Development

```bash
npm install
npm run dev
```

Opens a dev server at `http://localhost:5180` with hot reload.

To preview the production build locally:

```bash
npm run build
npm run preview
```

## Deploy to Cloudflare Pages

### Initial setup

1. Push this repo to GitHub.
2. Go to [Cloudflare Dashboard → Pages](https://dash.cloudflare.com/?to=/:account/pages) and click **Create a project → Connect to Git**.
3. Select the `tyler-diminick` repository.
4. Configure the build settings:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**.

### Custom domain (`tylerdiminick.com`)

1. In the Cloudflare Pages project, go to **Custom domains** → **Set up a custom domain**.
2. Add `tylerdiminick.com` and follow the prompts (if the domain is already on Cloudflare DNS this is automatic).
3. Add `www.tylerdiminick.com` as a second custom domain.
4. Cloudflare Pages handles both apex and `www` automatically — no redirect rules needed. Both will serve the site over HTTPS.

> **Note:** If `tylerdiminick.com` is not yet on Cloudflare DNS, you'll need to either transfer nameservers to Cloudflare or add the CNAME records Cloudflare provides to your current DNS provider.

### Subsequent deploys

Every push to `main` triggers a new production deployment automatically.
