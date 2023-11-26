const mysql = require('mysql');

// Configurações para conexão com o MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'juliocesar27'
}); 

// Conectar ao MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar: ', err);
    return;
  }
  console.log('Conectado ao MySQL!');
  
  // Criar um banco de dados
  connection.query('CREATE DATABASE IF NOT EXISTS meu_banco_de_dados', (error) => {
    if (error) throw error;
    console.log('Banco de dados criado ou já existente.');
    
    // Usar o banco de dados criado
    connection.query('USE meu_banco_de_dados', (useError) => {
      if (useError) throw useError;
      console.log('Usando o banco de dados.');

      // Criar uma tabela
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS usuarios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255),
          email VARCHAR(255)
        )
      `;
      connection.query(createTableQuery, (tableError) => {
        if (tableError) throw tableError;
        console.log('Tabela de usuários criada ou já existente.');

        // Inserir dados na tabela
        const insertQuery = 'INSERT INTO usuarios (nome, email) VALUES ?';
        const values = [
          ['João', 'joao@example.com'],
          ['Maria', 'maria@example.com'],
          ['José', 'jose@example.com']
        ];
        connection.query(insertQuery, [values], (insertError, result) => {
          if (insertError) throw insertError;
          console.log(`${result.affectedRows} linhas inseridas na tabela.`);
          
          // Encerrar a conexão ao finalizar
          connection.end((endError) => {
            if (endError) {
              console.error('Erro ao encerrar a conexão: ', endError);
              return;
            }
            console.log('Conexão encerrada.');
          });
        });
      });
    });
  });
});