import { BorshSchema } from './BorshSchema';

export type Unit = Record<string, never>;

export type StructFields = Record<string, BorshSchema>;

export type EnumVariants = Record<string, BorshSchema>;
