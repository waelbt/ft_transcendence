import * as bcrypt from 'bcrypt'

export function hashPassword(plainTextPassword: string) {

    const SALT  = bcrypt.genSaltSync();
    return (bcrypt.hashSync(plainTextPassword, SALT));
}

export function verifyPassowrd(plainTextPassword: string, hashedPassword: string) {

    return (bcrypt.compareSync(plainTextPassword, hashedPassword));
}
