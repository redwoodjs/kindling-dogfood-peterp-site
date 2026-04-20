import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "./src/document";
import { HomePage } from "./src/pages/home";

export default defineApp([
  render(Document, [
    route("/", HomePage),
  ]),
]);
