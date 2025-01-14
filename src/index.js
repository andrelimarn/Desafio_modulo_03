const cors = require('cors');
const express = require("express");
const rotas = require('./rotas');

const app = express();
app.use(cors());
app.use(express.json());
app.use(rotas);

app.listen(9000);