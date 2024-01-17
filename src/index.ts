import { Buffer } from 'buffer';
import { BorshSchema, PhantomData, EnumVariants, StructFields } from './BorshSchema';
import * as borsh from 'borsh';

function borshSerialize<T>(schema: BorshSchema, data: T): Buffer {
  return Buffer.from(borsh.serialize(schema.into(), data));
}

function borshDeserialize<T>(schema: BorshSchema, buffer: Uint8Array): T {
  return borsh.deserialize(schema.into(), buffer) as T;
}

export { borshSerialize, borshDeserialize, BorshSchema, PhantomData, EnumVariants, StructFields };
