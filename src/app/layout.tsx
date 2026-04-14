import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pyae Phyoe Kyaw | Fullstack Developer",
  description: "Portfolio of Pyae Phyoe Kyaw, a Fullstack Developer specializing in Java, Spring Boot, and enterprise Core Banking systems.",
  keywords: [
    "Pyae Phyoe Kyaw", 
    "Fullstack Developer", 
    "Java Developer", 
    "Spring Boot", 
    "Angular", 
    "Myanmar Information Technology", 
    "Next.js Portfolio",
    "Core Banking"
  ],
  authors: [{ name: "Pyae Phyoe Kyaw" }],
  creator: "Pyae Phyoe Kyaw",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pyaephyoekyaw.com", // TODO: Replace with actual deployed URL later
    title: "Pyae Phyoe Kyaw | Fullstack Developer",
    description: "Portfolio of Pyae Phyoe Kyaw, a Fullstack Developer specializing in Java, Spring Boot, and enterprise Core Banking systems.",
    siteName: "Pyae Phyoe Kyaw Portfolio",
    images: [
      {
        url: "/og-image.png", // Placed in the public/ folder
        width: 1200,
        height: 630,
        alt: "Pyae Phyoe Kyaw | Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pyae Phyoe Kyaw | Fullstack Developer",
    description: "Portfolio of Pyae Phyoe Kyaw, a Fullstack Developer specializing in Java, Spring Boot, and enterprise Core Banking systems.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
