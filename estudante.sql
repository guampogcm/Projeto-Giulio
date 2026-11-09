-- estudante.sql
-- Script de criacao da tabela ESTUDANTE.
-- As colunas foram tiradas dos campos do formulario estudante.html.
-- Rode este script no phpMyAdmin (aba SQL) antes de testar o CRUD.

USE poliwomen; -- mesmo banco configurado no conexao.php

CREATE TABLE IF NOT EXISTS estudante (
    id_estudante   INT AUTO_INCREMENT PRIMARY KEY, -- gerado pelo banco, o usuario nao digita
    nome           VARCHAR(100) NOT NULL,          -- unico campo obrigatorio (required no HTML)
    email          VARCHAR(100),
    curso          VARCHAR(100),
    periodo        VARCHAR(20),
    telefone       VARCHAR(20),
    area_interesse VARCHAR(100),
    data_inicio    DATE                            -- formato AAAA-MM-DD (o mesmo do input type="date")
);
