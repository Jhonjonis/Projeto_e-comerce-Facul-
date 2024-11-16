const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    database: 'postgres', // Banco de dados "template" que você pode usar para criar o novo banco
    user: 'postgres',
    password: '12345',
    port: 5432
});

async function criarBancoETabelas() {
    try {
        // Criar o banco de dados se não existir
        await client.connect();
        await client.query('CREATE DATABASE documento');
        
        // Fechar a conexão com o banco "postgres" e se reconectar ao novo banco
        await client.end();
        client.database = 'documento';
        await client.connect();

        // Criar a tabela
        const createTableQuery = `
            CREATE TABLE usuario (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(100),
                cpf VARCHAR(15),
                telefone VARCHAR(20),
                endereco VARCHAR(255),
                numeroCasa VARCHAR(10),
                dataNascimento DATE,
                sexo VARCHAR(10),
                senha VARCHAR(255)
            )
        `;
        await client.query(createTableQuery);
        console.log("Banco e tabela criados com sucesso!");
    } catch (err) {
        console.error('Erro ao criar banco ou tabela:', err);
    } finally {
        await client.end();
    }
}

criarBancoETabelas();
