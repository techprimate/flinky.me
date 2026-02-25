# flinky.me

Static landing page for iOS apps, built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com). App metadata (name, description, screenshots, ratings, etc.) is fetched from [api.appmetadata.com](https://api.appmetadata.com) at build time and baked into the static HTML.

## Quick Start

```sh
yarn install
yarn dev
```

The dev server starts at `http://localhost:4321`.

## Configuration

There are two files to configure:

### `src/config/app.config.ts`

The main config file. Only `appId` is required — everything else is optional.

```ts
export const appConfig: AppConfig = {
  apiKey: "", // API key for api.appmetadata.com (or use env var)
  appId: "6748324734", // Apple App Store numeric ID

  features: [], // Optional — feature cards (hidden if empty)
  faqs: [], // Optional — FAQ accordion (hidden if empty)
  links: {
    privacy: "", // Optional — external URL
    terms: "", // Optional — external URL
    website: "", // Optional — external URL
    github: "https://github.com/techprimate/flinky.me", // Optional — public repo URL
  },
};
```

**`appId`** — The numeric App Store ID. Find it in your app's App Store URL: `apps.apple.com/app/name/id<THIS_NUMBER>`.

**`apiKey`** — Can be set directly or via the `APP_METADATA_API_KEY` environment variable. The env var takes precedence when `apiKey` is empty.

**`features`** — An array of `{ icon, title, description }` objects. Each `icon` is an emoji or text string. The features section is hidden when the array is empty.

```ts
features: [
  { icon: '🔗', title: 'Instant QR Codes', description: 'Turn any link into a scannable QR code.' },
  { icon: '🔒', title: 'Private by Design', description: 'All data stays on your device.' },
],
```

**`faqs`** — An array of `{ question, answer }` objects. The FAQ section is hidden when the array is empty.

```ts
faqs: [
  { question: 'Is it free?', answer: 'Yes, completely free with no ads.' },
],
```

**`links.github`** — Public GitHub repo URL. Shown in the footer nav when set.

### `astro.config.mjs`

Set the `site` URL to your production domain. This is used for the sitemap and canonical URLs.

```js
export default defineConfig({
  site: "https://flinky.me",
  // ...
});
```

### Environment Variables

Create a `.env` file (see `.env.example`):

```
APP_METADATA_API_KEY=your_key_here
```

## Project Structure

```
src/
  config/
    app.config.ts        # App configuration (the only file you edit)
  lib/
    types.ts             # TypeScript interfaces
    api.ts               # HTTP client for api.appmetadata.com
    fetchAppData.ts      # Build-time data fetcher
  components/
    sections/
      Hero.astro         # App icon, name, description, badges, download button
      Screenshots.astro  # iPhone/iPad gallery with lightbox
      Features.astro     # Optional feature cards grid
      FAQ.astro          # Optional FAQ accordion
      Footer.astro       # Developer info, links, theme toggle
    ui/
      AppStoreBadge.astro
      BackToTop.astro
      DeviceToggle.astro
      RatingStars.astro
      ThemeToggle.astro
  layouts/
    Layout.astro         # HTML shell with meta tags and theme detection
  pages/
    index.astro          # Main page — composes all sections
  styles/
    global.css           # Tailwind v4 theme tokens and utility classes
```

## Data Flow

```
app.config.ts (appId + apiKey)
       |
       v
lib/api.ts (fetches from api.appmetadata.com)
       |
       v
lib/fetchAppData.ts (returns typed AppData)
       |
       v
pages/index.astro (awaits data at build time)
       |
       v
Section components (render static HTML)
```

All API data is fetched once during `astro build` and baked into the output. No client-side API calls are made at runtime.

## Commands

| Command        | Action                                     |
| :------------- | :----------------------------------------- |
| `yarn install` | Install dependencies                       |
| `yarn dev`     | Start local dev server at `localhost:4321` |
| `yarn build`   | Build production site to `./dist/`         |
| `yarn preview` | Preview the built site locally             |

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) handles deployment to GitHub Pages:

- **Triggers:** push to `main`, daily cron at 06:00 UTC, manual `workflow_dispatch`
- **Daily rebuilds** keep app metadata (version, ratings, screenshots) current

### Setup

1. In your GitHub repo, go to **Settings > Pages** and set the source to **GitHub Actions**.
2. Add `APP_METADATA_API_KEY` as a repository secret under **Settings > Secrets and variables > Actions**.
3. Push to `main` — the workflow builds and deploys automatically.

## Using a Different App

1. Change `appId` in `src/config/app.config.ts` to the target app's App Store ID.
2. Update `site` in `astro.config.mjs` to your domain.
3. Rebuild — all metadata, screenshots, and icons update automatically.
