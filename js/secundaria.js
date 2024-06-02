// Função para obter parâmetros da URL
function obterParametro(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

// Preencher informações do produto quando a página carrega
window.onload = function() {
    // Obter os parâmetros da URL
    const nome = obterParametro('nome');
    const descricao = obterParametro('descricao');
    const preco = obterParametro('preco');
    const imagem = obterParametro('imagem');

    // Verificar se os parâmetros existem antes de preencher as informações do produto
    if (nome && descricao && preco && imagem) {
        // Preencher informações do produto nos elementos HTML
        document.getElementById('produtoTitulo').innerText = nome;
        document.getElementById('produtoDescricao').innerText = descricao;
        document.getElementById('produtoPreco').innerText = 'Preço: R$ ' + preco;

        // Atualizar a imagem do produto
        document.getElementById('produtoImagem1').src = imagem;
    }
};



    // Função para adicionar um produto ao carrinho
    function adicionarAoCarrinh() {
        // Obter os detalhes do produto
        const nome = obterParametro('nome');
        const descricao = obterParametro('descricao');
        const preco = obterParametro('preco');

        // Redirecionar para a página do carrinho, passando os detalhes do produto como parâmetros da URL
        window.location.href = 'carrinho.html?nome=' + encodeURIComponent(nome) + '&descricao=' + encodeURIComponent(descricao) + '&preco=' + encodeURIComponent(preco);
    }












const lojaCEP = '50660-250'; // CEP da loja

document.getElementById('shipping-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Captura o CEP de destino inserido pelo usuário
    const cep = document.getElementById('cep').value;
    
    // Chama a função para calcular o frete
    calcularFrete(cep);
    
    // Limpa o campo de texto
    document.getElementById('cep').value = '';
});

// Função para calcular o frete com base no CEP de destino
async function calcularFrete(cep) {
    try {
        // Obter as coordenadas (latitude e longitude) do endereço de destino usando a API da OpenStreetMap
        const coordenadas = await obterCoordenadas(cep);
        
        // Obter as coordenadas (latitude e longitude) do endereço da loja usando o CEP fixo
        const lojaCoordenadas = await obterCoordenadas(lojaCEP);
        
        // Calcular a distância entre os dois endereços
        const distancia = calcularDistanciaHaversine(lojaCoordenadas, coordenadas);
        
        // Calcular o frete com base na distância (R$1 por quilômetro)
        const frete = distancia * 1;
        
        // Exibir o resultado do frete
        document.getElementById('resultado-frete').textContent = `O frete para o CEP ${cep} é de R$ ${frete.toFixed(2)}`;
    } catch (error) {
        console.error('Erro ao calcular o frete:', error);
    }
}

// Função para obter as coordenadas (latitude e longitude) de um endereço usando a API da OpenStreetMap
async function obterCoordenadas(endereco) {
    // Substitua 'SEU_USUARIO' pelo nome de usuário cadastrado na OpenStreetMap
    const username = 'Jonis_Vitor_Ferreira_Silva';
    
    // URL da API da OpenStreetMap para obter coordenadas a partir de um endereço
    const url = `https://nominatim.openstreetmap.org/search?q=${endereco}&format=json&limit=1&addressdetails=1&countrycodes=BR&username=${username}`;
    
    // Faça a requisição usando fetch ou axios
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.length === 0) {
        throw new Error('Endereço não encontrado');
    }
    
    // Retorna as coordenadas do primeiro resultado encontrado
    return { latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) };
}

// Função para calcular a distância entre dois pontos usando a fórmula de Haversine
function calcularDistanciaHaversine(origem, destino) {
    const raioTerra = 6371; // Raio médio da Terra em quilômetros
    const dLat = grausParaRadianos(destino.latitude - origem.latitude);
    const dLon = grausParaRadianos(destino.longitude - origem.longitude);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(grausParaRadianos(origem.latitude)) * Math.cos(grausParaRadianos(destino.latitude)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = raioTerra * c;
    
    return distancia;
}

// Função auxiliar para converter graus em radianos
function grausParaRadianos(graus) {
    return graus * Math.PI / 180;
}



function salvarCarrinho(item) {
    let carrinho = localStorage.getItem('carrinho');
    if (!carrinho) {
        carrinho = [];
    } else {
        carrinho = JSON.parse(carrinho);
    }
    carrinho.push(item);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

