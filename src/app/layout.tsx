import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

const siteUrl = "https://mit-cab-share.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MIT Cab Share | Split Airport Cabs with Fellow Students",
  description:
    "MIT Manipal students share cabs to and from Mangalore Airport, split fares, and travel together. Post a ride or find one in seconds.",
  openGraph: {
    title: "MIT Cab Share | Split Airport Cabs with Fellow Students",
    description:
      "MIT Manipal students share cabs to and from Mangalore Airport, split fares, and travel together.",
    url: siteUrl,
    siteName: "MIT Cab Share",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MIT Cab Share",
    description:
      "MIT Manipal students share cabs to and from Mangalore Airport, split fares, and travel together.",
  },
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
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
