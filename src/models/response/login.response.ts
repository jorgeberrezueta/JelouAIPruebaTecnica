import { User } from "@prisma/client";


export type LoginResponse = {
    token: string;
    user: User,
}