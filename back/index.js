const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

const User = require('./models/User.js');
const Medico = require('./models/Medico.js');
const moment = require('moment');

app.use(express.json());
app.use(cors());
// eslint-disable-next-line no-unused-vars
let antigo;

//Requisicao com POST publica para criar usuário
app.post('/cadastro', async (req,res) => {


    //extraindo os dados do formulário para criacao do usuario
    const {nome, sobrenome, email, password, tipoUsuario} = req.body;
    //Para facilitar já estamos considerando as validações feitas no front
    //agora vamos verificar se já existe usuário com esse e-mail
    
    //aqui ele ta abrindo o arquivo com as contas ja criadas
    const usuariosCadastrados = JSON.parse(fs.readFileSync('contas.json', { encoding: 'utf8', flag: 'r' }));
    const medicosCadastrados = JSON.parse(fs.readFileSync('medicos.json', { encoding: 'utf8', flag: 'r' }));
    const pacientesCadastrados = JSON.parse(fs.readFileSync('pacientes.json', { encoding: 'utf8', flag: 'r' }));
    
    for (let users of usuariosCadastrados){
        if(users.email === email){
            //usuario já existe. Impossivel criar outro
            //Retornando o erro 409 para indicar conflito
            return res.status(409).send(`Conta com email '${email}' já existe.`);
        }   
    }

    let novo;
    if (tipoUsuario === 'paciente') {
        novo = new User(nome, sobrenome, email, password);
        pacientesCadastrados.push(novo);
        fs.writeFileSync('pacientes.json',JSON.stringify(pacientesCadastrados,null,2));
    } 
    else if (tipoUsuario === 'medico') {
        const { IDregistro } = req.body;
        novo = new Medico(nome, sobrenome, email, password, IDregistro);
        medicosCadastrados.push(novo);
        fs.writeFileSync('medicos.json',JSON.stringify(medicosCadastrados,null,2));
    } else {
        return res.status(400).send('Tipo de usuário inválido.');
    }

    //Salva user no "banco"
    // é necessario iniciar o arquivo json com [] (uma lista vazia)
    usuariosCadastrados.push(novo);
    fs.writeFileSync('contas.json',JSON.stringify(usuariosCadastrados,null,2));
    res.send(`Conta criado com sucesso.`);
});


//Requisicao com POST para fazer o login
app.post('/login', async (req,res) => {

    //extraindo os dados do formulário para criacao do usuario
    const {email, password} = req.body;

    //Abre o bd (aqui estamos simulando com arquivo)
    const usuariosCadastrados = JSON.parse(fs.readFileSync('contas.json', { encoding: 'utf8', flag: 'r' }));

    //verifica se existe usuario com email    
    for (let user of usuariosCadastrados){
        if(user.email === email){
            //usuario existe. Agora é verificar a senha
            if(user.password === password){
                antigo = user.email;
                return res.send('Entrouu!')
            }
            return res.status(422).send(`senha incorreta.`);
        }   
    }
    //Nesse ponto não existe usuario com email informado.
    return res.status(409).send(`Usuario com email '${email}' não existe.`);

})


app.post('/alterar', (req, res) => {
    const { novoEmail, novaSenha } = req.body;
    console.log(novoEmail, novaSenha);

    res.status(200);
});


app.post('/excluir', (req, res) => {

    console.log('excluido');
});


app.post('/prontuario', (req, res) => {
    const { alergias, medicamentos, tipoSanguineo } = req.body;
    console.log( alergias, medicamentos, tipoSanguineo);
});



app.post('/agenda', (req, res) => {
  const { newData } = req.body;

  // Formate a data para incluir apenas a data e a hora
  const formattedDateTime = moment(newData.dateTime).format('YYYY-MM-DDTHH:mm:ss');

  console.log('Data formatada:', formattedDateTime);
  console.log('Texto:', newData.text);
  // Faça o que for necessário com a data formatada e o texto
});



app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});

