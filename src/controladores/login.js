const conexao = require("../conexao");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenDoUsuario = require('../tokenDoUsuario');


const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(404).json("Para fazer o login favor informar o e-mail e a senha");

    }

    try {
        const queryVerificarEmail = "SELECT * FROM usuarios WHERE email = $1";
        const { rows, rowCount } = await conexao.query(queryVerificarEmail, [email]);


        if (rowCount === 0) {
            return res.status(404).json("Usuário nao encontrado!")
        }

        const usuarioExiste = rows[0];

        const senhaVerificada = await bcrypt.compare(senha, usuarioExiste.senha);
        if (!senhaVerificada) {
            return res.status(400).json('E-mail e/ou senha incorretos')

        }
        const { senha: senhaUsuario, ...dadosUsuario } = usuarioExiste;

        const token = jwt.sign(
            { id: usuarioExiste.id, },
            tokenDoUsuario,
            { expiresIn: "1d" });
            
        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });

    } catch (e) {
        return res.status(500).json(e.message);
    }

};
module.exports = { login }; 
