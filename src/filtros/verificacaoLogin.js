const jwt = require('jsonwebtoken');
const tokenDoUsuario = require('../tokenDoUsuario');
const conexao = require('../conexao');


const verificacaoLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(404).json('Token não informado')
    }
    try {
        const token = authorization.replace('Bearer', '').trim();

        const { id } = jwt.verify(token, tokenDoUsuario);

        const query = 'SELECT * FROM usuarios WHERE id = $1';
        const { rows, rowCount } = await conexao.query(query, [id]);

        if (rowCount === 0) {
            return res.status(404).json('Usuario não encontrado');

        }

        const { senha, ...usuario } = rows[0];

        req.usuario = usuario;

        next();
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

module.exports = verificacaoLogin;