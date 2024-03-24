import { EnumTypeVariants, EnumVariants, StructFields, StructTypeFields } from './types';
import { Schema } from 'borsh';
import { BorshSchema } from './BorshSchema';

export function convertStructTypeFieldsToStructFields(fields: StructTypeFields): StructFields {
  const entries: [string, BorshSchema][] = Object.entries(fields).map(([key, value]) => [
    key,
    BorshSchema.fromSchema(value),
  ]);
  return Object.fromEntries(entries);
}

export function convertStructFieldsToStructTypeFields(fields: StructFields): StructTypeFields {
  const entries: [string, Schema][] = Object.entries(fields).map(([key, value]) => [key, value.toSchema()]);
  return Object.fromEntries(entries);
}

export function convertEnumTypeVariantsToEnumVariants(variants: EnumTypeVariants): EnumVariants {
  const entries: [string, BorshSchema][] = variants.map(({ struct }) => {
    const key = Object.keys(struct)[0];
    return [key, BorshSchema.fromSchema(struct[key])];
  });
  return Object.fromEntries(entries);
}

export function convertEnumVariantsToEnumTypeVariants(variants: EnumVariants): EnumTypeVariants {
  return Object.entries(variants).map(([key, value]) => ({ struct: { [key]: value.toSchema() } }));
}
