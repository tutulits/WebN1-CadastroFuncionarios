const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'salario'
});

conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco de dados:', erro);
    } else {
        console.log('Conectado ao banco de dados MySql.');
    }
});

// Inserindo um novo funcionário
app.post('/adicionar', (req, res) => {
    const { nome, email, telefone, data_nascimento, cep, rg, sexo, salario, aliquota, inss_patronal, OutrosEncargos } = req.body;
    const query = 'INSERT INTO funcionario (nome, email, telefone, data_nascimento, cep, rg, sexo, salario, aliquota, inss_patronal, OutrosEncargos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    conexao.query(query, [nome, email, telefone, data_nascimento, cep, rg, sexo, salario, aliquota, inss_patronal, OutrosEncargos], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao adicionar funcionário:', erro);
            res.status(500).send('Erro ao adicionar funcionário: ' + erro.sqlMessage); // Detalhes do erro do MySQL
        } else {
            res.send('Funcionário adicionado com sucesso!');
        }
    });
});

// Listar os funcionários
app.get('/listar', (req, res) => {
    const query = 'SELECT * FROM funcionario'; // Certifique-se de que o nome da tabela está correto
    conexao.query(query, (erro, resultados) => {
        if (erro) {
            console.error('Erro ao buscar funcionários:', erro);
            res.status(500).send('Erro ao buscar funcionários');
        } else {
            res.json(resultados);
        }
    });
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
