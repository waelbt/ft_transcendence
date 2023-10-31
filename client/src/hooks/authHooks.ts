import { useMutation } from '@tanstack/react-query';
import { api as axios } from '../axios-utils';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
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

// export const useAddSuperHeroData = () => {
//     const queryClient = useQueryClient()

//     return useMutation(addSuperHero, {
//       // onSuccess: data => {
//       //   /** Query Invalidation Start */
//       //   // queryClient.invalidateQueries('super-heroes')
//       //   /** Query Invalidation End */

//       //   /** Handling Mutation Response Start */
//       // queryClient.setQueryData('super-heroes', oldQueryData => {
//       //   return {
//       //     ...oldQueryData,
//       //     data: [...oldQueryData.data, data.data]
//       //   }
//       // })
//       //   /** Handling Mutation Response Start */
//       // },
//       /**Optimistic Update Start */
//       onMutate: async newHero => {
//         await queryClient.cancelQueries('super-heroes')
//         const previousHeroData = queryClient.getQueryData('super-heroes')
//         queryClient.setQueryData('super-heroes', oldQueryData => {
//           return {
//             ...oldQueryData,
//             data: [
//               ...oldQueryData.data,
//               { id: oldQueryData?.data?.length + 1, ...newHero }
//             ]
//           }
//         })
//         return { previousHeroData }
//       },
//       onError: (_err, _newTodo, context) => {
//         queryClient.setQueryData('super-heroes', context.previousHeroData)
//       },
//       onSettled: () => {
//         queryClient.invalidateQueries('super-heroes')
//       }
//       /**Optimistic Update End */
//     })

export const useRegister = () => {
    
    return useMutation<UserData, Error, RegisterData>({
        mutationFn: signUp,
        onSuccess: () => {
            toast.success(`Account registered successfully!`);
        },
        onError: (error) => {
            toast.error(error.message);
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
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
};
