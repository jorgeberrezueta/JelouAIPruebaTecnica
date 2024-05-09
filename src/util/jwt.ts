import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "DEV";

export const verifyJWTSecret = () => {
    console.log("Production environment:", process.env.NODE_ENV === 'production');
    if (!process.env.JWT_SECRET) {
        if (process.env.NODE_ENV === 'production') {
            console.error('JWT_SECRET environment variable is not set for production environment. Exiting.');
            process.exit(1);
        }
        console.warn(`JWT_SECRET is not set. Running with development token "${JWT_SECRET}".`);
    }
}

export const sign = (payload: any) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '30d'
    });
}

export const verify = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
}