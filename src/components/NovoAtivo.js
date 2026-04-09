"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NovoAtivo() {
    const router = useRouter();
    const [aberto, setAberto] = useState(false);
    const [tiposDisponiveis, setTiposDisponiveis] = useState([]);
    const [tipo, setTipo] = useState("");

    const [formData, setFormData] = useState({
        ticker: "",
        nome: "",
        risco: 1,
        valorAtual: "",
        impostoEstimado: "",
        taxaContratada: "",
        indexador: "",
        dataVencimento: "",
        setor: "",
        segmento: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { ...formData, tipo };

        if (tipo === "ACAO") {
            delete payload.taxaContratada;
            delete payload.indexador;
            delete payload.dataVencimento;
            delete payload.segmento;
        } else if (tipo === "FUNDO_IMOBILIARIO") {
            delete payload.taxaContratada;
            delete payload.indexador;
            delete payload.dataVencimento;
            delete payload.setor;
        } else if (tipo === "RENDA_FIXA") {
            delete payload.setor;
            delete payload.segmento;
        }

        try {
            const resposta = await fetch("http://localhost:8081/ativo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (resposta.ok) {
                setAberto(false);
                setFormData({ 
                    ticker: "", nome: "", risco: 1, valorAtual: "", 
                    impostoEstimado: "", taxaContratada: "", indexador: "", 
                    dataVencimento: "", setor: "", segmento: "" 
                });
                
                router.refresh();
            } else {
                alert("Erro ao salvar ativo.");
            }
        } catch (error) {
            console.error("Erro na requisição: ", error);
        }
    }

    useEffect(() => {
        async function carregarTipos() {
            try {
                const resposta = await fetch("http://localhost:8081/ativo/tipos");
                if (resposta.ok) {
                    const dados = await resposta.json();
                    setTiposDisponiveis(dados);

                    if (dados.length > 0) {
                        setTipo(dados[0]);
                    }
                }
            } catch (error) {
                console.error("Erro ao carregar tipos: ", error);
            }
        }

        carregarTipos();
    }, []);

    return (
        <>
            <button
                onClick={() => setAberto(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
                + Novo Ativo
            </button>

            {aberto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Adicionar Novo Ativo</h2>
                            <button onClick={() => setAberto(false)} className="text-gray-500 hover:text-red-500 font-bold text-xl">
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Ativo</label>
                                <select
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-green-500 focus:border-green-500"
                                >
                                    {tiposDisponiveis.map((t) => (
                                        <option key={t} value={t}>
                                            {t.replace('_', ' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ticker</label>
                                    <input required type="text" name="ticker" value={formData.ticker} onChange={handleChange} placeholder="Ex: WEGE3" className="w-full border border-gray-300 rounded-lg p-2 text-gray-900" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Risco (1 a 5)</label>
                                    <input required type="number" min="1" max="5" name="risco" value={formData.risco} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 text-gray-900" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa/Fundo</label>
                                <input required type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Ex: Weg S.A." className="w-full border border-gray-300 rounded-lg p-2 text-gray-900" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor Atual (R$)</label>
                                    <input required type="number" step="0.01" name="valorAtual" value={formData.valorAtual} onChange={handleChange} placeholder="0.00" className="w-full border border-gray-300 rounded-lg p-2 text-gray-900" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Imposto Est. (R$)</label>
                                    <input required type="number" step="0.01" name="impostoEstimado" value={formData.impostoEstimado} onChange={handleChange} placeholder="0.00" className="w-full border border-gray-300 rounded-lg p-2 text-gray-900" />
                                </div>
                            </div>

                            {tipo === "ACAO" && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Setor</label>
                                    <input required type="text" name="setor" value={formData.setor} onChange={handleChange} placeholder="Ex: Energia, Tecnologia..." className="w-full border border-gray-300 rounded-lg p-2 text-gray-900" />
                                </div>
                            )}

                            {tipo === "FUNDO_IMOBILIARIO" && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Segmento</label>
                                    <input required type="text" name="segmento" value={formData.segmento} onChange={handleChange} placeholder="Ex: Galpões Logísticos, Shoppings..." className="w-full border border-gray-300 rounded-lg p-2 text-gray-900" />
                                </div>
                            )}

                            {tipo === "RENDA_FIXA" && (
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 grid grid-cols-2 gap-4 mt-2">
                                    <div className="col-span-2">
                                        <h3 className="text-sm font-bold text-gray-700 mb-2">Dados de Renda Fixa</h3>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Taxa (%)</label>
                                        <input required type="number" step="0.01" name="taxaContratada" value={formData.taxaContratada} onChange={handleChange} placeholder="Ex: 110" className="w-full border border-gray-300 rounded-lg p-2 text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Indexador</label>
                                        <input required type="text" name="indexador" value={formData.indexador} onChange={handleChange} placeholder="Ex: CDI" className="w-full border border-gray-300 rounded-lg p-2 text-gray-900" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Data de Vencimento</label>
                                        <input required type="date" name="dataVencimento" value={formData.dataVencimento} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 text-gray-900" />
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                                <button type="button" onClick={() => setAberto(false)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                    Cancelar
                                </button>
                                <button type="submit" className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                                    Salvar Ativo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}