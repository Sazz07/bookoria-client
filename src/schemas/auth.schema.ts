import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string({ required_error: 'First name is required ' }),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: 'Last name is required' }),
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
});
