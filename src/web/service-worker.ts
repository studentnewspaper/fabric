declare let self: ServiceWorkerGlobalScope;

import { setCacheNameDetails } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { precacheAndRoute } from "workbox-precaching";
import { enable as enableNavigationPreload } from "workbox-navigation-preload";

// ===================================
//   INIT
// ===================================

setCacheNameDetails({
  prefix: "student",
  suffix: "v1",
});

enableNavigationPreload();
precacheAndRoute(self.__WB_MANIFEST);

// ===================================
//   REQUESTS
// ===================================

// Navigations go to the network first, then the cache
const navigationStrategy = new StaleWhileRevalidate({
  cacheName: "cached-navigations",
  plugins: [new ExpirationPlugin({ maxAgeSeconds: 2 * 60 })],
});

registerRoute(new NavigationRoute(navigationStrategy, {}));

// Cache google fonts, but update in background
// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
  ({ url }) => url.origin === "https://fonts.googleapis.com",
  new StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
  ({ url }) => url.origin === "https://fonts.gstatic.com",
  new CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// Cache scripts not pre-cached, but update in background
registerRoute(
  ({ request }) =>
    request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
  })
);

// Cache images
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      // TODO: Test if we want to cache opaque responses: https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests
      // new CacheableResponsePlugin({
      //   statuses: [0, 200],
      // }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// ===================================
//   PUSH NOTIFICATIONS
// ===================================

// Example payload: {"title": "<<TITLE>>", "options": {"body": "<<BODY>>", "data": {"redirect": "<<URL>>"}}}
self.addEventListener("push", (event) => {
  if (event.data == null) return;

  const notification = event.data.json();
  if (notification.title == null) return;

  event.waitUntil(
    self.registration.showNotification(notification.title, {
      ...(notification.options ?? {}),
      lang: "en",
      // TODO: Icon for The Student!
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.notification.data.redirect != null) {
    event.waitUntil(replaceOrOpenWindow(event.notification.data.redirect));
  }
});

self.addEventListener("pushsubscriptionchange", (event) => {
  // TODO: Implement this logic
  // event.waitUntil(updateDevice(event.oldSubscription, event.newSubscription));
});

/**
 * Requests the notification server to replace the device info (called when the existing PushSubscription expires)
 * @param old
 * @param replacement
 * @returns fetch promise
 */
async function updateDevice(
  old: PushSubscription | null,
  replacement: PushSubscription | null
) {
  const body = {
    old: { endpoint: old?.endpoint },
    replacement: {
      endpoint: replacement?.endpoint,
      keys: replacement?.toJSON().keys,
    },
  };

  return fetch(`${process.env.NOTIFICATION_ORIGIN}/subscription`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

/**
 * Matches given URL with an open window which shares the same *pathname*, not necessarily the same query params etcetera
 * @param url full URL, can include query params etcetera
 */
async function replaceOrOpenWindow(url: string) {
  const targetPath = new URL(url).pathname;

  const windows = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });

  for (const window of windows) {
    const windowPath = new URL(window.url).pathname;
    if (windowPath == targetPath) {
      // Navigate to the full target URL, including query params etcetera
      // I hope we can do both of these at the same time, let's find out
      return Promise.all([window.focus(), window.navigate(url)]);
    }
  }

  // No matching windows found, open a new one
  return self.clients.openWindow(url);
}

// Make Typescript happy that this is a module
export {};
