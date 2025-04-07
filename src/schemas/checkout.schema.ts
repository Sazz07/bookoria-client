import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[0-9+\-\s()]{7,20}$/, 'Please enter a valid phone number'),
});
