-- sql/usuario.sql
-- Script de criação da tabela USUARIO (baseado no modelo lógico do grupo)

CREATE DATABASE IF NOT EXISTS projeto
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;

USE projeto;

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome       VARCHAR(100) NOT NULL,
    email      VARCHAR(100) NOT NULL,
    telefone   VARCHAR(20)  NOT NULL,
    login      VARCHAR(50)  NOT NULL UNIQUE
    -- A tabela USUARIO não possui chaves estrangeiras no modelo.
    -- Os relacionamentos ficam nas tabelas que referenciam usuario, por exemplo:
    -- (USUARIO_PERFIL) FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);
