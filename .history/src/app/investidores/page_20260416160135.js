import NovoInvestidor from "@/components/NovoInvestidor";



export default async function PaginaInvestidor({searchParams}){
    const query = (await searchParams)?.busca || "";


    const resposta  = await fetch("http://localhost:8081/investidor",{

    })
}