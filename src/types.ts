import { EnumType, StructType } from 'borsh/lib/types/types';
import { BorshSchema } from './BorshSchema';

export type Unit = Record<string, never>;

export type StructFields = Record<string, BorshSchema>;

export type EnumVariants = Record<string, BorshSchema>;

export type StructTypeFields = StructType['struct'];

export type EnumTypeVariants = EnumType['enum'];
