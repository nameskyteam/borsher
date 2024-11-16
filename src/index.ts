import { Buffer } from 'buffer';
import { BSE, BorshSchema, TypeOf, Unit } from './BorshSchema';
import { serialize, deserialize } from 'borsh';

function borshSerialize<S extends BSE>(schema: BorshSchema<S>, data: TypeOf<S>): Buffer {
  return Buffer.from(serialize(schema.toSchema(), data));
}

function borshDeserialize<S extends BSE>(schema: BorshSchema<S>, buffer: Uint8Array): TypeOf<S> {
  return deserialize(schema.toSchema(), buffer) as TypeOf<S>;
}

export { borshSerialize, borshDeserialize, BorshSchema, Unit };
