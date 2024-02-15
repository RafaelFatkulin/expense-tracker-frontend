import type { z } from 'zod';
import type { CreateTagDtoSchema, TagSchema, UpdateTagDtoSchema } from './tag.contracts';

export type Tag = z.infer<typeof TagSchema>;
export type CreateTagDto = z.infer<typeof CreateTagDtoSchema>;
export type UpdateTagDto = z.infer<typeof UpdateTagDtoSchema>;
