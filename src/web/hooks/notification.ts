import { useEffect, useRef, useState } from "preact/hooks";
import { fetch } from "cross-fetch";

export enum NotificationState {
  Subscribed, //This client will receive notifications
  Active, //Service worker has push subscription but it's not linked to this live
  AwaitingAction, //The user has been prompted to give permission
  Initial, //The user has not been prompted to give permission before
  Denied, //The user has been prompted and has blocked us
  NotSupported,
  Loading,
}

async function isSupported() {
  return (
    "navigator" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

// TODO: Make sure only one request can happen at a time

export function useNotifications(channel: string): [state: NotificationState, enable: () => Promise<void>, disable: () => Promise<void>] {
  const [state, setState] = useState(NotificationState.Loading);
  // const serviceWorkerRef = useRef<ServiceWorkerRegistration | null>(null);
  // const subscriptionRef = useRef<PushSubscription | null>(null);

  const localStorageKey = `subscription-${channel}`;

  useEffect(() => {
    // For SSR, state should always be "loading"
    if (typeof window == "undefined") return;
    (async () => {
      const supported = await isSupported();
      if (!supported) {
        setState(NotificationState.NotSupported);
        return;
      }

      const serviceWorker = await navigator.serviceWorker.getRegistration();
      if (serviceWorker == null) {
        localStorage.removeItem(localStorageKey);
        setState(NotificationState.NotSupported);
        return;
      }

      if (Notification.permission == "denied") {
        localStorage.removeItem(localStorageKey);
        setState(NotificationState.Denied);
        return;
      }

      if (Notification.permission == "default") {
        localStorage.removeItem(localStorageKey);
        setState(NotificationState.Initial);
        return;
      }

      // We know we can send notifications... does that mean there's a subscription already?
      const subscription = await serviceWorker.pushManager.getSubscription();
      if (!subscription) {
        localStorage.removeItem(localStorageKey);
        setState(NotificationState.Initial);
        return;
      }

      const localStorageEndpoint = localStorage.getItem(localStorageKey)
      if (localStorageEndpoint != null) {
        // Make sure this pre-existing subscription refers to this service workers subscription
        if(localStorageEndpoint == subscription.endpoint) {
          setState(NotificationState.Subscribed);
          return;
        }

        // The subscription has changed this service worker is not going to receive notifications from this endpoint
        removeEndpoint(localStorageEndpoint);
        localStorage.removeItem(localStorageKey);
        // We still have _a_ subscription though, so it's active
        setState(NotificationState.Active);
        return;
      } else {
        // We probably don't have a subscription to this exact thing
        setState(NotificationState.Active);
        return;
      }
    })();
  }, []);

  async function enable() {
    if (state != NotificationState.Initial && state != NotificationState.Active)
      throw new Error(
        `Tried to enable notifications when they could not be enabled`
      );

    if (Notification.permission == "default") {
      setState(NotificationState.AwaitingAction);
      const response = await Notification.requestPermission();
      if (response == "denied") {
        setState(NotificationState.Denied);
        return;
      }
    }

    const sw = await navigator.serviceWorker.getRegistration();
    if (sw == null) throw new Error("Where did SW go?");

    let subscription = await sw.pushManager.getSubscription();
    if (subscription == null) {
      subscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.VAPID_PUBLIC as string
        ),
      });
      if (subscription.expirationTime != null) {
        // This will help us test how long they go for
        console.log(
          `Subscription expires ${new Date(subscription.expirationTime)}`
        );
      }
    }

    await fetch(`${process.env.NOTIFICATION_ORIGIN}/subscribe`, {
      method: "POST",
      body: JSON.stringify({ channel, device: {endpoint: subscription.endpoint, keys: subscription.toJSON().keys} }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.setItem(
      localStorageKey,
      subscription.endpoint
    );
    setState(NotificationState.Subscribed);
  }

  async function disable() {
    if (state != NotificationState.Subscribed)
      throw new Error(
        `Tried to disable notifications when they were not enabled`
      );

    const sw = await navigator.serviceWorker.getRegistration();
    if (sw == null) throw new Error("Where did SW go?");

    const subscription = await sw.pushManager.getSubscription();
    if (subscription == null) throw new Error("Where did subscription go?");

    await removeEndpoint(subscription.endpoint)
    localStorage.removeItem(localStorageKey);

    // Maybe go through the entire state determination function in "useEffect" again?
    setState(NotificationState.Active);
  }

  async function removeEndpoint(endpoint: string) {
    return fetch(`${process.env.NOTIFICATION_ORIGIN}/unsubscribe`, {
      method: "POST",
      body: JSON.stringify({
        channel,
        endpoint,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return [state, enable, disable];
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
