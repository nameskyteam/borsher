import { EnumType, StructType } from 'borsh/lib/types/types';
import { BorshSchema } from './BorshSchema';

export type Unit = Record<string, never>;

export type StructFields = Record<string, BorshSchema>;

export type EnumVariants = Record<string, BorshSchema>;

export type StructTypeFields = StructType['struct'];

export type EnumTypeVariants = EnumType['enum'];

export type BorshSchemaInternal =
  | U8Internal
  | U16Internal
  | U32Internal
  | U64Internal
  | U128Internal
  | I8Internal
  | I16Internal
  | I32Internal
  | I64Internal
  | I128Internal
  | F32Internal
  | F64Internal
  | BoolInternal
  | StringInternal
  | OptionInternal
  | ArrayInternal
  | VecInternal
  | HashSetInternal
  | HashMapInternal
  | StructInternal
  | EnumInternal;

type U8Internal = { kind: 'u8' };
type U16Internal = { kind: 'u16' };
type U32Internal = { kind: 'u32' };
type U64Internal = { kind: 'u64' };
type U128Internal = { kind: 'u128' };
type I8Internal = { kind: 'i8' };
type I16Internal = { kind: 'i16' };
type I32Internal = { kind: 'i32' };
type I64Internal = { kind: 'i64' };
type I128Internal = { kind: 'i128' };
type F32Internal = { kind: 'f32' };
type F64Internal = { kind: 'f64' };
type BoolInternal = { kind: 'bool' };
type StringInternal = { kind: 'String' };
type OptionInternal = { kind: 'Option'; Option: { value: BorshSchema } };
type ArrayInternal = { kind: 'Array'; Array: { value: BorshSchema; length: number } };
type VecInternal = { kind: 'Vec'; Vec: { value: BorshSchema } };
type HashSetInternal = { kind: 'HashSet'; HashSet: { value: BorshSchema } };
type HashMapInternal = { kind: 'HashMap'; HashMap: { key: BorshSchema; value: BorshSchema } };
type StructInternal = { kind: 'Struct'; Struct: { fields: StructFields } };
type EnumInternal = { kind: 'Enum'; Enum: { variants: EnumVariants } };
