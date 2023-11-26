const mysql = require('mysql');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'nome_do_banco'
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar: ', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// Executar uma consulta de exemplo
connection.query('SELECT 1 + 1 AS solution', (error, results) => {
  if (error) throw error;
  console.log('Resultado da consulta: ', results[0].solution);
});

// Fechar a conexão ao finalizar
connection.end((err) => {
  if (err) {
    console.error('Erro ao encerrar a conexão: ', err);
    return;
  }
  console.log('Conexão encerrada!');
});