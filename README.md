# h3 websocket bug reproduction

- start the server `pnpm run serve`
- open `http://localhost:3000` in the browser and try to send some messages.
- The client will be able to connect and send messages, but if you watch the server logs, none of the hooks in the WebSocketEventHandler will fire.

If you refactor the code to use the listhen cli (`listhen ./index.ts --ws`) instead of the exported `listen` function then it works as expected again.
