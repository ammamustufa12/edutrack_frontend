"use client";

import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <div className="min-h-screen  flex  p-4">
   <Sidebar />

   <main className="flex-1 flex flex-col px-6">
    <Header />

    <div className="flex-1 overflow-y-auto overflow-x-hidden">{children}</div>
   </main>
  </div>
 );
}
