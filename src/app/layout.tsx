import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UserSync from "@/components/layout/UserSync";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], weight: ["600", "700", "800"] });
const dm = DM_Sans({ variable: "--font-dm", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "StudioSpace – Book creative studios by the hour", template: "%s | StudioSpace" },
  description: "Peer-to-peer marketplace for photo studios, sound stages, podcast rooms and music suites.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bricolage.variable} ${dm.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Providers>
          <Suspense fallback={<div className="h-[68px] border-b border-line" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1 overflow-x-clip">
            <UserSync />
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
