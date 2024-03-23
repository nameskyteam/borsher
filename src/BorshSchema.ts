import * as borsh from 'borsh';
import { StructType } from 'borsh/lib/types/types';

export type Unit = Record<string, never>;

export type StructFields = Record<string, BorshSchema>;

export type EnumVariants = Record<string, BorshSchema>;

type InternalStructFields = StructType['struct'];

type InternalEnumVariants = StructType[];

type EnumerableBorshSchema =
  | { kind: 'u8' }
  | { kind: 'u16' }
  | { kind: 'u32' }
  | { kind: 'u64' }
  | { kind: 'u128' }
  | { kind: 'i8' }
  | { kind: 'i16' }
  | { kind: 'i32' }
  | { kind: 'i64' }
  | { kind: 'i128' }
  | { kind: 'f32' }
  | { kind: 'f64' }
  | { kind: 'bool' }
  | { kind: 'String' }
  | { kind: 'Array'; Array: { value: BorshSchema; length: number } }
  | { kind: 'Vec'; Vec: { value: BorshSchema } }
  | { kind: 'HashSet'; HashSet: { value: BorshSchema } }
  | { kind: 'HashMap'; HashMap: { key: BorshSchema; value: BorshSchema } }
  | { kind: 'Option'; Option: { value: BorshSchema } }
  | { kind: 'Struct'; Struct: { fields: StructFields } }
  | { kind: 'Enum'; Enum: { variants: EnumVariants } };

export class BorshSchema {
  private readonly schema: EnumerableBorshSchema;

  private constructor(schema: EnumerableBorshSchema) {
    this.schema = schema;
  }

  static fromSchema(schema: borsh.Schema): BorshSchema {
    if (typeof schema === 'string') {
      if (schema === 'u8') {
        return BorshSchema.u8;
      }

      if (schema === 'u16') {
        return BorshSchema.u16;
      }

      if (schema === 'u32') {
        return BorshSchema.u32;
      }

      if (schema === 'u64') {
        return BorshSchema.u64;
      }

      if (schema === 'u128') {
        return BorshSchema.u128;
      }

      if (schema === 'i8') {
        return BorshSchema.i8;
      }

      if (schema === 'i16') {
        return BorshSchema.i16;
      }

      if (schema === 'i32') {
        return BorshSchema.i32;
      }

      if (schema === 'i64') {
        return BorshSchema.i64;
      }

      if (schema === 'i128') {
        return BorshSchema.i128;
      }

      if (schema === 'f32') {
        return BorshSchema.f32;
      }

      if (schema === 'f64') {
        return BorshSchema.f64;
      }

      if (schema === 'bool') {
        return BorshSchema.bool;
      }

      if (schema === 'string') {
        return BorshSchema.String;
      }
    } else {
      if ('array' in schema && typeof schema.array.len === 'number') {
        return BorshSchema.Array(BorshSchema.fromSchema(schema.array.type), schema.array.len);
      }

      if ('array' in schema && typeof schema.array.len !== 'number') {
        return BorshSchema.Vec(BorshSchema.fromSchema(schema.array.type));
      }

      if ('set' in schema) {
        return BorshSchema.HashSet(BorshSchema.fromSchema(schema.set));
      }

      if ('map' in schema) {
        return BorshSchema.HashMap(BorshSchema.fromSchema(schema.map.key), BorshSchema.fromSchema(schema.map.value));
      }

      if ('option' in schema) {
        return BorshSchema.Option(BorshSchema.fromSchema(schema.option));
      }

      if ('struct' in schema) {
        return BorshSchema.Struct(fromInternalStructFields(schema.struct));
      }

      if ('enum' in schema) {
        return BorshSchema.Enum(fromInternalEnumVariants(schema.enum));
      }
    }

    throw Error(`Unreachable`);
  }

  toSchema(): borsh.Schema {
    switch (this.schema.kind) {
      case 'u8':
        return 'u8';
      case 'u16':
        return 'u16';
      case 'u32':
        return 'u32';
      case 'u64':
        return 'u64';
      case 'u128':
        return 'u128';
      case 'i8':
        return 'i8';
      case 'i16':
        return 'i16';
      case 'i32':
        return 'i32';
      case 'i64':
        return 'i64';
      case 'i128':
        return 'i128';
      case 'f32':
        return 'f32';
      case 'f64':
        return 'f64';
      case 'bool':
        return 'bool';
      case 'String':
        return 'string';
      case 'Option':
        return {
          option: this.schema.Option.value.toSchema(),
        };
      case 'Array':
        return {
          array: {
            type: this.schema.Array.value.toSchema(),
            len: this.schema.Array.length,
          },
        };
      case 'Vec':
        return {
          array: {
            type: this.schema.Vec.value.toSchema(),
          },
        };
      case 'HashSet':
        return {
          set: this.schema.HashSet.value.toSchema(),
        };
      case 'HashMap':
        return {
          map: {
            key: this.schema.HashMap.key.toSchema(),
            value: this.schema.HashMap.value.toSchema(),
          },
        };
      case 'Struct':
        return {
          struct: toInternalStructFields(this.schema.Struct.fields),
        };
      case 'Enum':
        return {
          enum: toInternalEnumVariants(this.schema.Enum.variants),
        };
    }
  }

