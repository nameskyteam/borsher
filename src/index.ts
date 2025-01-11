import { Buffer } from 'buffer';
import { BorshSchema, EnumVariants, StructFields, Unit } from './BorshSchema';
import { serialize, deserialize } from 'borsh';

function borshSerialize<T>(schema: BorshSchema, data: T): Buffer {
  return Buffer.from(serialize(schema.toSchema(), data));
}

function borshDeserialize<T>(schema: BorshSchema, buffer: Uint8Array): T {
  return deserialize(schema.toSchema(), buffer) as T;
}

export {
  borshSerialize,
  borshDeserialize,
  BorshSchema,
  EnumVariants,
  StructFields,
  Unit,
};
