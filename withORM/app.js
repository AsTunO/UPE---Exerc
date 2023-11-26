// app.js
const sequelize = require('./database');
const User = require('./models/User');

async function helloWorld() {
  try {
    // Sincronize o modelo com o banco de dados
    await sequelize.sync();

    // Crie um usuário
    const newUser = await User.create({
      username: 'example_user',
      email: 'user@example.com'
    });

    // Encontre o usuário recém-criado
    const foundUser = await User.findOne({ where: { username: 'example_user' } });

    // Exiba o nome de usuário do usuário encontrado
    console.log('Hello World! Username:', foundUser.username);
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    // Feche a conexão com o banco de dados ao finalizar
    sequelize.close();
  }
}

helloWorld();