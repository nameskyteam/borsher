import { Buffer } from 'buffer';
import { BorshSchema } from './schema';

export function borshSerialize<T>(schema: BorshSchema<T>, value: T): Buffer {
  return schema.serialize(value);
}

export function borshDeserialize<T>(
  schema: BorshSchema<T>,
  buffer: Uint8Array,
): T {
  return schema.deserialize(buffer);
}

export { BorshSchema, Infer, Unit } from './schema';
