-- Criei o banco com o nome 'UHClinica', caso for usar um nome diferente, trocar no 'index.js' na pasta 'back'

create table medicos(
id_registro int primary key,
nome varchar(20) not null,
sobrenome varchar(20) not null,
email varchar(30) unique not null,
senha varchar(20) not null
)

create table pacientes(
id_user serial primary key,
nome varchar(20) not null,
sobrenome varchar(20) not null,
email varchar(30) unique not null,
senha varchar(20) not null
)