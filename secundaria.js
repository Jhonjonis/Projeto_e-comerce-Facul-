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







document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const questionText = document.getElementById('question').value;

    // Cria um novo comentário
    const commentSection = document.getElementById('comments-section');
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    
    const commentText = document.createElement('span');
    commentText.textContent = questionText;

    // Adiciona um botão de exclusão apenas se o modo de edição estiver ativo
    if (document.body.classList.contains('edit-mode')) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', function() {
            commentSection.removeChild(newComment);
        });
        newComment.appendChild(deleteButton);
    }

    newComment.appendChild(commentText);
    commentSection.appendChild(newComment);
    
    // Limpa o campo de texto
    document.getElementById('question').value = '';
});

// Função para ativar/desativar o modo de edição
function toggleEditMode() {
    document.body.classList.toggle('edit-mode');
}
