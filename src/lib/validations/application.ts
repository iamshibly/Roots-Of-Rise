import { z } from 'zod'

export const applicationSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(10, 'Enter a valid phone number').max(20),
  city: z.string().min(2, 'City is required').max(100),
  age: z.coerce.number().min(13, 'Must be at least 13').max(120).optional(),
  gender: z.string().optional().or(z.literal('')),
  occupation: z.string().max(100).optional().or(z.literal('')),
  institution: z.string().max(150).optional().or(z.literal('')),
  education_level: z.string().optional().or(z.literal('')),
  skills: z.array(z.string()).default([]),
  interests: z.array(z.string()).min(1, 'Select at least one area of interest'),
  availability: z.string().min(1, 'Availability is required'),
  motivation: z
    .string()
    .min(50, 'Please write at least 50 characters about your motivation')
    .max(1000),
  experience: z.string().max(1000).optional().or(z.literal('')),
  preferred_program: z.string().optional().or(z.literal('')),
  social_link: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  agree_to_terms: z
    .boolean()
    .refine((v) => v === true, { message: 'You must agree to the terms' }),
})

export type ApplicationInput = z.infer<typeof applicationSchema>
