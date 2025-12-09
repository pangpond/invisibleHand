import React from "react";
import { createRoot, type Root } from "react-dom/client";
import App from "./App";
import tailwindStyles from "./style.css?inline";

console.log(
  "Tampermonkey Script Started: Side Pane Data Viewer (React + shadcn/ui + Shadow DOM)"
);

const HOST_ID = "sp-shadow-host";
const ROOT_ID = "sp-root";

function ensureShadowRoot(): ShadowRoot {
  let host = document.getElementById(HOST_ID);

  if (!host) {
    host = document.createElement("div");
    host.id = HOST_ID;
    host.style.position = "fixed";
    host.style.top = "0";
    host.style.left = "0";
    host.style.width = "100vw";
    host.style.height = "100vh";
    host.style.zIndex = "2147483647";
    host.style.pointerEvents = "none";
    document.body.appendChild(host);
  }

  return host.shadowRoot ?? host.attachShadow({ mode: "open" });
}

function ensureTailwindStyle(shadowRoot: ShadowRoot) {
  if (!shadowRoot.querySelector("style[data-sp-tailwind]")) {
    const styleTag = document.createElement("style");
    styleTag.dataset.spTailwind = "true";
    styleTag.textContent = tailwindStyles;
    shadowRoot.appendChild(styleTag);
  }
}

function ensureAppRoot(shadowRoot: ShadowRoot): HTMLElement {
  let appRoot = shadowRoot.getElementById(ROOT_ID);

  if (!appRoot) {
    appRoot = document.createElement("div");
    appRoot.id = ROOT_ID;
    shadowRoot.appendChild(appRoot);
  }

  return appRoot;
}

let reactRoot: Root | null = null;
let reactRootContainer: HTMLElement | null = null;

function renderApp() {
  const shadowRoot = ensureShadowRoot();
  ensureTailwindStyle(shadowRoot);
  const appRoot = ensureAppRoot(shadowRoot);

  if (!reactRoot || reactRootContainer !== appRoot) {
    reactRoot?.unmount();
    reactRoot = createRoot(appRoot);
    reactRootContainer = appRoot;
  }

  reactRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

renderApp();

// SPA Support
// @ts-ignore
if (window.onurlchange === null) {
  window.addEventListener("urlchange", (info: any) => {
    console.log("URL changed:", info.url);
    renderApp();
  });
}
