"use client";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    // Log error to console to satisfy linter and for debugging
    if (typeof window !== 'undefined') console.error(error);

    return (
        <html>
            <body className="bg-black text-gold flex items-center justify-center min-h-screen">
                <div className="text-center p-8">
                    <h2 className="text-3xl font-serif mb-4">Critical Alignment Failure</h2>
                    <p className="mb-6 text-white/60">The application encountered a fatal error.</p>
                    <button
                        onClick={() => reset()}
                        className="px-6 py-2 border border-gold/50 rounded-full hover:bg-gold/10"
                    >
                        Reboot Universe
                    </button>
                </div>
            </body>
        </html>
    );
}
