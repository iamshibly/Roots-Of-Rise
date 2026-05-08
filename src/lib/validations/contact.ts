import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Enter a valid email address'),
  subject: z.string().min(3, 'Subject is required').max(200),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000),
})

export type ContactInput = z.infer<typeof contactSchema>

export const newsletterSchema = z.object({
  email: z.string().email('Enter a valid email address'),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>
