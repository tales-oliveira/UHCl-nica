/* eslint-disable no-unused-vars */
// eslint-disable-next-line
import { DevTool } from '@hookform/devtools';
import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// eslint-disable-next-line
import axios, * as others from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

//as especificações da criação do paciente
const schemaPaciente = yup.object({
    nome: yup.string().required('Nome obrigatório'),
    sobrenome: yup.string().required('Sobrenome obrigatório'),
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    password: yup.string().min(3,'Senha com no mínimo 3 caracteres').required(),
    passwordConf: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'As senhas devem coincidir!'),
}).required();


//as especificações da criação do médico
const schemaMedico = yup.object({
    nome: yup.string().required('Nome obrigatório'),
    sobrenome: yup.string().required('Sobrenome obrigatório'),
    IDregistro: yup.string().required('ID do registro obrigatório'),
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    password: yup.string().min(3,'Senha com no mínimo 3 caracteres').required(),
    passwordConf: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'As senhas devem coincidir!'),
}).required();


export default function CadastroTema(){
    const [msg, setMsg] = useState();

    // Verificação dos Pacientes  
    const formPaciente = useForm({
        resolver: yupResolver(schemaPaciente)
    });
    const { register: registerPaciente, control: controlPaciente, handleSubmit: handleSubmitPaciente, formState: formStatePaciente } = formPaciente;
    const { errors: errorsPaciente } = formStatePaciente;

    // Verificação dos Médicos
    const formMedico = useForm({
        resolver: yupResolver(schemaMedico),
    });
    const { register: registerMedico, control: controlMedico, handleSubmit: handleSubmitMedico, formState: formStateMedico } = formMedico;
    const { errors: errorsMedico } = formStateMedico;

    // ------------------------------------------------------------------------------------------------------------
    // Aqui é a função de quando o usuario aperta o botão 'submeter'
    const submitUsuarioComum = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/cadastro', {...data, tipoUsuario: 'paciente'});
            setMsg(response.data);
        } catch (error) {
            console.log(error);
            setMsg(error.response.data);
        } 
    }

    const submitMedico = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/cadastro', {...data, tipoUsuario: 'medico'});
            setMsg(response.data);
        } catch (error) {
            console.log(error);
            setMsg(error.response.data);
        } 
    }
    // ------------------------------------------------------------------------------------------------------------

    return (
        <div className="flex justify-center items-center h-400 pt-30 mt-20">
            <div className="formulario-container mx-2">
                <span className='mb-6 text-xl'>Cadastro de paciente</span>
                <form onSubmit={handleSubmitPaciente(submitUsuarioComum)} noValidate>
                    <p className='erro'>{errorsPaciente.nome?.message}</p>
                    <input type="text" id="nome" placeholder="Primeiro nome*" {...registerPaciente('nome')} />

                    <p className='erro'>{errorsPaciente.sobrenome?.message}</p>
                    <input type="text" id="sobrenome" placeholder="Sobrenome*" {...registerPaciente('sobrenome')} />

                    <p className='erro'>{errorsPaciente.email?.message}</p>
                    <input type="text" id="email" placeholder="E-mail*" {...registerPaciente('email')} />

                    <p className='erro'>{errorsPaciente.password?.message}</p>
                    <input type="password" id="password" placeholder="Senha*" {...registerPaciente('password')} />

                    <p className='erro'>{errorsPaciente.passwordConf?.message}</p>
                    <input type="password" id="passwordConf" placeholder="Confirmar senha*" {...registerPaciente('passwordConf')} />
                    <button className='botaoSub'>Submeter</button>
                </form>
                {/* A parte aqui de baixo serve para verificar se os dados estão dando certo */}
                {/* Mas vou desativar pq ja deu tudo certo */}
                {/* <DevTool controlPaciente={controlPaciente}/> */}
                <p>{msg}</p>

                <div>
                    Ja possui conta?
                    <Link to='/login'> Clique aqui!</Link>
                </div>
            </div>

            <div className="formulario-container mx-20">
                <span className='mb-6 text-xl'>Cadastro de médico</span>
                <form onSubmit={handleSubmitMedico(submitMedico)} noValidate>
                    <p className='erro'>{errorsMedico.nome?.message}</p>
                    <input type="text" id="nome" placeholder="Primeiro nome*" {...registerMedico('nome')} />

                    <p className='erro'>{errorsMedico.sobrenome?.message}</p>
                    <input type="text" id="sobrenome" placeholder="Sobrenome*" {...registerMedico('sobrenome')} />

                    <p className='erro'>{errorsMedico.IDregistro?.message}</p>
                    <input type="text" id="IDregistro" placeholder="IDregistro*" {...registerMedico('IDregistro')} />

                    <p className='erro'>{errorsMedico.email?.message}</p>
                    <input type="text" id="email" placeholder="E-mail*" {...registerMedico('email')} />

                    <p className='erro'>{errorsMedico.password?.message}</p>
                    <input type="password" id="password" placeholder="Senha*" {...registerMedico('password')} />

                    <p className='erro'>{errorsMedico.passwordConf?.message}</p>
                    <input type="password" id="passwordConf" placeholder="Confirmar senha*" {...registerMedico('passwordConf')} />
                    <button className='botaoSub'>Submeter</button>
                </form>
                {/* A parte aqui de baixo serve para verificar se os dados estão dando certo */}
                {/* Mas vou desativar pq ja deu tudo certo */}
                {/* <DevTool controlMedico={controlMedico}/> */}
                <p>{msg}</p>
            </div>
        </div>
    )

}