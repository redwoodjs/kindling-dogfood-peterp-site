import type { ReactNode } from "react";

const pageStyles = `
  body {
    max-width: 480px;
    line-height: 1.6;
    padding: 20px;
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
