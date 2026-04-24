import NovoInvestidor from "@/components/NovoInvestidor";

export default async function PaginaInvestidor({ searchParams }) {
    const params = await searchParams;
    const buscaNome = params?.busca || "";
    const saldoMinimo = params?.saldo || "";
    const idInvestidor = params?.id || "";

    let url = "http://localhost:8081/investidor";
    let isBuscaUnica = false;
    
    if (idInvestidor) {
        url = `http://localhost:8081/investidor/${idInvestidor}`;
        isBuscaUnica = true; 
    } else if (buscaNome) {
        url = `http://localhost:8081/investidor/busca-nome?nome=${encodeURIComponent(buscaNome)}`;
    } else if (saldoMinimo) {
        url = `http://localhost:8081/investidor/saldo-minimo?saldo=${saldoMinimo}`;
    }

    const resposta = await fetch(url, { cache: "no-store" });

    if (!resposta.ok) {
        return <div className="p-8 text-red-500">Erro ao conectar com API ({resposta.status})</div>
    }

    const dadosAPI = await resposta.json();

    const investidores = isBuscaUnica ? [dadosAPI] : dadosAPI;

    if (!investidores || investidores.length === 0 || (isBuscaUnica && !dadosAPI.id)) {
        return (
            <div className="min-h-screen bg-gray-50 text-gray-900 p-8 rounded-xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-green-800">Painel de Investidor</h1>
                    <NovoInvestidor />
                </div>
                <div className="text-gray-500">Nenhum investidor encontrado.</div>
            </div>
        )
    }

  
    const investidoresAgrupados = investidores.reduce((acc, inv) => {
        const tipo = inv.tipo || "Outros";
        if (!acc[tipo]) acc[tipo] = [];
        acc[tipo].push(inv);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8 rounded-xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-green-800">Painel de Investidores</h1>
                <NovoInvestidor />
            </div>

            {Object.entries(investidoresAgrupados).map(([tipo, lista]) => (
                <div key={tipo} className="mb-10">
                    <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-600 uppercase tracking-wider">
                        Investidor {tipo}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lista.map((investidor) => (
                            <div key={investidor.id} className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px]">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-lg font-bold block text-gray-900 capitalize">{investidor.nome}</span>
                                        <span className="text-xs text-gray-500">ID: {investidor.id}</span>
                                    </div>
                                    <span className="text-xs px-2 py-1 rounded border font-medium bg-blue-100 text-blue-700 border-blue-300">
                                        {investidor.tipo}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 gap-4 text-center border-t border-gray-200 pt-4 mt-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1 font-medium">Saldo em Conta</p>
                                        <p className="font-bold text-green-600 text-xl">
                                            {investidor.saldo?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}