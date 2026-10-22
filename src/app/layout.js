import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import ToastProvider from "@/components/ToastProvider";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto_Slab({
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaVault – Startup Idea Sharing Platform",
  description: "Share, explore, and validate innovative startup ideas with the community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.className} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Providers>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ToastProvider />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
