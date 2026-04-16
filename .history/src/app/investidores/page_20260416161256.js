import NovoInvestidor from "@/components/NovoInvestidor";



export default async function PaginaInvestidor({searchParams}){
    const query = (await searchParams)?.busca || "";


    const resposta  = await fetch("http://localhost:8081/investidor",{
        cache: "no-store"

    });

    if (!resposta.ok) {
        return <div className="p-8 text-red-500">Erro ao conectar com API</div>
    }   

    const investidor = await resposta.json();

    if (!investidor || investidor.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 text-gray-900 p-8 rounded-xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-green-800">Painel de Investidor</h1>
                <NovoInvestidor/>
              
            </div>
                
               <div className="text-gray-500">Nenhum ativo cadastrado.</div>
            </div>
        )
    }

    const investidoresFiltrados = investidor.filter(investidor =>
        investidor.nome.toUpperCase().includes(query.toUpperCase())    
    )

    if (investidoresFiltrados.length === 0) {
        return (
            <div className="p-8 min-h-screen bg-gray-50 text-gray-900">
                <h1 className="text-2xl font-bold mb-4 text-green-800">Painel de Investidores</h1>
                <p className="text-gray-500">Nenhum investidor encontrado para "{query}"</p>
            </div>
        )
    }
    const investidoresAgrupados = investidoresFiltrados.reduce((acc, investidor) => {
        const tipoInvestidor = investidor.tipo || "Outros";

        if (!acc[tipoInvestidor]) acc[tipoInvestidor] = [];
        acc[tipoInvestidor].push(investidor);
        return acc;
    }, {})
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8 rounded-xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-green-800">Painel de Investidores</h1>
                {/* Lembre-se de criar este componente depois */}
                <NovoInvestidor />
            </div>

            {Object.entries(investidoresAgrupados).map(([tipo, listaInvestidores]) => (
                <div key={tipo} className="mb-10">

                    <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-600 uppercase tracking-wider">
                        Investidor {tipo}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listaInvestidores.map((investidor) => (
                            <div
                                key={investidor.id}
                                className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px]"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-lg font-bold block text-gray-900 capitalize">
                                            {investidor.nome}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            ID: {investidor.id}
                                        </span>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded border font-medium ${
                                        investidor.tipo === 'Qualificado' 
                                        ? 'bg-purple-100 text-purple-700 border-purple-300' 
                                        : 'bg-blue-100 text-blue-700 border-blue-300'
                                    }`}>
                                        {investidor.tipo}
                                    </span>
                                </div>

                                <div className="flex-grow"></div>

                                <div className="grid grid-cols-1 gap-4 text-center border-t border-gray-200 pt-4 mt-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1 font-medium">Saldo em Conta</p>
                                        <p className="font-bold text-blue-600 text-xl">
                                            {}
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
    )
}