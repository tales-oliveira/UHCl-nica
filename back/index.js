/* eslint-disable no-unreachable */
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const { Pool } = require('pg');

const User = require('./models/User.js');
const Medico = require('./models/Medico.js');
const moment = require('moment');

app.use(express.json());
app.use(cors());
// eslint-disable-next-line no-unused-vars
let antigo;
let email_atual;
let tipo_atual;

// ------------------------------------------------------------------
// Conectando com o banco
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'UHClinica',
    password: 'admin',
    port: 5432,
});

pool.connect()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Error connecting to the database:', err)
);
// ------------------------------------------------------------------

//Requisicao com POST publica para criar usuário
app.post('/cadastro', async (req,res) => {
    try{
        //extraindo os dados do formulário para criacao do usuario
        const {nome, sobrenome, email, password, tipoUsuario} = req.body;
        //Para facilitar já estamos considerando as validações feitas no front

        let novo;
        if (tipoUsuario === 'paciente') {
            // Verifica se o email cadastrado já existe no banco
            try{
                const result = await pool.query('SELECT * FROM pacientes WHERE email = $1', [email]);
                if (result.rows.length > 0){
                    return res.status(409).send(`Email '${email}' já existe no banco.`);
                }
            }catch (error){
                console.error('Error in database query:', error);
                res.status(500).send('Erro interno no servidor 2.');
            }

            // Caso o e-mail não exista no banco, o usuário é cadastrado
            novo = new User(nome, sobrenome, email, password);
            await pool.query('INSERT INTO pacientes (nome, sobrenome, email, senha) VALUES ($1, $2, $3, $4)', [
                nome,
                sobrenome,
                email,
                password
            ]);
            
            res.send(`Paciente cadastrado com sucesso.`);
        }

        else if (tipoUsuario === 'medico'){
            const { IDregistro } = req.body;

            // Verifica se o email cadastrado já existe no banco
            try{
                
                const result = await pool.query('SELECT * FROM medicos WHERE email = $1', [email]);
                if (result.rows.length > 0){
                    return res.status(409).send(`Email '${email}' já existe no banco.`);
                }
            }catch (error){
                console.error('Error in database query:', error);
                res.status(500).send('Erro interno no servidor 2.');
            }

            // Caso o e-mail não exista no banco, o usuário é cadastrado
            novo = new Medico(IDregistro, nome, sobrenome, email, password);
            await pool.query('INSERT INTO medicos (id_registro, nome, sobrenome, email, senha) VALUES ($1, $2, $3, $4, $5)', [
                IDregistro,
                nome,
                sobrenome,
                email,
                password,
            ]);
            
            res.send(`Médico cadastrado com sucesso.`);
        }

        else{
            return res.status(400).send('Tipo de usuário inválido.');
        }

    }catch (error){
        console.error('Error creating account:', error);
        console.error('Stack trace:', error.stack);
        res.status(500).send('Erro interno no servidor 1.');
    }
});


//Requisicao com POST para fazer o login
app.post('/login', async (req,res) => {
    //extraindo os dados do formulário para criacao do usuario
    const {email, password} = req.body;

    email_atual = email;

    // Verifica os médicos
    const memail = await pool.query('SELECT * FROM medicos WHERE email = $1', [email]);
    if(memail.rows.length > 0){
        const msenha = await pool.query('SELECT * FROM medicos WHERE senha = $1', [password]);
        if(msenha.rows.length > 0){
            antigo = memail.email;
            return res.send('Entrou!');
        }else{
            return res.status(422).send(`Senha incorreta.`);
        }
    }

    // Verifica os pacientes
    const pemail = await pool.query('SELECT * FROM pacientes WHERE email = $1', [email]);
    if(pemail.rows.length > 0){
        const msenha = await pool.query('SELECT * FROM pacientes WHERE senha = $1', [password]);
        if(msenha.rows.length > 0){
            antigo = pemail.email;
            return res.send('Entrou!');
        }else{
            return res.status(422).send(`Senha incorreta.`);
        }
    }

    else{
        //Nesse ponto não existe usuario com email informado.
        return res.status(409).send(`E-mail '${email}' não cadastrado no banco.`);    
    }
})


