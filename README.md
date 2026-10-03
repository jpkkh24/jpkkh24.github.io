# JPK — official developer website

Static GitHub Pages website for JPK and its first game, Rat Rush. No build step, framework, analytics, remote fonts, cookies, or app download links.

## Pages

- `/`: JPK developer homepage and featured app.
- `/rat-rush/`: informational game page, four modes, FAQ and support.
- `/rat-rush/privacy/`: privacy policy covering the app, website and support email.
- `/rat-rush/terms/`: terms of use.

Public support contact: `jpk.kh.24@gmail.com`.

## Checks and preview

Run `node scripts/check.cjs` to verify local paths, page anchors, image dimensions, contact details and the informational-only requirement. HTML can also be validated with `npx --yes --package html-validate@10.1.0 html-validate index.html rat-rush/index.html rat-rush/privacy/index.html rat-rush/terms/index.html`.

Open `index.html` locally, or serve this directory with any static HTTP server. All navigation uses relative paths. Mobile breakpoints, keyboard focus, native FAQ disclosure controls and reduced-motion support are included. No automated browser was used, in accordance with the owner's existing preference.

Publish the repository root from `main` in GitHub Pages. `.nojekyll` keeps this a plain static site. The files contain no signing credentials, private app code or APK.

## Content and privacy maintenance

The current app has no accounts, wallets, ads, in-app purchases, gameplay telemetry or developer cloud saves. Android backup may include local saves depending on device settings. Revisit the policy and terms before changing these behaviors; update their dates when the documents materially change. No store approval or Solana affiliation is claimed.

The site reuses approved game artwork. Images are unaltered copies and below-the-fold images load lazily. Lilita One is served locally with its SIL Open Font License in `assets/FONT-LICENSE.txt`.
