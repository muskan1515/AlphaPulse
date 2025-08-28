import "./globals.css";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Loader from "@/components/common/Loader";
import Message from "@/components/common/Message";
import Providers from "@/store/provider";
import { ThemeProviders } from "@/helper/nextThemeProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StockAI",
  description: "AI-powered stock sentiment & trend dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900">
        <ThemeProviders>
          <Providers>
            <Header />
            <main className="max-w-7xl mx-auto py-8 px-4">{children}</main>
            <Footer />
            <Loader />
            <Message />
          </Providers>
        </ThemeProviders>
      </body>
    </html>
  );
}
