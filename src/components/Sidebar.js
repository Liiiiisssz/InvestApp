"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar(){
    const pathname = usePathname();

    const navLinks = [
        { nome: "Ativos", href: "/ativos" },
        { nome: "Investidores", href: "/investidores" },
        { nome: "Operações", href: "/operacoes" }
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
            
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <span className="text-xl font-bold text-green-800">InvestApp</span>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.nome}
                            href={link.href}
                            className={
                                `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                                    isActive
                                      ? "bg-gray-100 text-gray-900 font-medium" // Classes de QUANDO ESTÁ CLICADO (Ativo)
                                      : "text-gray-600 hover:bg-gray-100"      // Classes do padrão/inativo
                                  }`
                            }
                        >
                            {link.nome}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    );
}