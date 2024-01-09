import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider, QueryProvider, ThemeProvider } from "@app/_providers";

const inter = Inter({ subsets: ["latin"], variable: "--inter" });

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Expense Tracker is your expenses managing tool",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll">
      <body className={inter.className}>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
          <ModalProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
