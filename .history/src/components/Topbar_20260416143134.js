"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation"; 

export default function TopBar(){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(termo){
        const params = new URLSearchParams(searchParams);
        if(termo){
            params.set('busca', termo);
        } else {
            params.delete('busca');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div className="w-full max-w-md">
                <input 
                    type="text"
                    placeholder="Buscar ativo..."
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block px-4 py-2"
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get('busca')?.toString()}
                />
            </div>
        </header>        
    );
}