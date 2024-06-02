// Função para abrir os detalhes do produto
    function abrirDetalhes(nome, descricao, preco, imagem) {
        // Redireciona para a página de detalhes do produto com os parâmetros fornecidos
        window.location.href = 'resumo.html?nome=' + nome + '&descricao=' + descricao + '&preco=' + preco + '&imagem=' + imagem;











// Define a data de término da contagem regressiva
   const endDate = new Date('2024-06-01 20:00:00').getTime();
            
   // Atualiza a contagem regressiva a cada segundo
   const timer = setInterval(function() {
       // Obtém a data e hora atuais
       const now = new Date().getTime();
 
       // Calcula o tempo restante
       const distance = endDate - now;
 
       // Calcula horas, minutos e segundos restantes
       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
       const seconds = Math.floor((distance % (1000 * 60)) / 1000);
 
       // Formata a contagem regressiva como 'horas: minutos: segundos'
       const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
 
       // Atualiza o elemento de contagem regressiva
       document.getElementById('countdown').innerHTML = formattedTime;
 
       // Se o tempo acabar, exibe uma mensagem
       if (distance < 0) {
           clearInterval(timer);
           document.getElementById('countdown').innerHTML = 'EXPIRADO';
       }
   }, 1000);