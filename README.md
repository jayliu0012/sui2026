<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Z0ws7GZC-cfhMv40glUaEgU6uD4BOtIR

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

**部署（GitHub Pages）**

- 本專案已加入 GitHub Actions workflow (`.github/workflows/deploy.yml`)：
  - 在 push 到 `main` 分支時會執行 `npm ci`、`npm run build`，並把 `dist/` 發佈到 GitHub Pages（使用 `peaceiris/actions-gh-pages`）。
- 若你要在本機測試部署流程：

```bash
npm ci
npm run build
```

- 常見問題：若部署後出現空白頁，請在瀏覽器 DevTools 的 Application → Service Workers 中 unregister 舊的 service worker，然後清除快取並重新載入。
