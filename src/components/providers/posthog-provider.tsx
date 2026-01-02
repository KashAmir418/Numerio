"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function PostHogPageview() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname && typeof window !== 'undefined') {
            let url = window.origin + pathname;
            if (searchParams?.toString()) {
                url = url + `?${searchParams.toString()}`;
            }
            posthog.capture("$pageview", {
                $current_url: url,
            });
        }
    }, [pathname, searchParams]);

    return null;
}

export function PostHogAuth({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
            const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

            if (key) {
                posthog.init(key, {
                    api_host: host,
                    person_profiles: "identified_only",
                    capture_pageview: false,
                    capture_pageleave: true,
                    autocapture: false,
                    disable_session_recording: true,
                });
            }
        }
    }, []);

    return (
        <PostHogProvider client={posthog}>
            <PostHogPageview />
            {children}
        </PostHogProvider>
    );
}
