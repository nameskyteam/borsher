import { Buffer } from 'buffer';
import * as borsh from 'borsh';

export class BorshSchema<
  /* eslint-disable @typescript-eslint/no-unused-vars */ _,
> {
  private readonly schema: borsh.Schema;

  private constructor(schema: borsh.Schema) {
    this.schema = schema;
  }

  private static fromSchema<T>(schema: borsh.Schema): BorshSchema<T> {
    return new BorshSchema(schema);
  }

  private toSchema(): borsh.Schema {
    return this.schema;
  }

  private static parseStructSchema(fields: StructFields): borsh.Schema {
    const entries = Object.entries(fields).map<[string, borsh.Schema]>(
      ([key, value]) => [key, value.toSchema()],
    );
    return {
      struct: Object.fromEntries(entries),
    };
  }

  private static parseEnumSchema(variants: EnumVariants): borsh.Schema {
    return {
      enum: Object.entries(variants).map(([key, value]) => ({
        struct: { [key]: value.toSchema() },
      })),
    };
  }

  static serialize<T>(schema: BorshSchema<T>, value: T): Buffer {
    const buffer = borsh.serialize(schema.toSchema(), value);
    return Buffer.from(buffer);
  }

  static deserialize<T>(schema: BorshSchema<T>, buffer: Uint8Array): T {
    const value = borsh.deserialize(schema.toSchema(), buffer);
    return value as T;
  }

  /**
   * Schema for u8
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.u8, n);
   */
  static get u8(): BorshSchema<number> {
    return BorshSchema.fromSchema('u8');
  }

  /**
   * Schema for u16
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.u16, n);
   */
  static get u16(): BorshSchema<number> {
    return BorshSchema.fromSchema('u16');
  }

  /**
   * Schema for u32
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.u32, n);
   */
  static get u32(): BorshSchema<number> {
    return BorshSchema.fromSchema('u32');
  }

  /**
   * Schema for u64
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.u64, n);
   */
  static get u64(): BorshSchema<bigint> {
    return BorshSchema.fromSchema('u64');
  }

  /**
   * Schema for u128
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.u128, n);
   */
  static get u128(): BorshSchema<bigint> {
    return BorshSchema.fromSchema('u128');
  }

  /**
   * Schema for i8
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.i8, n);
   */
  static get i8(): BorshSchema<number> {
    return BorshSchema.fromSchema('i8');
  }

  /**
   * Schema for i16
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.i16, n);
   */
  static get i16(): BorshSchema<number> {
    return BorshSchema.fromSchema('i16');
  }

  /**
   * Schema for i32
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.i32, n);
   */
  static get i32(): BorshSchema<number> {
    return BorshSchema.fromSchema('i32');
  }

  /**
   * Schema for i64
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.i64, n);
   */
  static get i64(): BorshSchema<bigint> {
    return BorshSchema.fromSchema('i64');
  }

  /**
   * Schema for i128
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.i128, n);
   */
  static get i128(): BorshSchema<bigint> {
    return BorshSchema.fromSchema('i128');
  }

  /**
   * Schema for f32
   * @example
   * const n: number = 1.0;
   * const buffer = borshSerialize(BorshSchema.f32, n);
   */
  static get f32(): BorshSchema<number> {
    return BorshSchema.fromSchema('f32');
  }

  /**
   * Schema for f64
   * @example
   * const n: number = 1.0;
   * const buffer = borshSerialize(BorshSchema.f64, n);
   */
  static get f64(): BorshSchema<number> {
    return BorshSchema.fromSchema('f64');
  }

  /**
   * Schema for bool
   * @example
   * const b: boolean = true;
   * const buffer = borshSerialize(BorshSchema.bool, b);
   */
  static get bool(): BorshSchema<boolean> {
    return BorshSchema.fromSchema('bool');
  }

  /**
   * Schema for String
   * @example
   * const message: string = 'hello world';
   * const buffer = borshSerialize(BorshSchema.String, message);
   */
  static get String(): BorshSchema<string> {
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
  static Option<T>(value: BorshSchema<T>): BorshSchema<T | null> {
    return BorshSchema.fromSchema({ option: value.toSchema() });
  }

  /**
   * Schema for Array
   * @example
   * const schema = BorshSchema.Array(BorshSchema.String, 2);
   * const messages: string[] = ['hello', 'world'];
   * const buffer = borshSerialize(schema, messages);
   */
  static Array<T>(value: BorshSchema<T>, length: number): BorshSchema<T[]> {
    return BorshSchema.fromSchema({
      array: { type: value.toSchema(), len: length },
    });
  }

  /**
   * Schema for Vec
   * @example
   * const schema = BorshSchema.Vec(BorshSchema.String);
   * const messages: string[] = ['hello', 'world'];
   * const buffer = borshSerialize(schema, messages);
   */
  static Vec<T>(value: BorshSchema<T>): BorshSchema<T[]> {
    return BorshSchema.fromSchema({ array: { type: value.toSchema() } });
  }

  /**
   * Schema for HashSet
   * @example
   * const schema = BorshSchema.HashSet(BorshSchema.String);
   * const messages: Set<string> = new Set(['hello', 'world']);
   * const buffer = borshSerialize(schema, messages);
   */
  static HashSet<T>(value: BorshSchema<T>): BorshSchema<Set<T>> {
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
  static HashMap<K, V>(
    key: BorshSchema<K>,
    value: BorshSchema<V>,
  ): BorshSchema<Map<K, V>> {
    return BorshSchema.fromSchema({
      map: { key: key.toSchema(), value: value.toSchema() },
    });
  }

  /**
   * Schema for Unit
   * @example
   * const unit: Unit = {};
   * const buffer = borshSerialize(BorshSchema.Unit, unit);
   */
  static get Unit(): BorshSchema<Unit> {
    return BorshSchema.Struct({});
  }

  /**
   * Schema for Struct
   * @example
   * const schema = BorshSchema.Struct({
   *   name: BorshSchema.String,
   *   age: BorshSchema.u8,
   * });
   *
   * type Person = Infer<typeof schema>;
   *
   * // type Person = {
   * //   name: string;
   * //   age: number;
   * // };
   *
   * const person: Person = {
   *   name: 'alice',
   *   age: 18,
   * };
   *
   * const buffer = borshSerialize(schema, person);
   */
  static Struct<Fields extends StructFields>(
    fields: Fields,
  ): BorshSchema<InferStruct<Fields>> {
    const schema = BorshSchema.parseStructSchema(fields);
    return BorshSchema.fromSchema(schema);
  }

  /**
   * Schema for Enum
   * @example
   * const schema = BorshSchema.Enum({
   *   Pending: BorshSchema.Unit,
   *   Fulfilled: BorshSchema.Unit,
   *   Rejected: BorshSchema.Unit,
   * });
   *
   * type Status = Infer<typeof schema>;
   *
   * // type Status =
   * //   | {
   * //   Pending: Unit;
   * // }
   * //   | {
   * //   Fulfilled: Unit;
   * // }
   * //   | {
   * //   Rejected: Unit;
   * // };
   *
   * const status: Status = {
   *   Pending: {},
   * };
   *
   * const buffer = borshSerialize(schema, status);
   *
   * @example
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
   * type Shape = Infer<typeof schema>;
   *
   * // type Shape =
   * //   | {
   * //   Square: number;
   * // }
   * //   | {
   * //   Rectangle: {
   * //     length: number;
   * //     width: number;
   * //   };
   * // }
   * //   | {
   * //   Circle: {
   * //     radius: number;
   * //   };
   * // };
   *
   * const shape: Shape = {
   *   Square: 5,
   * };
   *
   * const buffer = borshSerialize(schema, shape);
   */
  static Enum<Variants extends EnumVariants>(
    variants: Variants,
  ): BorshSchema<InferEnum<Variants>> {
    const schema = BorshSchema.parseEnumSchema(variants);
    return BorshSchema.fromSchema(schema);
  }
}

export type Unit = Record<string, never>;

export type Infer<S> = S extends BorshSchema<infer T> ? T : never;

type InferStruct<Fields> = Fields extends StructFields
  ? {
      [K in keyof Fields]: Infer<Fields[K]>;
    }
  : never;

type InferEnum<Variants> = Variants extends EnumVariants
  ? {
      [K in keyof Variants]: { [P in K]: Infer<Variants[P]> };
    }[keyof Variants]
  : never;

type StructFields = Record<string, BorshSchema<unknown>>;

type EnumVariants = Record<string, BorshSchema<unknown>>;
