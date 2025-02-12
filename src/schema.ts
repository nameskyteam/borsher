import { Buffer } from 'buffer';
import * as borsh from 'borsh';

export class BorshSchema<
  /* eslint-disable @typescript-eslint/no-unused-vars */ T,
> {
  private readonly schema: borsh.Schema;

  private constructor(schema: borsh.Schema) {
    this.schema = schema;
  }

  private static fromSchemaUnchecked<T>(schema: borsh.Schema): BorshSchema<T> {
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

  serialize(value: T): Buffer {
    const buffer = borsh.serialize(this.toSchema(), value);
    return Buffer.from(buffer);
  }

  deserialize(buffer: Uint8Array): T {
    const value = borsh.deserialize(this.toSchema(), buffer);
    return value as T;
  }

  /**
   * Schema for u8
   * @example
   * const schema = BorshSchema.u8;
   * const n: number = 100;
   * const buffer = schema.serialize(n);
   */
  static get u8(): BorshSchema<number> {
    return BorshSchema.fromSchemaUnchecked('u8');
  }

  /**
   * Schema for u16
   * @example
   * const schema = BorshSchema.u16;
   * const n: number = 100;
   * const buffer = schema.serialize(n);
   */
  static get u16(): BorshSchema<number> {
    return BorshSchema.fromSchemaUnchecked('u16');
  }

  /**
   * Schema for u32
   * @example
   * const schema = BorshSchema.u32;
   * const n: number = 100;
   * const buffer = schema.serialize(n);
   */
  static get u32(): BorshSchema<number> {
    return BorshSchema.fromSchemaUnchecked('u32');
  }

  /**
   * Schema for u64
   * @example
   * const schema = BorshSchema.u64;
   * const n: bigint = 100n;
   * const buffer = schema.serialize(n);
   */
  static get u64(): BorshSchema<bigint> {
    return BorshSchema.fromSchemaUnchecked('u64');
  }

  /**
   * Schema for u128
   * @example
   * const schema = BorshSchema.u128;
   * const n: bigint = 100n;
   * const buffer = schema.serialize(n);
   */
  static get u128(): BorshSchema<bigint> {
    return BorshSchema.fromSchemaUnchecked('u128');
  }

  /**
   * Schema for i8
   * @example
   * const schema = BorshSchema.i8;
   * const n: number = 100;
   * const buffer = schema.serialize(n);
   */
  static get i8(): BorshSchema<number> {
    return BorshSchema.fromSchemaUnchecked('i8');
  }

  /**
   * Schema for i16
   * @example
   * const schema = BorshSchema.i16;
   * const n: number = 100;
   * const buffer = schema.serialize(n);
   */
  static get i16(): BorshSchema<number> {
    return BorshSchema.fromSchemaUnchecked('i16');
  }

  /**
   * Schema for i32
   * @example
   * const schema = BorshSchema.i32;
   * const n: number = 100;
   * const buffer = schema.serialize(n);
   */
  static get i32(): BorshSchema<number> {
    return BorshSchema.fromSchemaUnchecked('i32');
  }

  /**
   * Schema for i64
   * @example
   * const schema = BorshSchema.i64;
   * const n: bigint = 100n;
   * const buffer = schema.serialize(n);
   */
  static get i64(): BorshSchema<bigint> {
    return BorshSchema.fromSchemaUnchecked('i64');
  }

  /**
   * Schema for i128
   * @example
   * const schema = BorshSchema.i128;
   * const n: bigint = 100n;
   * const buffer = schema.serialize(n);
   */
  static get i128(): BorshSchema<bigint> {
    return BorshSchema.fromSchemaUnchecked('i128');
  }

  /**
   * Schema for f32
   * @example
   * const schema = BorshSchema.f32;
   * const n: number = 1.0;
   * const buffer = schema.serialize(n);
   */
  static get f32(): BorshSchema<number> {
    return BorshSchema.fromSchemaUnchecked('f32');
  }

  /**
   * Schema for f64
   * @example
   * const schema = BorshSchema.f64;
   * const n: number = 1.0;
   * const buffer = schema.serialize(n);
   */
  static get f64(): BorshSchema<number> {
    return BorshSchema.fromSchemaUnchecked('f64');
  }

  /**
   * Schema for bool
   * @example
   * const schema = BorshSchema.bool;
   * const b: boolean = true;
   * const buffer = schema.serialize(b);
   */
  static get bool(): BorshSchema<boolean> {
    return BorshSchema.fromSchemaUnchecked('bool');
  }

  /**
   * Schema for String
   * @example
   * const schema = BorshSchema.String;
   * const message: string = 'hello world';
   * const buffer = schema.serialize(message);
   */
  static get String(): BorshSchema<string> {
    return BorshSchema.fromSchemaUnchecked('string');
  }

  /**
   * Schema for Option
   * @example
   * const schema = BorshSchema.Option(BorshSchema.String);
   *
   * const some: string | null = 'hello world';
   * const someBuffer = schema.serialize(some);
   *
   * const none: string | null = null;
   * const noneBuffer = schema.serialize(none);
   */
  static Option<T>(value: BorshSchema<T>): BorshSchema<T | null> {
    return BorshSchema.fromSchemaUnchecked({ option: value.toSchema() });
  }

  /**
   * Schema for Array
   * @example
   * const schema = BorshSchema.Array(BorshSchema.String, 2);
   * const messages: string[] = ['hello', 'world'];
   * const buffer = schema.serialize(messages);
   */
  static Array<T>(value: BorshSchema<T>, length: number): BorshSchema<T[]> {
    return BorshSchema.fromSchemaUnchecked({
      array: { type: value.toSchema(), len: length },
    });
  }

  /**
   * Schema for Vec
   * @example
   * const schema = BorshSchema.Vec(BorshSchema.String);
   * const messages: string[] = ['hello', 'world'];
   * const buffer = schema.serialize(messages);
   */
  static Vec<T>(value: BorshSchema<T>): BorshSchema<T[]> {
    return BorshSchema.fromSchemaUnchecked({
      array: { type: value.toSchema() },
    });
  }

  /**
   * Schema for HashSet
   * @example
   * const schema = BorshSchema.HashSet(BorshSchema.String);
   * const messages: Set<string> = new Set(['hello', 'world']);
   * const buffer = schema.serialize(messages);
   */
  static HashSet<T>(value: BorshSchema<T>): BorshSchema<Set<T>> {
    return BorshSchema.fromSchemaUnchecked({ set: value.toSchema() });
  }

  /**
   * Schema for HashMap
   * @example
   * const schema = BorshSchema.HashMap(BorshSchema.String, BorshSchema.u128);
   * const balances: Map<string, bigint> = new Map([
   *   ['alice', 1_000_000_000_000_000_000_000_000n],
   *   ['bob', 2_000_000_000_000_000_000_000_000n],
   * ]);
   * const buffer = schema.serialize(balances);
   */
  static HashMap<K, V>(
    key: BorshSchema<K>,
    value: BorshSchema<V>,
  ): BorshSchema<Map<K, V>> {
    return BorshSchema.fromSchemaUnchecked({
      map: { key: key.toSchema(), value: value.toSchema() },
    });
  }

  /**
   * Schema for Unit
   * @example
   * const schema = BorshSchema.Unit;
   * const unit: Unit = {};
   * const buffer = schema.serialize(unit);
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
   * const buffer = schema.serialize(person);
   */
  static Struct<Fields extends StructFields>(
    fields: Fields,
  ): BorshSchema<InferStruct<Fields>> {
    const schema = BorshSchema.parseStructSchema(fields);
    return BorshSchema.fromSchemaUnchecked(schema);
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
   * const buffer = schema.serialize(status);
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
   * const buffer = schema.serialize(shape);
   */
  static Enum<Variants extends EnumVariants>(
    variants: Variants,
  ): BorshSchema<InferEnum<Variants>> {
    const schema = BorshSchema.parseEnumSchema(variants);
    return BorshSchema.fromSchemaUnchecked(schema);
  }
}

type StructFields = Record<string, BorshSchema<unknown>>;

type EnumVariants = Record<string, BorshSchema<unknown>>;

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

export type Unit = Record<string, never>;
