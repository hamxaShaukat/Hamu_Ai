import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import {ModelProvider} from "@/components/model-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hamu Ai",
  description: "Best AI Plateform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModelProvider />
          {children}</body>
      </html>
    </ClerkProvider>
  );
}