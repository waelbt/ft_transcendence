import { useMutation } from '@tanstack/react-query';
import { api as axios } from '../axios-utils';
import {useNavigate } from 'react-router-dom'

export interface RegisterData {
    fullName: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}


interface UserData {
    ok: boolean;
}

async function signUp(registerData: RegisterData): Promise<UserData> {
    return axios.post('/auth/signup', registerData);
}

export const useRegister = () => {
    return useMutation<UserData, Error, RegisterData>({
        mutationFn: signUp,
        onSuccess: () => {
            console.log('ok');
        }
    });
};

async function signIn(loginData: LoginData): Promise<UserData> {
    return axios.post('/auth/signIn/', loginData);
}

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation<UserData, Error, LoginData>({
        mutationFn: signIn,
        onSuccess: () => {
            navigate('Confirm');
        }
    });
};
