"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NovoInvestidor() {
    const router = useRouter();
    const [aberto, setAberto] = useState(false);
    

    const [tipo, setTipo] = useState("COMUM");

    const [formData, setFormData] = useState({
        nome: "",
        saldo: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const payload = { 
            nome: formData.nome, 
            saldo: parseFloat(formData.saldo),
            tipo: tipo 
        };

        try {
            const resposta = await fetch("http://localhost:8081/investidor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (resposta.ok) {
                setAberto(false);
                setFormData({ nome: "", saldo: "" });
                setTipo("COMUM");
                
                router.refresh(); // Atualiza a página para mostrar o novo investidor
            } else {
                alert("Erro ao salvar investidor.");
            }
        } catch (error) {
            console.error("Erro na requisição: ", error);
        }
    }

    return (
        <>
            <button
                onClick={() => setAberto(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
                + Novo Investidor
            </button>

            {aberto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Adicionar Investidor</h2>
                            <button onClick={() => setAberto(false)} className="text-gray-500 hover:text-red-500 font-bold text-xl">
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Investidor</label>
                                <select
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                                >
                                    <option value="COMUM">Comum</option>
                                    <option value="QUALIFICADO">Qualificado</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                                <input 
                                    required 
                                    type="text" 
                                    name="nome" 
                                    value={formData.nome} 
                                    onChange={handleChange} 
                                    placeholder="Ex: João da Silva" 
                                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Saldo Inicial (R$)</label>
                                <input 
                                    required 
                                    type="number" 
                                    step="0.01" 
                                    name="saldo" 
                                    value={formData.saldo} 
                                    onChange={handleChange} 
                                    placeholder="0.00" 
                                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" 
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                                <button 
                                    type="button" 
                                    onClick={() => setAberto(false)} 
                                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                                >
                                    Salvar Investidor
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}