const conexao = require('../conexao');

const listarCategorias = async (req, res) => {
    try {
        const listaDeCategorias = await conexao.query('SELECT * FROM categorias')
        return res.status(200).json(listaDeCategorias.rows)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

module.exports = { listarCategorias }