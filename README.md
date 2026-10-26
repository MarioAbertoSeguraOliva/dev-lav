# 💼 Developer Portfolio

A modern personal portfolio and CV website built with React to showcase my professional experience, technical skills, and software projects.

The goal of this website is to provide recruiters and collaborators with an overview of my background, featured projects, and the technologies I work with.

---

## 🚀 Features

- Responsive modern design
- Project showcase with explicit `Completed`, `In Development`, and `Planned` status labels
- Professional timeline
- About Me section
- Contact information
- Dark/light mode with a saved preference
- Client-side routing with SPA deep-link support
- Automated regression tests
- Downloadable CV (planned)
- Docker support for local development
- Cloudflare Workers deployment target with a Worker-based SPA routing fallback

---

## 🛠️ Tech Stack

- React 19
- React Router 6
- React-Bootstrap / Bootstrap 5
- JavaScript
- HTML5
- CSS3
- Create React App (`react-scripts`)
- Cloudflare Workers (static assets + routing Worker)
- Docker
- Docker Compose

---

## 📂 Project Structure

```
src/
├── components/
├── constants/
├── data/
├── hooks/
├── pages/
├── styles/
├── App.js
├── App.test.js
├── setupTests.js
└── index.js

public/
└── images/

worker/
└── index.js
```

---

## ⚙️ Running Locally

### Prerequisites

- Node.js 18+ to run the application and tests (verified with Node 18.12.1)
- npm
- Node.js 22+ to run Wrangler 4.156.0 commands (`preview` and `deploy`), which is installed as a development dependency

Clone the repository:

```bash
git clone https://github.com/MarioAbertoSeguraOliva/dev-lav.git
cd dev-lav
```

Install dependencies from the lockfile:

```bash
npm ci
```

Start the development server:

```bash
npm start
```

The application will be available at:

```
http://localhost:3000
```

---

## 🧪 Tests

Run the regression suite once (non-interactive, suitable for CI):

```bash
npm test
```

Run it in watch mode during development:

```bash
npm run test:watch
```

The tests use Jest and React Testing Library. They render the application in memory, do not require a browser or network access, and cover Home rendering, client-side CTA navigation, direct route rendering, the React 404 page, project image paths, image fallbacks, status labels, and the Worker's SPA/asset routing rules.

---

## 🐳 Running with Docker

Build and start the application:

```bash
docker compose up --build
```

Stop the application:

```bash
docker compose down
```

The current Dockerfile uses Node 18 and runs the Create React App development server. It is intended for local development, not production hosting.

---

## 🌐 Live Website

The portfolio is deployed at:

```
https://dev-lav.marioalbertoseguraoliva.workers.dev/
```

The current production URL remains on `workers.dev`; no custom domain is configured.

---

## ☁️ Cloudflare Deployment and SPA Routing

The repository configures the application as a client-side React SPA on Cloudflare Workers. `wrangler.jsonc` points Wrangler at the `build/` directory and configures a small Worker as the SPA fallback:

```jsonc
"main": "worker/index.js",
"assets": {
  "directory": "build",
  "binding": "ASSETS"
}
```

Cloudflare serves an existing static asset before invoking the Worker. For requests that do not match an asset, `worker/index.js`:

- returns `index.html` for application routes such as `/projects`, `/about`, `/contact`, and unknown client-side routes (React Router then renders the React 404 page);
- returns `404` for asset-shaped paths such as missing `.js`, `.css`, or image requests, or anything under `/static/` or `/images/`;
- rejects non-`GET`/`HEAD` requests to application routes with `405`.

`assets.not_found_handling: "single-page-application"` was intentionally not used. Cloudflare's SPA mode rewrites every unmatched path, including missing JavaScript, CSS, and images, to `index.html` with a `200` status. The Worker provides the SPA fallback without masking missing assets.

Application routes must not contain a dot. Any dotted path is treated as an asset so that missing files keep returning `404`; add an explicit route exception to `worker/index.js` before introducing such a route.

The configuration and routing behavior were validated locally with Wrangler 4.114.0 in a Node 22 container (`wrangler dev`): application routes returned the SPA shell, existing assets returned their real content, and missing asset paths returned `404`. No production deployment was performed during that local validation.

Install the toolchain with `npm ci`. The deployment commands are:

```bash
npm run preview   # build, then serve locally with wrangler dev
npm run deploy    # build, then deploy to production with wrangler deploy
```

- `wrangler` 4.156.0 is pinned as a development dependency in `package.json` and `package-lock.json`.
- Wrangler 4.156.0 requires Node.js 22+; the application itself still builds and tests on Node 18.12.1.
- `npm run preview` is local-only and does not upload or modify production.
- `npm run deploy` targets production and requires an authenticated Wrangler session with access to the Cloudflare account that owns the `dev-lav` Worker.

Local validation is not production verification. Production was updated on 2026-10-26 by deployment `38209270-9992-482e-8179-350e6cc90b81`, which runs commit `23a268f`. The live HTML, JavaScript, and CSS match the local build of that commit, and the Worker routing behavior described above is active. Deployment provenance was confirmed in the Cloudflare dashboard.

---

## 🗂️ Project Data

Project content lives in `src/data/projects.json`. The `status` values are mapped for display:

- `Active` → `In Development` (the DentalFlow project is a v0.1.0 proof of concept, so completion is not claimed)
- `Completed` → `Completed`
- `In Development` / `In progress` → `In Development`
- `Planned` → `Planned`

Planned projects remain visible and are clearly labelled. Entries without genuine screenshots set `"image": null`, which renders a labelled placeholder artwork (project name, stack, and an explicit "no screenshot available" caption) instead of implying a real screenshot. `defaultImage.png` is only used as a fallback when a declared image fails to load.

---

## 📸 Sections

- Home
- About Me
- Projects
- Timeline
- Contact

---

## 📈 Future Improvements

- Project filtering
- Blog
- Certifications
- Interactive project pages
- Internationalization (EN/ES)
- Resume download (pending an approved PDF)
- SEO improvements

---

## 📄 License

This project is available for portfolio purposes.

Please do not copy the content, branding, or personal information without permission.