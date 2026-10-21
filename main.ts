import { serveDir } from "jsr:@std/http/file-server";

Deno.serve((req) => {
  const url = new URL(req.url);
  
  // If a user goes to the main website URL, serve your Eaglercraft file directly
  if (url.pathname === "/" || url.pathname === "") {
    return serveDir(req, {
      fsRoot: "./",
      showIndex: false,
    }).then(async (res) => {
      // Route the root address directly to your offline HTML file
      if (res.status === 404) {
        return fetch(new URL("EaglercraftX_1.16_WASM-GC_Offline_Download.html", req.url));
      }
      return res;
    });
  }

  // Serve any other necessary asset files in the folder
  return serveDir(req, { fsRoot: "./" });
});
