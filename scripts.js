const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configuração do cliente PostgreSQL
const client = new Client({
    host: 'localhost',
    database: 'documento',
    user: 'postgres',
    password: '12345',
    port: 5432,
});

// Conectar ao banco de dados
client.connect()
    .then(() => console.log("Conexão bem-sucedida ao banco de dados"))
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        process.exit(1); // Encerra o servidor se não conseguir conectar ao banco
    });

// Rota raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo ao servidor! Rota raiz funcionando.');
});

// Endpoint de cadastro de usuário
app.post('/cadastrar', async (req, res) => {
    console.log('Recebendo dados do cliente:', req.body);

    const { nome, cpf, telefone, endereco, numeroCasa, dataNascimento, sexo, senha } = req.body;

    // Verificação de campos obrigatórios
    if (!nome || !cpf || !telefone || !endereco || !numeroCasa || !dataNascimento || !sexo || !senha) {
        res.status(400).send('Erro: Todos os campos são obrigatórios.');
        return;
    }

    const query = `
    INSERT INTO usuario (nome, cpf, telefone, endereco, numeroCasa, dataNascimento, sexo, senha)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    try {
        console.log('Executando query:', query);
        const result = await client.query(query, [nome, cpf, telefone, endereco, numeroCasa, dataNascimento, sexo, senha]);
        console.log('Resultado da inserção:', result);
        res.status(200).send('Usuário cadastrado com sucesso!');
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err.stack);

        if (err.code === '42P01') {
            res.status(500).send('Erro: A tabela "usuario" não existe. Verifique a estrutura do banco de dados.');
        } else if (err.code === '23505') {
            res.status(409).send('Erro: Já existe um registro com este CPF.');
        } else {
            res.status(500).send('Erro ao cadastrar usuário.');
        }
    }
});

// Endpoint para listar tabelas
app.get('/tabelas', async (req, res) => {
    const query = `
        SELECT table_name 
        FROM information_schema.tables
        WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
    `;
    
    try {
        const result = await client.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao obter tabelas:', err.stack);
        res.status(500).send('Erro ao obter tabelas');
    }
});

// Endpoint para listar relações de chaves estrangeiras
app.get('/relacoes', async (req, res) => {
    const query = `
        SELECT 
            conname AS constraint_name,
            conrelid::regclass AS table_name,
            a.attname AS column_name,
            cl.relname AS referenced_table,
            af.attname AS referenced_column
        FROM 
            pg_constraint AS c
        JOIN 
            pg_attribute AS a ON a.attnum = ANY(c.conkey)
        JOIN 
            pg_class AS cl ON cl.oid = c.confrelid
        JOIN 
            pg_attribute AS af ON af.attnum = ANY(c.confkey)
        WHERE 
            c.contype = 'f'; -- 'f' é para chaves estrangeiras
    `;
    
    try {
        const result = await client.query(query);
        res.status(200).json(result.rows); // Retorna as relações como JSON
    } catch (err) {
        console.error('Erro ao obter relações:', err.stack);
        res.status(500).send('Erro ao obter relações');
    }
});

// Verificar conexão com o banco de dados no início
client.query('SELECT current_database();', (err, res) => {
    if (err) {
        console.error('Erro ao verificar banco de dados:', err.stack);
    } else {
        console.log('Banco de dados conectado:', res.rows[0].current_database);
    }
});

// Configurar servidor para servir arquivos estáticos
app.use('/static', express.static(path.join(__dirname, 'public')));

// Inicialização do servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
