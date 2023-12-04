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
descricao varchar(100),
id_paciente int,
id_medico int,
foreign key(id_paciente) references pacientes (id_user),
foreign key(id_medico) references medicos (id_registro)
)

create table prontuario(
number int primary key,
alergias text[],
medicamentos text[],
tipo_sanguineo varchar(3),
id_paciente int,
foreign key(id_paciente) references pacientes (id_user) on delete cascade
)

create table admin(
id_admin serial primary key,
email varchar(30) unique not null,
senha varchar(30) not null
)
insert into admin values(1, 'admin@admin', 'admin')


create table parceiros(
id_parceiro serial primary key,
nome varchar(30) unique not null,
endereco varchar(50) unique not null,
email varchar(30) unique not null,
telefone varchar(20) unique not null,
cnpj varchar(20) unique not null
)



-- teste insert into prontuario values(1, ARRAY['Pólen'], ARRAY['Paracetamol', 'Aspirina'], 'AB+', 2)