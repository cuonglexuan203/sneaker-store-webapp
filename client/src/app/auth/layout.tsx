import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../(main)/globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "../(main)/_components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Sneaker Store",
    description: "A shoe store",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>{children}</SessionProvider>
            </body>
        </html>
    );
}
