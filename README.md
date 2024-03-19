# h3 websocket bug reproduction

- start the server `pnpm run serve`
- open `http://localhost:3000` in the browser and try to send some messages.
- Watch the server logs. None of the hooks in the handler fire.

If you refactor the code to use the listhen cli (`listhen ./index.ts --ws`) instead of the exported `listen` function then it works as expected again.
