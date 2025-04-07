import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Analytics } from '@vercel/analytics/next';
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "KMUNTB Planner",
  description: "A student planner for KMUNTB students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
            <Footer />
            <Analytics />
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
