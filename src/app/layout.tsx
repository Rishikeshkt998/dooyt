import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dooyt — Modern Full-Suite Enterprise Resource Planning (ERP) Platform",
  description: "Streamline your finance, HR, warehouse, sales, and manufacturing operations with the ultimate modern full-suite ERP software. Scale your business with Dooyt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
