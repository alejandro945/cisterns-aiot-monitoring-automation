import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/presentation/styles/globals.css";
import { METADATA } from "@/presentation/constants/metadata.constants";
import { Toaster } from "@/presentation/components/ui/toaster";
import { GlobalContextProvider } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = METADATA.root;


export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          <main>{children}</main>
          <Toaster />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
