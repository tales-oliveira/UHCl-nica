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

create table consultas(
id_consulta serial primary key,
data_consulta date,
hora time,
descricao varchar(100)
)

create table prontuario(
number int primary key,
alergias text[],
medicamentos text[],
tipo_sanguineo varchar[3],
id_paciente int,
foreign key(id_paciente) references pacientes (id_user)
)
