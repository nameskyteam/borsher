import { Buffer } from 'buffer';
import { BorshSchema, EnumVariants, StructFields, Unit } from './BorshSchema';
import * as borsh from 'borsh';

function borshSerialize<T>(schema: BorshSchema, data: T): Buffer {
  return Buffer.from(borsh.serialize(schema.toSchema(), data));
}

function borshDeserialize<T>(schema: BorshSchema, buffer: Uint8Array): T {
  return borsh.deserialize(schema.toSchema(), buffer) as T;
}

export { borshSerialize, borshDeserialize, BorshSchema, EnumVariants, StructFields, Unit };
