import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email(),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type SignupSchema = z.infer<typeof signupSchema>;
