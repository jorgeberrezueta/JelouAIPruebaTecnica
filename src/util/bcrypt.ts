import bcrypt from 'bcrypt';

const saltRounds = 12;

export const encryptPassword = async (password: string) => {
    return bcrypt.hash(password, saltRounds);
}

export const comparePassword = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
}