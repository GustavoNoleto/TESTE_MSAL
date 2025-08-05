// Resumo

// Função para fechar a sidebar
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
    const Premio = document.getElementById("Premio");
    const Premio2 = document.getElementById("Premio2");
    const Premio3 = document.getElementById("Premio3");
    const Percentual = document.getElementById("Percentual");
    const Usuário = document.getElementById("Usuário");
    const Periodicidade = document.getElementById("Periodicidade");
    const FY = document.getElementById("FY");
    const fiscalYearSelect = document.getElementById('fiscalYearSelect');
    const filterButton = document.getElementById('filterButton');
    
    
    let fiscalData = [];

    if (token && username) {
        try {
            const response = await axios.get(`https://2408ad7e9de7.ngrok-free.app/4Shark/ResumoMinio`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fiscalData = response.data.data;
            
            // Populando o seletor com os anos fiscais disponíveis
            fiscalData.forEach((item, index) => {
                const option = document.createElement('option');
                option.value = index;  // Usando o índice para filtrar mais tarde
                option.textContent = item.AnoFiscal_Trimestre;
                fiscalYearSelect.appendChild(option);
            });

            // Definindo função para filtrar os dados quando o botão for clicado
            filterButton.addEventListener('click', function() {
                const selectedIndex = fiscalYearSelect.value;
                if (selectedIndex !== "") {
                    displayData(fiscalData[selectedIndex]);
                }
            });

            // Exibe os dados para o primeiro item por padrão
            displayData(fiscalData[0]);
            
        } catch (error) {
            console.error('Erro ao carregar dados de resumo', error);
        }
    } else {
        console.log('Token ou nome de usuário não encontrado.');
    }

    function displayData(data) {
        Premio.innerHTML = `R$ ${data.Valor_Premiação}`;
        Premio2.innerHTML = `R$ ${data.Valor_Premiação}`;
        Premio3.innerHTML = `R$ ${data.Faturamento_liquido}`;
        Percentual.innerHTML = `${data.Percentual}%`;
        Usuário.innerHTML = `${data.Tecnico}`;
        Periodicidade.innerHTML = `Periodicidade: ${data.Data_Início} até ${data.Data_Fim}`;
        FY.innerHTML = `Premiação: | ${data.AnoFiscal_Trimestre}`;
    }
    

});
