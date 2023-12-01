import NavBar from "./_components/NavBar";
import Footer from "./_components/Footer";
import LoadingModal from "./_components/LoadingModal";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <NavBar />
            {children}
            <Footer />
            <LoadingModal />
        </main>
    );
}
