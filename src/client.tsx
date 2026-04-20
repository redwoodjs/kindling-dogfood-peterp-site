import { hydrateRoot } from "react-dom/client";
import { Home } from "@/app/pages/Home";

const root = document.getElementById("redwood-app");

if (!root) {
  throw new Error("Missing app root.");
}

hydrateRoot(root, <Home />);
