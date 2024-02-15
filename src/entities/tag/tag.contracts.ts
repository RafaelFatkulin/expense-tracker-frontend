import { z } from 'zod';

export const TagSchema = z.object({
  id: z.number(),
  title: z.string(),
  color: z.string(),
  userId: z.number()
});

export const CreateTagDtoSchema = z.object({
  title: z.string().min(4).max(255),
  color: z.string().refine((value) => /^#?[0-9a-fA-F]{3,6}$/.test(value)),
  userId: z.number()
});

export const UpdateTagDtoSchema = z.object({
  title: z.string().min(4).max(255),
  color: z.string().refine((value) => /^#?[0-9a-fA-F]{3,6}$/.test(value))
});
