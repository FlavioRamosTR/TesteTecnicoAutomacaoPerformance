
-- Criação das tabelas
CREATE TABLE produtos (
    id INT PRIMARY KEY,
    nome VARCHAR(100),
    preco DECIMAL(10,2),
    em_promocao BIT
);

CREATE TABLE estoque (
    produto_id INT FOREIGN KEY REFERENCES produtos(id),
    quantidade INT
);

CREATE TABLE pedidos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    cliente_id INT,
    produto_id INT,
    quantidade INT,
    total DECIMAL(10,2)
);


INSERT INTO produtos (id, nome, preco, em_promocao)
SELECT 
    n, 
    CONCAT('Produto ', n),
    ROUND(RAND() * 1000, 2),
    CASE WHEN n % 5 = 0 THEN 1 ELSE 0 END 
FROM generate_series(1, 100) AS n;

INSERT INTO estoque (produto_id, quantidade)
SELECT id, FLOOR(RAND() * 100) + 1 FROM produtos;