import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BurgerProvider } from "@/components/burger-bar";
import { cn } from "@/lib/utils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Key Grip",
  description: "Musical duo from Adealide, Australia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(geistSans.variable, geistMono.variable)}>
        <BurgerProvider>
          <main>
            {children}
          </main>
        </BurgerProvider>
      </body>
    </html>
  );
}
