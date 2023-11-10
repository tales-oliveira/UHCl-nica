// eslint-disable-next-line
import { DevTool } from '@hookform/devtools';
import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// eslint-disable-next-line
import axios, * as others from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';


//as especificações da criação da conta
const schema = yup.object({
    nome: yup.string().required('Nome obrigatório'),
    sobrenome: yup.string().required('Sobrenome obrigatório'),
    IDregistro: yup.string().required('ID do registro obrigatório'),
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    password: yup.string().min(3,'Senha com no mínimo 3 caracteres').required(),
    passwordConf: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'As senhas devem coincidir!'),
}).required();


export default function CadastroTema(){

    const [msg, setMsg] = useState();

    const form = useForm({
        resolver: yupResolver(schema)
    });
    // eslint-disable-next-line
    const { register, control, handleSubmit, formState } = form;

    //controle de erros
    const {errors} = formState;

    //Aqui é a função de quando o usuario aperta o botão 'submeter'
    const submitUsuarioComum = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/cadastro', {...data, tipoUsuario: 'paciente'});
            setMsg(response.data);
        } catch (error) {
            console.log(error)
            setMsg(error.response.data);
        } 
    }

    const submitMedico = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/cadastro', {...data, tipoUsuario: 'medico'});
            setMsg(response.data);
        } catch (error) {
            console.log(error)
            setMsg(error.response.data);
        } 
    }


    return (
        <div className="flex justify-center items-center h-400 pt-30 mt-20">
            <div className="formulario-container mx-2">
                <span className='mb-6 text-xl'>Cadastro de usuario comum</span>
                <form onSubmit={handleSubmit(submitUsuarioComum)} noValidate>
                    <p className='erro'>{errors.nome?.message}</p>
                    <input type="text" id="nome" placeholder="Primeiro nome*" {...register('nome')} />

                    <p className='erro'>{errors.sobrenome?.message}</p>
                    <input type="text" id="sobrenome" placeholder="Sobrenome*" {...register('sobrenome')} />

                    <p className='erro'>{errors.email?.message}</p>
                    <input type="text" id="email" placeholder="E-mail*" {...register('email')} />

                    <p className='erro'>{errors.password?.message}</p>
                    <input type="password" id="password" placeholder="Senha*" {...register('password')} />

                    <p className='erro'>{errors.passwordConf?.message}</p>
                    <input type="password" id="passwordConf" placeholder="Confirmar senha*" {...register('passwordConf')} />
                    <button className='botaoSub'>Submeter</button>
                </form>
                {/* A parte aqui de baixo serve para verificar se os dados estão dando certo */}
                {/* Mas vou desativar pq ja deu tudo certo */}
                {/* <DevTool control={control}/> */}
                <p>{msg}</p>

                <div>
                    Ja possui conta?
                    <Link to='/login'> Clique aqui!</Link>
                </div>
            </div>
            <div className="formulario-container mx-20">
                <span className='mb-6 text-xl'>Cadastro de médico</span>
                <form onSubmit={handleSubmit(submitMedico)} noValidate>
                    <p className='erro'>{errors.nome?.message}</p>
                    <input type="text" id="nome" placeholder="Primeiro nome*" {...register('nome')} />

                    <p className='erro'>{errors.sobrenome?.message}</p>
                    <input type="text" id="sobrenome" placeholder="Sobrenome*" {...register('sobrenome')} />

                    <p className='erro'>{errors.IDregistro?.message}</p>
                    <input type="text" id="IDregistro" placeholder="IDregistro*" {...register('IDregistro')} />

                    <p className='erro'>{errors.email?.message}</p>
                    <input type="text" id="email" placeholder="E-mail*" {...register('email')} />

                    <p className='erro'>{errors.password?.message}</p>
                    <input type="password" id="password" placeholder="Senha*" {...register('password')} />

                    <p className='erro'>{errors.passwordConf?.message}</p>
                    <input type="password" id="passwordConf" placeholder="Confirmar senha*" {...register('passwordConf')} />
                    <button className='botaoSub'>Submeter</button>
                </form>
                {/* A parte aqui de baixo serve para verificar se os dados estão dando certo */}
                {/* Mas vou desativar pq ja deu tudo certo */}
                <DevTool control={control}/>
                <p>{msg}</p>
            </div>
        </div>
    )

}