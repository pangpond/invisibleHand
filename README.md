# Invisible Hand

A modern Tampermonkey userscript built with **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

This project features a glassmorphic dashboard UI injected directly into the target website, providing a rich interface for data visualization and interaction.

## 🚀 Features

*   **Modern UI**: Built with React 19 and shadcn/ui components.
*   **Styling**: Tailwind CSS v4 with a glassmorphism aesthetic.
*   **Style Isolation**: Sidebar renders inside a Shadow DOM with Tailwind injected inline, so host-site CSS can't leak in (or out).
*   **Dashboard**: Interactive side pane with tabs, metrics, and data lists.
*   **Developer Experience**: Vite-powered hot reloading and TypeScript support.
*   **Automated Releases**: One-command semantic versioning and GitHub releases.

## 🛠️ Prerequisites

*   **Node.js** (v18 or later recommended)
*   **Tampermonkey** browser extension (or Violentmonkey/Greasemonkey)

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd invisibleHand
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env` file in the root directory:
    ```env
    # Target URL for the userscript (e.g., https://example.com/*)
    VITE_MATCH_URL=https://your-target-site.com/*

    # GitHub Token for automated releases (repo scope required)
    GITHUB_TOKEN=ghp_your_token_here
    ```

## 💻 Development

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

1.  Vite will start a local server.
2.  Tampermonkey should prompt you to install the "Developer Mode" script.
3.  Visit the target website specified in `VITE_MATCH_URL`.
4.  The dashboard should appear (or click the toggle button). Changes to the code will reflect instantly.

## 🏗️ Building

To build the production userscript:

```bash
npm run build
```

The output file will be generated at `dist/invisiblehand.user.js`. You can manually install this file into Tampermonkey.

## 🚀 Release Process

This project uses **release-it** for automated semantic versioning and GitHub releases.

1.  **Commit your changes** using [Conventional Commits](https://www.conventionalcommits.org/):
    *   `feat: ...` for new features (minor version bump)
    *   `fix: ...` for bug fixes (patch version bump)
    *   `chore: ...` for maintenance (no version bump usually)

2.  **Run the release command**:
    ```bash
    npm run release
    ```

3.  **Follow the prompts**:
    *   The script will bump the version in `package.json`.
    *   It will generate a changelog.
    *   It will run `npm run build` to ensure the latest code is included.
    *   It will commit, tag, and push to GitHub.
    *   If `GITHUB_TOKEN` is set in `.env`, it will automatically create a GitHub Release with the built userscript attached.
