import { z } from 'zod';

export const profileSchema = z.object({
	display_name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email(),
});
