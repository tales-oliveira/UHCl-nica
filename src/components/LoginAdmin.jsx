// eslint-disable-next-line
import { DevTool } from '@hookform/devtools';
// eslint-disable-next-line
import {set, useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// eslint-disable-next-line
import axios, * as others from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Parceiros from './Parceiros';

//as especificações da conta
const schema = yup.object({
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    password: yup.string().min(2,'Senha com no mínimo 3 caracteres').required(),
}).required();


export default function LoginAdmin(){

    const [msg, setMsg] = useState(' ');

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para rastrear o status de login

    const form = useForm({
        resolver: yupResolver(schema)
    });

// eslint-disable-next-line
    const { register, control, handleSubmit, formState } = form;

    const {errors} = formState;

    const submit = async (data) => {
        
        try {
            console.log(data);
            console.log(data.email);
            if (data.email === "admin@hotmail.com"){
                if (data.password === 123){
                    setIsLoggedIn(true); // Atualiza o estado para indicar que o usuário está autenticado
                }
            }
            else{
                setMsg('ADMIN não cadastrado.');
            }
            // await axios.post('http://localhost:3000/admin', data);
        } catch (error) {
            console.log('admin error');
        }   
        
    }

    return (
        <div className='formulario'>
            {isLoggedIn ? (
                <Parceiros />
            ) : (
                <form onSubmit={handleSubmit(submit)} noValidate>
                    <h1 className="text-greeny justify-center text-7xl mb-12 mt-56 ml-10">
                    Log in Admin
                    </h1>
                    <div className='ml-12'>
                    <p className='erro'>{errors.email?.message}</p>
                    <input type="text" id="email" placeholder="E-mail*" {...register('email')} />

                    <p className='erro'>{errors.password?.message}</p>
                    <input type="password" id="password" placeholder="Senha*" {...register('password')} />
                    </div>
                    <p className="server-response">{msg}</p>
                    <button className='botaoLog'>Entrar</button>

                    <div>
                    Conta apenas para administradores do site!
                    </div>
                    <div>
                    É médico ou paciente?
                    <Link to="/login"> Clique aqui!</Link>
                    </div>
                </form>
            )}
        </div>
    );

}