import type { Metadata } from "next";
import { Belleza, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./global.css";

const burgues = localFont({
  src: "../../public/fonts/Burgues-Script-Regular.otf",
  variable: "--font-burgues",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const belleza = Belleza({
  variable: "--font-belleza",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const slight = localFont({
  src: "../../public/fonts/Slight-Regular.otf",
  variable: "--font-slight",
  display: "swap",
});

const serenity = localFont({
  src: "../../public/fonts/Simple-Serenity.ttf",
  variable: "--font-serenity",
  display: "swap",
});

const perandoryCondensed = localFont({
  src: "../../public/fonts/Perandory-Condensed.otf",
  variable: "--font-perandory-condensed",
  display: "swap",
});

const suranna = localFont({
  src: "../../public/fonts/Suranna-Regular.ttf",
  variable: "--font-suranna",
  display: "swap",
});

const parfumerie = localFont({
  src: "../../public/fonts/parfumerie-script-old-style.otf",
  variable: "--font-parfumerie",
  display: "swap",
});

const sloop = localFont({
  src: "../../public/fonts/Sloop Script Regular.ttf",
  variable: "--font-sloop",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wedding Invitations",
  description: "Personalized wedding invitations",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${belleza.variable} ${slight.variable} ${serenity.variable} ${perandoryCondensed.variable} ${burgues.variable} ${suranna.variable} ${parfumerie.variable} ${sloop.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
