const express = require("express");
const login = require("./controladores/login")
const usuarios = require("./controladores/usuarios");
const transacao = require("./controladores/transacoes");
const rotas = express();
const verificacaoLogin = require("./filtros/verificacaoLogin")
const categorias = require("./controladores/categorias")



rotas.get('/categorias', categorias.listarCategorias)

rotas.post("/usuario", usuarios.cadastroUsuarios);
rotas.post("/login", login.login);
rotas.use(verificacaoLogin)
rotas.get('/transacao', transacao.transacoesUsuarioLogado)
rotas.get('/transacao/:id', transacao.detalharTransacoes)
rotas.get('/usuario', usuarios.detalharUsuarioLogado);
rotas.post("/transacao", transacao.transacoes);
rotas.patch("/transacao/:id", transacao.alterarTransacao);
rotas.put('/usuario', usuarios.alterarCadastroUsuario);
rotas.delete('/transacao/:id', transacao.excluirTransacao);


module.exports = rotas;
