"use server";

import webpush from "web-push";

// Set VAPID details for push notifications
webpush.setVapidDetails(
  "mailto:patwary.dev@gmail.com", // MD Hasan Patwary's email
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

// In a real application, you would store subscriptions in a database
let subscription: PushSubscription | null = null;

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub;
  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true };
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error("No subscription available");
  }

  try {
    // Convert PushSubscription to the format expected by web-push
    const subscriptionData = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: btoa(
          String.fromCharCode.apply(
            null,
            Array.from(new Uint8Array(subscription.getKey("p256dh")!))
          )
        ),
        auth: btoa(
          String.fromCharCode.apply(
            null,
            Array.from(new Uint8Array(subscription.getKey("auth")!))
          )
        ),
      },
    };

    await webpush.sendNotification(
      subscriptionData,
      JSON.stringify({
        title: "MD Hasan Patwary - Front-End Developer",
        body: message,
        icon: "/favicon/android-chrome-192x192.png",
        badge: "/favicon/favicon-32x32.png",
        data: {
          url: "https://patwary.vercel.app",
          dateOfArrival: Date.now(),
          author: "MD Hasan Patwary",
          contact: "patwary.dev@gmail.com",
        },
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
