import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tradutor Cultural com DeepSeek",
  description: "Plataforma de tradução com contexto cultural desenvolvida como Trabalho de Conclusão de Curso. Traduções precisas adaptadas a diferentes contextos culturais.",
  keywords: ["tradutor cultural", "tradução com contexto", "DeepSeek", "TCC", "tradução inteligente", "contexto cultural", "adaptação cultural"],
  authors: [{ name: "TCC - Tradutor Cultural" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Tradutor Cultural com DeepSeek",
    description: "Traduções precisas com adaptação cultural e contextual",
    url: "https://tradutor-cultural.com",
    siteName: "Tradutor Cultural",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tradutor Cultural com DeepSeek",
    description: "Traduções precisas com adaptação cultural e contextual",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
