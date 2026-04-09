import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/Topbar";

export const metadata = {
  title: "InvestApp",
  description: "Arquitetura de software - consumindo Investimentos-API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="text-gray-900 h-screen flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
