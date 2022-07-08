
DROP TABLE IF EXISTS usuarios;


CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT UNIQUE NOT NULL
)

DROP TABLE IF EXISTS categorias;

CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL
);

INSERT INTO categorias (descricao)
VALUES
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas')


DROP TABLE IF EXISTS transacoes;

CREATE TABLE IF NOT EXISTS transacoes (
    
  id SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor NUMERIC NOT NULL,
  data DATE NOT NULL DEFAULT NOW(),
  categoria_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  tipo TEXT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
  FOREIGN KEY (categoria_id) REFERENCES categorias (id)
);
