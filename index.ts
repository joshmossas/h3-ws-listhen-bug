import {
  createApp,
  defineEventHandler,
  defineWebSocketHandler,
  toNodeListener,
} from "h3";
import { listen } from "listhen";
const app = createApp();

app.use(
  defineEventHandler(() =>
    fetch(
      "https://raw.githubusercontent.com/unjs/crossws/main/examples/h3/public/index.html"
    ).then((r) => r.text())
  )
);

app.use(
  "/_ws",
  defineWebSocketHandler({
    open(peer) {
      console.log("[ws] open", peer);
    },

    message(peer, message) {
      console.log("[ws] message", peer, message);
      if (message.text().includes("ping")) {
        peer.send("pong");
      }
    },

    close(peer, event) {
      console.log("[ws] close", peer, event);
    },

    error(peer, error) {
      console.log("[ws] error", peer, error);
    },
  })
);

// for some reason none of the hooks in the handler fire when doing this
listen(toNodeListener(app), {
  ws: true,
  public: true,
});
