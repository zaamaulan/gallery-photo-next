import type { Metadata } from "next";
import { Playfair } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Gallery Photo",
  description: "Gallery Photo Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={playfair.className}>
        <>
          {children}
          <Toaster />
        </>
      </body>
    </html>
  );
}
