import type { ReactNode } from "react";

const pageStyles = `
  :root {
    color-scheme: light;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    background: #ffffff;
    color: #111111;
    font-family: Georgia, "Times New Roman", Times, serif;
  }

  body {
    max-width: 480px;
    line-height: 1.6;
    padding: 20px;
  }

  a {
    color: inherit;
  }

  ol {
    padding-left: 1.25rem;
  }
`;

export function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Peter Pistorius</title>
        <style>{pageStyles}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
