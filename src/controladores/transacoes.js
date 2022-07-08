const jwt = require('jsonwebtoken');
const conexao = require('../conexao');
const tokenDoUsuario = require('../tokenDoUsuario');

const detalharTransacoes = async (req, res) => {
    const { usuario } = req;
    const { id: idDetalhe } = req.params;


    try {
        const listaDeTransacoes = await conexao.query('SELECT * FROM transacoes WHERE id = $1 and usuario_id = $2', [idDetalhe, usuario.id])

        return res.status(200).json(listaDeTransacoes.rows);
    } catch (e) {
        return res.status(400).json(e.message);
    }
}

const transacoesUsuarioLogado = async (req, res) => {
    const { usuario } = req;

    try {
        const queryTransacaoLogado = 'SELECT * FROM transacoes WHERE usuario_id = $1';
        const listaDeTransacoes = await conexao.query(queryTransacaoLogado, [usuario.id]);
        return res.status(200).json(listaDeTransacoes.rows);
    } catch (e) {
        return res.status(400).json(e.message);

    }

}

const transacoes = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { usuario } = req;

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(404).json('Todos os campos obrigatórios devem ser informados.');
    }
    if (tipo !== 'entrada' && tipo !== 'saida') {
        return res.status(404).json('deve ser informado o tipo de entrada ou saida')
    }
    try {

        const queryTransacao = 'INSERT INTO transacoes (usuario_id, descricao, valor, data, categoria_id, tipo) VALUES ($1, $2, $3, $4, $5, $6)';
        const transacao = await conexao.query(queryTransacao, [usuario.id, descricao, valor, data, categoria_id, tipo]);

        if (transacao.rowCount === 0) {
            return res.status(400).json('Transação nao efetuada');

        }
        return res.status(200).json('Transação efetuado com sucesso');

    } catch (e) {
        return res.status(400).json(e.message)
    }
}

const alterarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id } = req.body;
    const { usuario } = req;
    const { id: idTransacao } = req.params;


    if (!descricao || !valor || !data || !categoria_id) {
        return res.status(404).json('Todos os campos obrigatórios devem ser informados.');
    }
    try {

        const queryTransacaoExistente = 'SELECT * FROM transacoes WHERE id = $1 and usuario_id = $2';
        const transacaoExistente = await conexao.query(queryTransacaoExistente, [idTransacao, usuario.id]);

        if (transacaoExistente.rowCount === 0) {
            return res.status(404).json('Transação não encontrado');

        }

        const queryTransacao =
            'UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4 WHERE id = $5 and usuario_id = $6';

        const transacao = await conexao.query(queryTransacao, [descricao, valor, data, categoria_id, idTransacao, usuario.id]);

        if (transacao.rowCount === 0) {
            return res.status(400).json('Transação nao efetuada');

        }
        return res.status(200).json('Transação efetuado com sucesso');

    } catch (e) {
        return res.status(400).json(e.message)
    }

}

const excluirTransacao = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params
    try {

        const queryTransacaoExistente = 'SELECT * FROM transacoes WHERE id = $1 and usuario_id = $2';
        const transacaoExistente = await conexao.query(queryTransacaoExistente, [id, usuario.id]);

        if (transacaoExistente.rowCount === 0) {
            return res.status(404).json('Transação não encontrado');

        }

        const { rowCount } = await conexao.query('DELETE FROM transacoes WHERE id = $1', [id])
        if (rowCount === 0) {
            return res.status(404).json('Não foi possivel excluir a transação')
        }

        return res.status(200).json()

    } catch (e) {
        return res.status(400).json(e.message)
    }

}


module.exports = { transacoes, alterarTransacao, excluirTransacao, transacoesUsuarioLogado, detalharTransacoes }
