import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "../store/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FACEIT Feed test",
  description: "Created by Guillermo Parral",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-10`}>
        <nav>
          <h1 className="text-center text-xl font-bold">FACEIT Feed test</h1>
        </nav>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
