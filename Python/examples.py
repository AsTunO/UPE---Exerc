from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'  # Nome do banco de dados SQLite
db = SQLAlchemy(app)

# Modelo de exemplo (substitua com o seu modelo)
class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    descricao = db.Column(db.String(200))

    def __init__(self, nome, descricao):
        self.nome = nome
        self.descricao = descricao

# Rotas CRUD
@app.route('/produtos', methods=['GET'])
def listar_produtos():
    produtos = Produto.query.all()
    output = []
    for produto in produtos:
        output.append({'id': produto.id, 'nome': produto.nome, 'descricao': produto.descricao})
    return jsonify({'produtos': output})

@app.route('/produto/<id>', methods=['GET'])
def obter_produto(id):
    produto = Produto.query.get(id)
    if not produto:
        return jsonify({'message': 'Produto não encontrado'})
    return jsonify({'id': produto.id, 'nome': produto.nome, 'descricao': produto.descricao})

@app.route('/produto', methods=['POST'])
def criar_produto():
    data = request.get_json()
    novo_produto = Produto(nome=data['nome'], descricao=data['descricao'])
    db.session.add(novo_produto)
    db.session.commit()
    return jsonify({'message': 'Produto criado com sucesso'})

@app.route('/produto/<id>', methods=['PUT'])
def atualizar_produto(id):
    produto = Produto.query.get(id)
    if not produto:
        return jsonify({'message': 'Produto não encontrado'})

    data = request.get_json()
    produto.nome = data['nome']
    produto.descricao = data['descricao']
    db.session.commit()
    return jsonify({'message': 'Produto atualizado com sucesso'})

@app.route('/produto/<id>', methods=['DELETE'])
def deletar_produto(id):
    produto = Produto.query.get(id)
    if not produto:
        return jsonify({'message': 'Produto não encontrado'})
    db.session.delete(produto)
    db.session.commit()
    return jsonify({'message': 'Produto deletado com sucesso'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
