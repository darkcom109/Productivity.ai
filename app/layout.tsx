import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Productivity.AI - Advanced Todo List",
  description: "A modern and feature-rich todo list application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

