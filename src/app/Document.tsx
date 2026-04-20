import type { ReactNode } from "react";

type DocumentProps = {
  children: ReactNode;
};

export function Document({ children }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Peter Pistorius</title>
        <style>{`
          :root {
            color-scheme: light;
          }

          html {
            background: #fff;
          }

          body {
            margin: 0;
            font-family: serif;
            max-width: 480px;
            line-height: 1.6;
            padding: 20px;
            color: #111;
            background: #fff;
          }

          a {
            color: #0645ad;
          }

          a:visited {
            color: #0b0080;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