  /**
   * Schema for u8.
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.u8, n);
   */
  static get u8(): BorshSchema {
    return new BorshSchema({ kind: 'u8' });
  }

  /**
   * Schema for u16.
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.u16, n);
   */
  static get u16(): BorshSchema {
    return new BorshSchema({ kind: 'u16' });
  }

  /**
   * Schema for u32.
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.u32, n);
   */
  static get u32(): BorshSchema {
    return new BorshSchema({ kind: 'u32' });
  }

  /**
   * Schema for u64.
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.u64, n);
   */
  static get u64(): BorshSchema {
    return new BorshSchema({ kind: 'u64' });
  }

  /**
   * Schema for u128.
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.u128, n);
   */
  static get u128(): BorshSchema {
    return new BorshSchema({ kind: 'u128' });
  }

  /**
   * Schema for i8.
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.i8, n);
   */
  static get i8(): BorshSchema {
    return new BorshSchema({ kind: 'i8' });
  }

  /**
   * Schema for i16.
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.i16, n);
   */
  static get i16(): BorshSchema {
    return new BorshSchema({ kind: 'i16' });
  }

  /**
   * Schema for i32.
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.i32, n);
   */
  static get i32(): BorshSchema {
    return new BorshSchema({ kind: 'i32' });
  }

  /**
   * Schema for i64.
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.i64, n);
   */
  static get i64(): BorshSchema {
    return new BorshSchema({ kind: 'i64' });
  }

  /**
   * Schema for i128.
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.i128, n);
   */
  static get i128(): BorshSchema {
    return new BorshSchema({ kind: 'i128' });
  }

  /**
   * Schema for f32.
   * @example
   * const n: number = 1.0;
   * const buffer = borshSerialize(BorshSchema.f32, n);
   */
  static get f32(): BorshSchema {
    return new BorshSchema({ kind: 'f32' });
  }

  /**
   * Schema for f64.
   * @example
   * const n: number = 1.0;
   * const buffer = borshSerialize(BorshSchema.f64, n);
   */
  static get f64(): BorshSchema {
    return new BorshSchema({ kind: 'f64' });
  }

  /**
   * Schema for bool.
   * @example
   * const b: boolean = true;
   * const buffer = borshSerialize(BorshSchema.bool, b);
   */
  static get bool(): BorshSchema {
    return new BorshSchema({ kind: 'bool' });
  }

  /**
   * Schema for String.
   * @example
   * const message: string = 'hello world';
   * const buffer = borshSerialize(BorshSchema.String, message);
   */
  static get String(): BorshSchema {
    return new BorshSchema({ kind: 'String' });
  }

  /**
   * Schema for Array.
   * @example
   * const schema = BorshSchema.Array(BorshSchema.String, 2);
   * const messages: string[] = ['hello', 'world'];
   * const buffer = borshSerialize(schema, messages);
   * @param value Value
   * @param length Length
   */
  static Array(value: BorshSchema, length: number): BorshSchema {
    return new BorshSchema({ kind: 'Array', Array: { value, length } });
  }

  /**
   * Schema for Vec.
   * @example
   * const schema = BorshSchema.Vec(BorshSchema.String);
   * const messages: string[] = ['hello', 'world'];
   * const buffer = borshSerialize(schema, messages);
   * @param value Value
   */
  static Vec(value: BorshSchema): BorshSchema {
    return new BorshSchema({ kind: 'Vec', Vec: { value } });
  }

  /**
   * Schema for HashSet.
   * @example
   * const schema = BorshSchema.HashSet(BorshSchema.String);
   * const messages: Set<string> = new Set(['hello', 'world']);
   * const buffer = borshSerialize(schema, messages);
   * @param value Value
   */
  static HashSet(value: BorshSchema): BorshSchema {
    return new BorshSchema({ kind: 'HashSet', HashSet: { value } });
  }

