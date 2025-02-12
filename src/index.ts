import { Buffer } from 'buffer';
import { BorshSchema } from './schema';

export function borshSerialize<T>(schema: BorshSchema<T>, value: T): Buffer {
  return BorshSchema.serialize(schema, value);
}

export function borshDeserialize<T>(
  schema: BorshSchema<T>,
  buffer: Uint8Array,
): T {
  return BorshSchema.deserialize(schema, buffer);
}

export {
  BorshSchema,
  StructFields,
  EnumVariants,
  Unit,
  Typeof,
  TypeofStruct,
  TypeofEnum,
} from './schema';
