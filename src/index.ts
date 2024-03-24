import { Buffer } from 'buffer';
import { BorshSchema } from './BorshSchema';
import { EnumVariants, StructFields, Unit } from './types';
import { serialize, deserialize } from 'borsh';

function borshSerialize<T>(schema: BorshSchema, data: T): Buffer {
  return Buffer.from(serialize(schema.toSchema(), data));
}

function borshDeserialize<T>(schema: BorshSchema, buffer: Uint8Array): T {
  return deserialize(schema.toSchema(), buffer) as T;
}

export { borshSerialize, borshDeserialize, BorshSchema, EnumVariants, StructFields, Unit };
