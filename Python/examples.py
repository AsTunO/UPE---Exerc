from flask import Flask, g
import sqlite3

app = Flask(__name__)

DATABASE = 'exemplo.db'

@app.route('/add/<mensagem>')
def add_message(mensagem):
    cursor = get_db().cursor()
    cursor.execute('''INSERT INTO mensagens (conteudo) VALUES (?)''', (mensagem,))
    get_db().commit()
    return f'Mensagem: {mensagem}'

# Função para conectar ao banco de dados
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# Rota para mostrar dados do banco
@app.route('/')
def show_messages():
    cursor = get_db().cursor()
    cursor.execute('''SELECT * FROM mensagens''')
    mensagens = cursor.fetchall()
    return f'Mensagens: {mensagens[2]}'

if __name__ == '__main__':
    app.run(debug=True)