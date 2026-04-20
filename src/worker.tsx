import { renderApp } from "./app";

export default {
  fetch() {
    return new Response(renderApp(), {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  },
};
