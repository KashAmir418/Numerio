import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google"; // Assuming google fonts are available or this will need adjustment if not installed
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });

export const metadata: Metadata = {
    title: "Numerio | Destiny Matrix & Soul Blueprint",
    description: "Unlock the hidden geometry of your fate. Discover your Life Path, Destiny Matrix, and Soul Compatibility through the ancient science of numerology.",
    keywords: ["numerology", "destiny matrix", "life path number", "soul blueprint", "compatibility analysis", "self-discovery", "spiritual archetype"],
    openGraph: {
        title: "Numerio | Your Cosmic Blueprint",
        description: "Explore the ancient science of your numbers. Get your free Destiny Matrix profile.",
        type: "website",
        images: [
            {
                url: "/og-image.png", // We can add this file later if you have a logo
                width: 1200,
                height: 630,
                alt: "Numerio - Destiny Matrix",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Numerio | Destiny Matrix",
        description: "Unlock your Cosmic Blueprint.",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${cinzel.variable} bg-void text-starlight antialiased`}>
                {children}
            </body>
        </html>
    );
}
