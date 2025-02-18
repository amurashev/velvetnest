import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";

import "./globals.css";
import Header from "@/components/header";

const font = Bodoni_Moda({
  variable: "--font-main",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Velvet Nest Magazine",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
