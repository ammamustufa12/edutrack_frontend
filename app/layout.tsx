import { QueryProvider } from "@/components/providers/provider";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner"; // <-- import Toaster here

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Wane Facturation - Student Management System",
 description: "Manage Your Students And Their Activities With Ease.",
 icons: {
  icon: {
   url: "/images/logo-dashboard.svg",
  },
 },
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html lang="en">
   <body className={inter.className}>
    <QueryProvider>
     <NextTopLoader
      color="#2299DD"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      easing="ease"
      speed={200}
      shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      zIndex={1600}
      showAtBottom={false}
     />
     <main className="bg-gray-50">{children}</main>
    </QueryProvider>
    <Toaster position="top-right" richColors /> {/* Add Toaster here */}
   </body>
  </html>
 );
}
