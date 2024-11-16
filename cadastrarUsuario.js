async function cadastrarUsuario() {
    const form = document.getElementById('cadastroForm');
    const formData = new FormData(form);

    const data = {
        nome: formData.get('nome'),
        cpf: formData.get('cpf'),
        telefone: formData.get('telefone'),
        endereco: formData.get('endereco'),
        numeroCasa: formData.get('numeroCasa'),
        dataNascimento: formData.get('dataNascimento'),
        sexo: formData.get('sexo'),
        senha: formData.get('senha')
    };

    console.log("Dados a serem enviados:", data); // Adicione este log para verificar os dados

    try {
        const response = await fetch("http://localhost:4000/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
        }

        const result = await response.json();
        console.log("Usuário cadastrado com sucesso", result);
        alert('Usuário cadastrado com sucesso!');
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        alert('Erro ao cadastrar usuário!');
    }
}
