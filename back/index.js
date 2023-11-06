const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

const User = require('./models/User.js');

app.use(express.json());
app.use(cors());


//Requisicao com POST publica para criar usuário
app.post('/cadastro', async (req,res) => {


    //extraindo os dados do formulário para criacao do usuario
    const {nome, sobrenome, email, password} = req.body;
    //Para facilitar já estamos considerando as validações feitas no front
    //agora vamos verificar se já existe usuário com esse e-mail
    
    //aqui ele ta abrindo o arquivo com as contas ja criadas
    const usuariosCadastrados = JSON.parse(fs.readFileSync('contas.json', { encoding: 'utf8', flag: 'r' }));
    
    for (let users of usuariosCadastrados){
        if(users.email === email){
            //usuario já existe. Impossivel criar outro
            //Retornando o erro 409 para indicar conflito
            return res.status(409).send(`Conta com email '${email}' já existe.`);
        }   
    }

    //Criacao do user
    const user = new User(nome, sobrenome, email, password);

    //Salva user no "banco"
    // é necessario iniciar o arquivo json com [] (uma lista vazia)
    usuariosCadastrados.push(user);
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
                return res.send('Entrouu!')
            }
            return res.status(422).send(`senha incorreta.`);
        }   
    }
    //Nesse ponto não existe usuario com email informado.
    return res.status(409).send(`Usuario com email '${email}' não existe.`);

})


app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});

