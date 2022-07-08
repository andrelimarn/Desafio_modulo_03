const conexao = require('../conexao');
const bcrypt = require('bcrypt')


const detalharUsuarioLogado = async (req, res) => {
    const { usuario } = req;

    try {
        const detalheUsuario = await conexao.query('SELECT * FROM usuarios WHERE id = $1', [usuario.id])
        return res.status(200).json(detalheUsuario.rows);
    } catch (e) {
        return res.status(400).json(e.message);

    }

}

const cadastroUsuarios = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(404).json("Os campos nome, email e senha são obrigatórios");
    }

    try {
        const queryVerificarEmail = "SELECT * FROM  usuarios WHERE email = $1";
        const { rowCount: quantidadeUsuario } = await conexao.query(queryVerificarEmail, [email])

        if (quantidadeUsuario > 0) {
            return res.status(400).json("Já existe usuário cadastrado com o e-mail informado.");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const query = "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)";
        const usuarioCadastrado = await conexao.query(query, [nome, email, senhaCriptografada]);

        if (usuarioCadastrado.rowCount === 0) {
            return res.status(400).json("Erro na Inserção");
        }

        return res.status(200).json();

    } catch (e) {
        return res.status(500).json(e.message);
    }
}

const alterarCadastroUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const usuario = req.usuario
    
    if (!nome || !email || !senha) {
        return res.status(404).json("Os campos nome, email e senha são obrigatórios");
    }


    try {
        const queryVerificarEmail = "SELECT * FROM  usuarios WHERE email = $1";
        const {rowCount: quantidadeUsuario } = await conexao.query(queryVerificarEmail, [email])

        if (quantidadeUsuario > 0 && email != usuario.email) {
            return res.status(400).json("Já existe usuário cadastrado com o e-mail informado.");
        }

        
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const queryAlterarCadastroUsuario = "UPDATE usuarios SET nome = $1 , email = $2, senha = $3";
        const usuarioCadastrado = await conexao.query(queryAlterarCadastroUsuario , [nome, email, senhaCriptografada]);

        if (usuarioCadastrado.rowCount === 0) {
            return res.status(400).json("Erro na Inserção");
        }
        return res.status(200).json()

    } catch (e) {
        return res.status(500).json(e.message);
    }
}



module.exports = { cadastroUsuarios, alterarCadastroUsuario, detalharUsuarioLogado }