import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/presentation/styles/globals.css";
import { METADATA } from "@/presentation/constants/metadata.constants";
import { Toaster } from "@/presentation/components/ui/toaster";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = METADATA.root;


export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {


  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Providers session={session}>
          {children}
          </Providers>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
