import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required ' })
    .min(1, 'First name is required'),
  middleName: z
    .string({ required_error: 'Middle name is required ' })
    .optional(),
  lastName: z
    .string({ required_error: 'Last name is required ' })
    .min(1, 'Last name is required'),
});
