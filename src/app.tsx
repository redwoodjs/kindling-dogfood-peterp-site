import { renderDocument } from "./lib/render";

export function renderApp() {
  return renderDocument(
    "Peter Pistorius",
    `<main style="max-width: 48rem; margin: 0 auto; padding: 2rem; font: 16px/1.6 system-ui, sans-serif;">
      <h1>RedwoodSDK scaffold is running.</h1>
      <p>This is the minimal worker bootstrap for the migration epic.</p>
    </main>`
  );
}
