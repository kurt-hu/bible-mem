import { z } from 'zod';

export const signInSchema = z
    .object({
        username: z.string().min(2).max(50),
        email: z.string().email(),
        password: z.string().min(8).max(50),
        passwordConfirm: z.string().min(8).max(50),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Passwords must match',
        path: ['passwordConfirm'], // This will specify where the error should be placed
    });

export type SignInSchema = typeof signInSchema;
