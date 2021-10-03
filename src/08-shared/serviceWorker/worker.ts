/* eslint-disable @typescript-eslint/ban-ts-comment */
/// <reference lib="WebWorker" />

// @ts-ignore
import { version } from "../../../package.json";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("installing", () => {
  // @ts-ignore
  self.skipWaiting();
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(version).then((cache) => {
      return cache.addAll([
        "./index.html",
        "./build/bundle.css",
        "./build/bundle.js",
        "./build/bundle.js.map",
        "./css/dark.css",
        "./css/fonts.css",
        "./css/global.css",
        "./css/light.css",
        "./css/markdown.css",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    event.respondWith(fetch(request));
    return;
  }

  if (
    request.headers.get("Accept")?.indexOf("text/plain") === -1 &&
    request.url.match(/https?/)
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        return (
          response ||
          fetch(request).then((response) => {
            const copy = response.clone();

            if (
              copy.headers.get("Content-Type")?.indexOf("text/plain") === -1
            ) {
              caches.open(version).then(function (cache) {
                cache.put(request, copy);
              });
            }

            return response;
          })
        );
      })
    );
    return;
  }
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === version) {
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
});
