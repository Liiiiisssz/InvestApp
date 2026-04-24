# 💻 Frontend - Sistema Financeiro (InvestApp)

## 📌 Sobre o Frontend

Este módulo representa a interface web do sistema financeiro (**InvestApp**), desenvolvida com **Next.js (App Router)** e **React**.

Atualmente, o frontend está em desenvolvimento, com foco inicial na funcionalidade de **visualização e cadastro de ativos**.

---

## 🚧 Status do Projeto

| Funcionalidade        | Status        |
|----------------------|-------------|
| 📊 Listagem de Ativos | ✅ Concluído |
| ➕ Cadastro de Ativos | ✅ Concluído |
| 🔍 Busca de Ativos    | ✅ Concluído |
| 👤 Investidores       | 🚧 Em desenvolvimento |
| 💸 Operações          | 🚧 Em desenvolvimento |

---

## 🏗️ Tecnologias Utilizadas

- **Next.js 14+ (App Router)**
- **React**
- **Tailwind CSS**
- **Fetch API**
- **Java Spring Boot (Backend)**

---

## 🧠 Arquitetura do Frontend

O frontend segue uma estrutura baseada em componentes reutilizáveis:

```bash
app/
 ├── ativos/
 │    └── page.js
 │
 ├── investidores/
 |    └── page.js
 |
 ├── operacoes/
 |    └── page.js
 |
components/
 ├── NovoAtivo.jsx
 ├── Sidebar.jsx
 └── TopBar.jsx
```

---

## 📊 Página de Ativos

A página /ativos é responsável por:

- Buscar ativos da API (GET /ativo)
- Filtrar ativos por ticker
- Agrupar ativos por tipo
- Exibir dados em cards

##

### 🔍 Funcionalidade de Busca

A busca é controlada via query params:

```
/ativos?busca=PETR
```

#### Funcionamento:

- O termo é capturado via searchParams
- A lista é filtrada em tempo real

```
const ativosFiltrados = ativos.filter(ativo =>
    ativo.ticker.toUpperCase().includes(query.toUpperCase())
)
```

##

### 📦 Agrupamento por Tipo

Os ativos são organizados dinamicamente:

```
const ativosAgrupados = ativosFiltrados.reduce((acc, ativo) => {
    const tipoAtivo = ativo.tipo || "Outros";

    if (!acc[tipoAtivo]) acc[tipoAtivo] = [];
    acc[tipoAtivo].push(ativo);

    return acc;
}, {})
```

##

### 🧾 Exibição dos Cards

Cada ativo exibe:

- Ticker
- Nome
- Risco
- Valor Atual
- Imposto Estimado

O componente **NovoAtivo** permite criar novos ativos dinamicamente.

---

## 🔄 Fluxo:

- Busca tipos disponíveis (GET /ativo/tipos)
- Usuário seleciona tipo
- Formulário adapta campos dinamicamente
- Envia requisição POST /ativo

##

### 🧠 Lógica dinâmica por tipo

O formulário muda conforme o tipo:

| 📊 AÇÃO | 🏢 FUNDO IMOBILIÁRIO | 💰 RENDA FIXA |
|---------|-----------------------|----------------|
| - ticker | - ticker | - ticker
| - nome | - nome | - nome
| - valorAtual | - valorAtual | - valorAtual
| - setor | - segmento | - taxaContratada
| | | - indexador
| | | - dataVencimento

##

### 🚗 Envio para API

```
await fetch("http://localhost:8081/ativo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
});
```

---

## 🚀 Como Executar

- Instalar dependências:

```
npm install
```

- Rodar projeto:

```
npm run dev
```

- Acessar:

```
http://localhost:3000/ativos
```

---

## 🔮 Próximos Passos

- Implementar tela de Investidores
- Implementar tela de Operações

---

## 👩‍💻 Autores

<table align="center">
  <tr>
    <td align="center" width="160" height="200" style="border:2px solid #ccc;">
      <img src="https://github.com/Liiiiisssz.png" width="115" height="115"><br>
      <sub><a href="https://github.com/Liiiiisssz">Elis Jasper</a></sub>
    </td>
    <td align="center" width="160" height="200" style="border:2px solid #ccc;">
      <img src="https://github.com/KaelLuih.png" width="115" height="115"><br>
      <sub><a href="https://github.com/KaelLuih">Kael Luih de Araujo</a></sub>
    </td>
  </tr>
</table>
