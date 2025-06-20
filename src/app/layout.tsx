import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// set up geist sans font for general text
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// set up geist mono font for code display
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// metadata for the app - seo and browser tab info
export const metadata: Metadata = {
  title: "Algorithm Visualizer - Interactive Sorting Algorithm Demonstrations",
  description: "Learn and visualize sorting algorithms like Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort with interactive demonstrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* body with font variables and antialiasing for smooth text */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
