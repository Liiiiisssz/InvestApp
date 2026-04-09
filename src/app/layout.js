import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "InvestApp",
  description: "Arquitetura de software - consumindo Investimentos-API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900 h-screen flex overflow-hidden">
        <Sidebar />
      </body>
    </html>
  );
}
