import NovoAtivo from "@/components/NovoAtivo";

export default async function PaginaAtivo({ searchParams }) {
    const query = (await searchParams)?.busca || "";

    const resposta = await fetch("http://localhost:8081/ativo", {
        cache: "no-store"
    });

    if (!resposta.ok) {
        return <div className="p-8 text-red-500">Erro ao conectar com API</div>
    }

    const ativos = await resposta.json();

    // 1. CORREÇÃO AQUI: Adicionado o cabeçalho e o botão se a lista estiver vazia
    if (!ativos || ativos.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 text-gray-900 p-8 rounded-xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-green-800">Painel de Ativos</h1>
                    <NovoAtivo />
                </div>
                <div className="text-gray-500">Nenhum ativo cadastrado.</div>
            </div>
        );
    }

    const ativosFiltrados = ativos.filter(ativo =>
        ativo.ticker.toUpperCase().includes(query.toUpperCase())    
    );

    // 2. CORREÇÃO AQUI: Adicionado o cabeçalho e o botão se o filtro não encontrar nada
    if (ativosFiltrados.length === 0) {
        return(
            <div className="min-h-screen bg-gray-50 text-gray-900 p-8 rounded-xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-green-800">Painel de Ativos</h1>
                    <NovoAtivo />
                </div>
                <p className="text-gray-500">Nenhum ativo encontrado para "{query}"</p>
            </div>
        );
    }

    const ativosAgrupados = ativosFiltrados.reduce((acc, ativo) => {
        const tipoAtivo = ativo.tipo || "Outros";

        if (!acc[tipoAtivo]) acc[tipoAtivo] = [];
        acc[tipoAtivo].push(ativo);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8 rounded-xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-green-800">Painel de Ativos</h1>
                <NovoAtivo />
            </div>

            {Object.entries(ativosAgrupados).map(([tipo, listaAtivos]) => (
                <div key={tipo} className="mb-10">

                    <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-600 uppercase tracking-wider">
                        {tipo.replace('_', ' ')}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listaAtivos.map((ativo) => (
                            <div
                                key={ativo.id}
                                className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[180px]"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-lg font-bold block text-gray-900">{ativo.ticker}</span>
                                        <span className="text-xs text-gray-500">{ativo.nome}</span>
                                    </div>
                                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded border border-gray-300 font-medium">
                                        Risco: {ativo.risco}
                                    </span>
                                </div>

                                <div className="flex-grow"></div>

                                <div className="grid grid-cols-2 gap-4 text-center border-t border-gray-200 pt-4 mt-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1 font-medium">Valor Atual</p>
                                        <p className="font-bold text-green-600">
                                            R$ {ativo.valorAtual?.toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1 font-medium">Imposto Est.</p>
                                        <p className="font-bold text-red-600">
                                            R$ {ativo.impostoEstimado?.toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                {ativo.taxaContratada && (
                                    <div className="grid grid-cols-2 gap-4 text-center bg-gray-50 border border-gray-100 rounded mt-3 py-2">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-medium">Taxa</p>
                                            <p className="text-sm font-semibold text-gray-800">{ativo.taxaContratada}% ({ativo.indexador})</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-medium">Vencimento</p>
                                            <p className="text-sm font-semibold text-gray-800">
                                                {ativo.dataVencimento ? ativo.dataVencimento.split('-').reverse().join('/') : '-'}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}