"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

if (typeof window !== "undefined") {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    if (key) {
        posthog.init(key, {
            api_host: host,
            person_profiles: "identified_only", // or 'always' if you want to track anonymous users as unique persons
            capture_pageview: false, // We'll handle this manually for more accuracy
            capture_pageleave: true,
        });
    }
}

export function PostHogAuth({ children }: { children: React.ReactNode }) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