  /**
   * Schema for HashMap.
   * @example
   * const schema = BorshSchema.HashMap(BorshSchema.String, BorshSchema.u128);
   * const balances: Map<string, bigint> = new Map([
   *   ['alice', 1_000_000_000_000_000_000_000_000n],
   *   ['bob', 2_000_000_000_000_000_000_000_000n],
   * ]);
   * const buffer = borshSerialize(schema, balances);
   * @param key Key
   * @param value Value
   */
  static HashMap(key: BorshSchema, value: BorshSchema): BorshSchema {
    return new BorshSchema({ kind: 'HashMap', HashMap: { key, value } });
  }

  /**
   * Schema for Option.
   * @example
   * const schema = BorshSchema.Option(BorshSchema.String);
   *
   * const some: string | null = 'hello world';
   * const someBuffer = borshSerialize(schema, some);
   *
   * const none: string | null = null;
   * const noneBuffer = borshSerialize(schema, none);
   * @param value Value
   */
  static Option(value: BorshSchema): BorshSchema {
    return new BorshSchema({ kind: 'Option', Option: { value } });
  }

  /**
   * Schema for Unit.
   * @example
   * const unit: Unit = {};
   * const buffer = borshSerialize(BorshSchema.Unit, unit);
   */
  static get Unit(): BorshSchema {
    return BorshSchema.Struct({});
  }

  /**
   * Schema for Struct.
   * @example
   * type Person = {
   *   name: string;
   *   age: number;
   * };
   *
   * const schema = BorshSchema.Struct({
   *   name: BorshSchema.String,
   *   age: BorshSchema.u8,
   * });
   *
   * const person: Person = {
   *   name: 'alice',
   *   age: 18,
   * };
   *
   * const buffer = borshSerialize(schema, person);
   * @param fields Struct fields
   */
  static Struct(fields: StructFields): BorshSchema {
    return new BorshSchema({ kind: 'Struct', Struct: { fields } });
  }

  /**
   * Schema for Enum.
   * @example
   * type Status =
   *   | {
   *       Pending: Unit;
   *     }
   *   | {
   *       Fulfilled: Unit;
   *     }
   *   | {
   *       Rejected: Unit;
   *     };
   *
   * const schema = BorshSchema.Enum({
   *   Pending: BorshSchema.Unit,
   *   Fulfilled: BorshSchema.Unit,
   *   Rejected: BorshSchema.Unit,
   * });
   *
   * const status: Status = {
   *   Pending: {},
   * };
   *
   * const buffer = borshSerialize(schema, status);
   *
   * @example
   * type Shape =
   *   | {
   *       Square: number;
   *     }
   *   | {
   *       Rectangle: {
   *         length: number;
   *         width: number;
   *       };
   *     }
   *   | {
   *       Circle: {
   *         radius: number;
   *       };
   *     };
   *
   * const schema = BorshSchema.Enum({
   *   Square: BorshSchema.u32,
   *   Rectangle: BorshSchema.Struct({
   *     length: BorshSchema.u32,
   *     width: BorshSchema.u32,
   *   }),
   *   Circle: BorshSchema.Struct({
   *     radius: BorshSchema.u32,
   *   }),
   * });
   *
   * const shape: Shape = {
   *   Square: 5,
   * };
   *
   * const buffer = borshSerialize(schema, shape);
   * @param variants Enum variants
   */
  static Enum(variants: EnumVariants): BorshSchema {
    return new BorshSchema({ kind: 'Enum', Enum: { variants } });
  }
}

function fromInternalStructFields(fields: InternalStructFields): StructFields {
  const entries: [string, BorshSchema][] = Object.entries(fields).map(([key, value]) => [
    key,
    BorshSchema.fromSchema(value),
  ]);
  return Object.fromEntries(entries);
}

function fromInternalEnumVariants(variants: InternalEnumVariants): EnumVariants {
  const entries: [string, BorshSchema][] = variants.map(({ struct }) => {
    const key = Object.keys(struct)[0];
    return [key, BorshSchema.fromSchema(struct[key])];
  });
  return Object.fromEntries(entries);
}

function toInternalStructFields(fields: StructFields): InternalStructFields {
  const entries: [string, borsh.Schema][] = Object.entries(fields).map(([key, value]) => [key, value.toSchema()]);
  return Object.fromEntries(entries);
}

function toInternalEnumVariants(variants: EnumVariants): InternalEnumVariants {
  return Object.entries(variants).map(([key, value]) => ({ struct: { [key]: value.toSchema() } }));
}
