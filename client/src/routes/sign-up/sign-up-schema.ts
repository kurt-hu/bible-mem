import { z } from 'zod';

export const signInSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50),
    passwordConfirm: z.string().min(8).max(50),
});

export type SignInSchema = typeof signInSchema;
