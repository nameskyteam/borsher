import { Schema } from 'borsh';
import { EnumType, StructType } from 'borsh/lib/types/types';

export class BorshSchema {
  private readonly schema: Schema;

  private constructor(schema: Schema) {
    this.schema = schema;
  }

  static fromSchema(schema: Schema): BorshSchema {
    return new BorshSchema(schema);
  }

  toSchema(): Schema {
    return this.schema;
  }

  /**
   * Schema for u8
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.u8, n);
   */
  static get u8(): BorshSchema {
    return BorshSchema.fromSchema('u8');
  }

  /**
   * Schema for u16
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.u16, n);
   */
  static get u16(): BorshSchema {
    return BorshSchema.fromSchema('u16');
  }

  /**
   * Schema for u32
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.u32, n);
   */
  static get u32(): BorshSchema {
    return BorshSchema.fromSchema('u32');
  }

  /**
   * Schema for u64
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.u64, n);
   */
  static get u64(): BorshSchema {
    return BorshSchema.fromSchema('u64');
  }

  /**
   * Schema for u128
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.u128, n);
   */
  static get u128(): BorshSchema {
    return BorshSchema.fromSchema('u128');
  }

  /**
   * Schema for i8
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.i8, n);
   */
  static get i8(): BorshSchema {
    return BorshSchema.fromSchema('i8');
  }

  /**
   * Schema for i16
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.i16, n);
   */
  static get i16(): BorshSchema {
    return BorshSchema.fromSchema('i16');
  }

  /**
   * Schema for i32
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.i32, n);
   */
  static get i32(): BorshSchema {
    return BorshSchema.fromSchema('i32');
  }

  /**
   * Schema for i64
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.i64, n);
   */
  static get i64(): BorshSchema {
    return BorshSchema.fromSchema('i64');
  }

  /**
   * Schema for i128
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.i128, n);
   */
  static get i128(): BorshSchema {
    return BorshSchema.fromSchema('i128');
  }

  /**
   * Schema for f32
   * @example
   * const n: number = 1.0;
   * const buffer = borshSerialize(BorshSchema.f32, n);
   */
  static get f32(): BorshSchema {
    return BorshSchema.fromSchema('f32');
  }

  /**
   * Schema for f64
   * @example
   * const n: number = 1.0;
   * const buffer = borshSerialize(BorshSchema.f64, n);
   */
  static get f64(): BorshSchema {
    return BorshSchema.fromSchema('f64');
  }

  /**
   * Schema for bool
   * @example
   * const b: boolean = true;
   * const buffer = borshSerialize(BorshSchema.bool, b);
   */
  static get bool(): BorshSchema {
    return BorshSchema.fromSchema('bool');
  }

  /**
   * Schema for String
   * @example
   * const message: string = 'hello world';
   * const buffer = borshSerialize(BorshSchema.String, message);
   */
  static get String(): BorshSchema {
    return BorshSchema.fromSchema('string');
  }

  /**
   * Schema for Option
   * @example
   * const schema = BorshSchema.Option(BorshSchema.String);
   *
   * const some: string | null = 'hello world';
   * const someBuffer = borshSerialize(schema, some);
   *
   * const none: string | null = null;
   * const noneBuffer = borshSerialize(schema, none);
   */
  static Option(value: BorshSchema): BorshSchema {
    return BorshSchema.fromSchema({ option: value.toSchema() });
  }

  /**
   * Schema for Array
   * @example
   * const schema = BorshSchema.Array(BorshSchema.String, 2);
   * const messages: string[] = ['hello', 'world'];
   * const buffer = borshSerialize(schema, messages);
   */
  static Array(value: BorshSchema, length: number): BorshSchema {
    return BorshSchema.fromSchema({ array: { type: value.toSchema(), len: length } });
  }

  /**
   * Schema for Vec
   * @example
   * const schema = BorshSchema.Vec(BorshSchema.String);
   * const messages: string[] = ['hello', 'world'];
   * const buffer = borshSerialize(schema, messages);
   */
  static Vec(value: BorshSchema): BorshSchema {
    return BorshSchema.fromSchema({ array: { type: value.toSchema() } });
  }

  /**
   * Schema for HashSet
   * @example
   * const schema = BorshSchema.HashSet(BorshSchema.String);
   * const messages: Set<string> = new Set(['hello', 'world']);
   * const buffer = borshSerialize(schema, messages);
   */
  static HashSet(value: BorshSchema): BorshSchema {
    return BorshSchema.fromSchema({ set: value.toSchema() });
  }

  /**
   * Schema for HashMap
   * @example
   * const schema = BorshSchema.HashMap(BorshSchema.String, BorshSchema.u128);
   * const balances: Map<string, bigint> = new Map([
   *   ['alice', 1_000_000_000_000_000_000_000_000n],
   *   ['bob', 2_000_000_000_000_000_000_000_000n],
   * ]);
   * const buffer = borshSerialize(schema, balances);
   */
  static HashMap(key: BorshSchema, value: BorshSchema): BorshSchema {
    return BorshSchema.fromSchema({ map: { key: key.toSchema(), value: value.toSchema() } });
  }

  /**
   * Schema for Unit
   * @example
   * const unit: Unit = {};
   * const buffer = borshSerialize(BorshSchema.Unit, unit);
   */
  static get Unit(): BorshSchema {
    return BorshSchema.Struct({});
  }

  /**
   * Schema for Struct
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
   */
  static Struct(fields: StructFields): BorshSchema {
    return BorshSchema.fromSchema({ struct: parseStructTypeStruct(fields) });
  }

  /**
   * Schema for Enum
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
   */
  static Enum(variants: EnumVariants): BorshSchema {
    return BorshSchema.fromSchema({ enum: parseEnumTypeEnum(variants) });
  }
}

function parseStructTypeStruct(fields: StructFields): StructType['struct'] {
  const entries = Object.entries(fields).map<[string, Schema]>(([key, value]) => [key, value.toSchema()]);
  return Object.fromEntries(entries);
}

function parseEnumTypeEnum(variants: EnumVariants): EnumType['enum'] {
  return Object.entries(variants).map<StructType>(([key, value]) => ({ struct: { [key]: value.toSchema() } }));
}

export type Unit = Record<string, never>;

export type StructFields = Record<string, BorshSchema>;

export type EnumVariants = Record<string, BorshSchema>;
