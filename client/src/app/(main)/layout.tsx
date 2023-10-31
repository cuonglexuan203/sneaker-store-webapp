import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./_store/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Sneaker Store",
    description: "A shoe store",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
