import { librarySchema } from './schema';
import type { z } from 'zod';

export type Library = z.infer<typeof librarySchema>;
