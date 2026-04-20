import type { ReactNode } from "react";
import styles from "./styles.css?url";

type DocumentProps = {
  children: ReactNode;
};

export function Document({ children }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={styles} />
        <script type="module" src="/src/client.tsx"></script>
        <title>RedwoodSDK migration scaffold</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
