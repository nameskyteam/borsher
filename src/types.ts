import { EnumType, StructType } from 'borsh/lib/types/types';
import { BorshSchema } from './BorshSchema';

export type Unit = Record<string, never>;

export type StructFields = Record<string, BorshSchema>;

export type EnumVariants = Record<string, BorshSchema>;

export type StructTypeFields = StructType['struct'];

export type EnumTypeVariants = EnumType['enum'];

export type BorshSchemaInternal =
  | { kind: 'u8' }
  | { kind: 'u16' }
  | { kind: 'u32' }
  | { kind: 'u64' }
  | { kind: 'u128' }
  | { kind: 'i8' }
  | { kind: 'i16' }
  | { kind: 'i32' }
  | { kind: 'i64' }
  | { kind: 'i128' }
  | { kind: 'f32' }
  | { kind: 'f64' }
  | { kind: 'bool' }
  | { kind: 'String' }
  | { kind: 'Array'; Array: { value: BorshSchema; length: number } }
  | { kind: 'Vec'; Vec: { value: BorshSchema } }
  | { kind: 'HashSet'; HashSet: { value: BorshSchema } }
  | { kind: 'HashMap'; HashMap: { key: BorshSchema; value: BorshSchema } }
  | { kind: 'Option'; Option: { value: BorshSchema } }
  | { kind: 'Struct'; Struct: { fields: StructFields } }
  | { kind: 'Enum'; Enum: { variants: EnumVariants } };
