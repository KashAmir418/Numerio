import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google"; // Assuming google fonts are available or this will need adjustment if not installed
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });

export const metadata: Metadata = {
    title: "Numerio",
    description: "The Digital Sanctuary",
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