//Requisicao com POST para fazer o update nas tabelas
app.post('/alterar', async (req, res) => {
    const { novoEmail, novaSenha } = req.body;

    try {
        // ----------------------------------------------------------------------------------------
        // MÉDICOS
        // Verifica se o novo email desejado já existe no banco
        const emailResult = await pool.query('SELECT * FROM medicos WHERE email = $1', [novoEmail]);
        if (emailResult.rows.length > 0) {
            return res.status(409).send(`O novo email '${novoEmail}' já está em uso.`);
        }

        // Atualiza a email e/ou senha
        const updateResult = await pool.query('UPDATE medicos SET email = $1, senha = $2 WHERE email = $3', [novoEmail, novaSenha, email_atual]);

        if (updateResult.rowCount > 0) {
            return res.send('Atualização realizada com sucesso!');
            //console.log(medicoId);
        } else {
            return res.status(500).send('Não foi possível realizar a atualização.');
        }
        // ----------------------------------------------------------------------------------------

        // ----------------------------------------------------------------------------------------
        // PACIENTES
        // Verifica se o novo email desejado já existe no banco
        emailResult = await pool.query('SELECT * FROM pacientes WHERE email = $1', [novoEmail]);
        if (emailResult.rows.length > 0) {
            return res.status(409).send(`O novo email '${novoEmail}' já está em uso.`);
            //console.log(emailResult.id_registro);
        }

        // Atualiza a email e/ou senha
        updateResult = await pool.query('UPDATE pacientes SET email = $1, senha = $2 WHERE email = $3', [novoEmail, novaSenha, email_atual]);

        if (updateResult.rowCount > 0) {
            return res.send('Atualização realizada com sucesso!');
            //console.log(medicoId);
        } else {
            return res.status(500).send('Não foi possível realizar a atualização.');
        }
        // ----------------------------------------------------------------------------------------

    }catch (error){
        console.error('Erro na atualização:', error);
        return res.status(500).send('Erro interno no servidor.');
    }
});


//Requisicao com POST para fazer o delete nas tabelas
app.post('/excluir', async (req, res) => {
    const { comando } = req.body;

    if(comando === 'deleteAgenda'):
        await pool.query('DELETE FROM medicos WHERE email = $1', [email_atual]);
            
    await pool.query('DELETE FROM medicos WHERE email = $1', [email_atual]);
    await pool.query('DELETE FROM pacientes WHERE email = $1', [email_atual]);
    console.log('Excluído');
});

//Requisição para os prontuários
app.post('/prontuario', async (req, res) => {
    const { alergias, medicamentos, tipoSanguineo } = req.body;

    //const id_atual = await pool.query('SELECT id_user FROM pacientes WHERE email = $1', [email_atual]);
    
    // Run the query to select the id_user from the pacientes table
    const query = 'SELECT id_user FROM pacientes WHERE email = $1';
    const result = await pool.query(query, [email_atual]);
    // Check if the query returned any rows
    if (result.rows.length === 0) {
      throw new Error('No results found for the given email.');
    }

    // Extract and store the id_user in id_atual
    const id_atual = result.rows[0].id_user;

    console.log(id_atual);
    console.log(alergias, medicamentos, tipoSanguineo);
});

//Requisição para a agenda
app.post('/agenda', async (req, res) => {
    const { newData } = req.body;

    // Formate a data para incluir apenas a data e a hora
    const formattedDateTime = moment(newData.dateTime).format('YYYY-MM-DDTHH:mm:ss');
    
    // Divida a data e a hora usando a função split()
    const [date, time] = formattedDateTime.split('T');

    await pool.query('INSERT INTO consultas (data_consulta, hora, descricao) VALUES ($1, $2, $3)', [
        date,
        time,
        newData.text
    ]);

    res.send(`Consulta cadastrada com sucesso.`);
});


app.post('/admin', async (req, res) =>{
    // const { email, password } = req.body;
    // if(email === 'admin@hotmail.com'){
    //     console.log('email ok');
    // }
    // console.log('admin');
    // console.log(email);
})

app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});

