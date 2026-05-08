import { z } from 'zod'

export const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().min(10, 'Enter a valid phone number').max(20).optional().or(z.literal('')),
  city: z.string().max(100).optional().or(z.literal('')),
  occupation: z.string().max(100).optional().or(z.literal('')),
  institution: z.string().max(150).optional().or(z.literal('')),
  education_level: z.string().optional().or(z.literal('')),
  skills: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),
  availability: z.string().optional().or(z.literal('')),
  bio: z.string().max(500, 'Bio must be under 500 characters').optional().or(z.literal('')),
  social_link: z.string().url('Enter a valid URL').optional().or(z.literal('')),
})

export type ProfileInput = z.infer<typeof profileSchema>
