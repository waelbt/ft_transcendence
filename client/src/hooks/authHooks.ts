import { useMutation} from '@tanstack/react-query';
import { api as axios } from '../axios-utils';

export interface RegisterData {
    email: string;
    fullName: string;
    password: string;
}

interface UserData {
    ok: boolean;
}

async function signin(registerData: RegisterData): Promise<UserData> {
    console.dir(registerData);
    return axios.post('/auth/signup', registerData);
}

export const useRegister = () => {
    return useMutation<UserData, Error, RegisterData>({
        mutationFn: signin,
    });
};

// import FormComponent from '../../components/FormComponent';
// import { type FieldValues } from 'react-hook-form';
// type RegisterFormProps = {
//     onFormSwitch: (formName: string) => void;
// };
// const onSubmit = async (data: FieldValues) => {
//     const { confirmPassword, ...newData } = data;
//     try {
//         const response = await axios.post('/auth/signup', newData);
//         console.log(response.status);
//     } catch (error) {
//         console.error(error);
//     }
// };
