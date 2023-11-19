import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./_components/ReduxProvider";
import SessionProvider from "./_components/SessionProvider";
import NavBar from "./_components/NavBar";
import Footer from "./_components/Footer";
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
                    <ReduxProvider>
                        <NavBar />
                        {children}
                        <Footer />
                    </ReduxProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
