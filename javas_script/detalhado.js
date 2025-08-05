function closeNav() {
    // Adiciona a classe .hidden à sidebar para escondê-la
    document.getElementById("sidebar").classList.add("hidden");

    // Adiciona a classe .expanded ao conteúdo principal para ocupar toda a largura
    document.getElementById("main-content").classList.add("expanded");
}

// Função para abrir a sidebar
function openNav() {
    // Remove a classe .hidden da sidebar para exibi-la
    document.getElementById("sidebar").classList.remove("hidden");

    // Remove a classe .expanded do conteúdo principal para retornar ao layout normal
    document.getElementById("main-content").classList.remove("expanded");
}

document.addEventListener('DOMContentLoaded', async function() {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');

    if (token && username) {
        try {
            const response = await axios.get(`https://87c7-138-219-192-138.ngrok-free.app/4Shark/Detalhado2/${username}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const tabela = document.getElementById('tabela-transacoes');
            const dados = response.data.data;  // Verifique se 'data' é a estrutura correta do JSON

            dados.forEach(dado => {
                const linha = document.createElement('tr');

                linha.innerHTML = `
                    <td>${new Date(dado.Dt_Emissao).toLocaleDateString()}</td>
                    <td>${dado.Tecnico}</td>
                    <td>${dado.Descrição}</td>
                    <td>R$ ${dado.valor_unitario}</td>
                `;

                tabela.appendChild(linha);
            });
        } catch (error) {
            console.error('Erro ao carregar dados de detalhado', error);
        }
    } else {
        console.log('Token ou nome de usuário não encontrado.');
    }
});
