import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./(main)/globals.css";
import ReduxProvider from "./(main)/_components/ReduxProvider";
import SessionProvider from "./(main)/_components/SessionProvider";
import { getServerSession } from "next-auth";
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
                <SessionProvider session={session}>
                    <ReduxProvider>{children}</ReduxProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
