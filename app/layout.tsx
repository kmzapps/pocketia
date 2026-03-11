import "./globals.css";
import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="h-screen flex overflow-hidden bg-[#1E1B4B]">

        <Sidebar />

        <main className="flex-1 bg-[#F5F3FF] p-8 overflow-y-auto">
          {children}
        </main>

      </body>
    </html>
  );
}