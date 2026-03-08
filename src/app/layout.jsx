import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Providers from "@/components/Providers";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CivicFix - Report & Resolve Community Issues",
  description:
    "A modern platform to report, track, and resolve civic issues in your community. Empower citizens to make a difference.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-base-100`}>
        <Providers>
          <header className="py-4 sticky top-0 z-50 bg-base-100 border-b border-base-200">
            <nav className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <Navbar />
            </nav>
          </header>

          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl mx-auto w-full min-h-[calc(100vh-302px)]">
            {children}
          </main>

          <footer className="mt-20 border-t border-base-200">
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
