# AI PickGold Studio

V1 `/studio` workbench prototype based on `AI_PICKGOLD_STUDIO_BRIEF_V1_2026-06-04.md`.

## Local

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/studio
```

## Build

```bash
npm run build
```

## GitHub Pages Build

```bash
npm run build:pages
```

The Pages build uses the `/aipickgold-studio/` asset base and copies `dist/index.html` to `dist/404.html` so `/studio` can resolve as a frontend route.

## Safety Boundary

- V1 exports a manual publish package.
- Direct WeChat/account publishing is not implemented.
- API status is masked in UI.
- No plaintext secrets should be committed.
