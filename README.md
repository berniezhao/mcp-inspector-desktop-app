# MCP Inspector Desktop

> An Electron desktop wrapper for "@modelcontextprotocol/inspector" (MCP Inspector), ready to use with double-click, no Node/npm pre-installation required.

---

## Features
- **One-click launch**: End users do not need to install Node.js/npm, just download and use.
- **Bundled MCP Inspector**: Always ships with the latest Inspector; developers can update the dependency at any time.
- **Cross-platform**: Supports macOS (DMG), Windows (NSIS), and Linux (AppImage).
- **Pure main process**: No custom renderer, directly opens the MCP Inspector Web UI.

---

## Directory Structure
```
.
├─ package.json
├─ electron-builder.json
├─ tsconfig.json
├─ webpack.config.js
├─ src/
│  ├─ main.ts         # Electron main process, launches MCP Inspector
│  └─ preload.ts      # Preload script (empty)
└─ node_modules/
```

---

## Installation & Development

1. **Install dependencies**
   ```bash
   npm install
   # For better type support:
   npm install --save-dev electron typescript webpack ts-loader @types/node @types/electron
   ```

2. **Start in development mode**
   ```bash
   npm run dev
   # Compiles TypeScript and launches Electron
   ```

3. **Type checking**
   ```bash
   npm run type-check
   ```

---

## Build & Distribution

1. **Pack (directory only, no installer)**
   ```bash
   npm run pack
   ```

2. **Build installer**
   ```bash
   npm run dist
   # Output will be in dist/ and release/ (or subfolders)
   ```

- macOS: DMG, Windows: NSIS installer, Linux: AppImage.

---

## Upgrade MCP Inspector Version

Just run:
```bash
npm update @modelcontextprotocol/inspector
```
Then rebuild the app.

---

## FAQ

- **Type declaration not found**
  - Make sure `@types/node` and `@types/electron` are installed, and `types` in tsconfig.json includes both.

- **Port already in use**
  - MCP Inspector defaults to port 6274. Change it in `src/main.ts` if needed.

- **Inspector CLI fails to start**
  - Ensure `node_modules/@modelcontextprotocol/inspector` exists and is not packed into asar (see asarUnpack config).

- **Code signing for Windows/macOS**
  - There is no truly free code signing certificate for production. For open source or internal use, you can skip signing or use a self-signed cert (users will see a warning).

- **Cross-platform build (Windows on macOS)**
  - You need Wine (and Rosetta 2 on Apple Silicon) to build Windows installers on macOS. Alternatively, use a Windows machine or CI/CD service.

---

## References
- [@modelcontextprotocol/inspector on npm](https://www.npmjs.com/package/@modelcontextprotocol/inspector)
- [Electron Documentation](https://www.electronjs.org/)
- [electron-builder Documentation](https://www.electron.build/)

---

For custom features or issues, feel free to open an issue! 