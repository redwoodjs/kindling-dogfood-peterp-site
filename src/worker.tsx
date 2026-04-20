import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";

import { Document } from "@app/Document";
import { HomePage } from "@app/pages/Home";

export default defineApp([
  render(Document, [route("/", HomePage)]),
]);
