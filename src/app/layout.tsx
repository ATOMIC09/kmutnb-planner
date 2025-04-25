import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Analytics } from '@vercel/analytics/next';
import Footer from "@/components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "KMUTNB Planner: จัดตารางเรียน",
  description: "ระบบจัดตารางเรียนสำหรับนักศึกษา มจพ. (KMUTNB) ค้นหารายวิชา จัดตารางเรียน ตรวจสอบวันสอบ ง่ายและสะดวกในที่เดียว",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png'],
  },
  manifest: '/site.webmanifest',
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
            <SpeedInsights/>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
