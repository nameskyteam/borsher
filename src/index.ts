import { Buffer } from 'buffer';
import { BorshSchema } from './schema';

export function borshSerialize<T>(schema: BorshSchema, value: T): Buffer {
  return BorshSchema.serialize(schema, value);
}

export function borshDeserialize<T>(
  schema: BorshSchema,
  buffer: Uint8Array,
): T {
  return BorshSchema.deserialize(schema, buffer);
}

export { BorshSchema, EnumVariants, StructFields, Unit } from './schema';
