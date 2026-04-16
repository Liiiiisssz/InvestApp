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

    if (!investidores || investidores.length === 0) {
        return <div className="p-8 text-gray-500">Nenhum investidor cadastrado.</div>
    }

    const investidoresFiltrados = investidores.filter(investidor =>
        investidor.nome.toUpperCase().includes(query.toUpperCase())    
    )

    if (investidoresFiltrados.length === 0) {
        return (
            <div className="p-8 min-h-screen bg-gray-50 text-gray-900">
                <h1 className="text-2xl font-bold mb-4 text-blue-800">Painel de Investidores</h1>
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
}