import "./globals.css";
import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="flex bg-[#F5F3FF]">

        <Sidebar />

        <main className="flex-1 p-10 bg-gray-100 min-h-screen">
          {children}
        </main>

      </body>
    </html>
  );
}