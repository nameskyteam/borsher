import { Schema } from 'borsh';
import { BoolType, EnumType, MapType, OptionType, SetType, StringType, StructType } from 'borsh/lib/types/types';

export class BorshSchema<_S extends BSE> {
  private readonly schema: Schema;

  private constructor(schema: Schema) {
    this.schema = schema;
  }

  static fromSchema<S extends BSE>(schema: S): BorshSchema<S> {
    return new BorshSchema<S>(schema);
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
  static get u8(): BorshSchema<U8> {
    return BorshSchema.fromSchema('u8');
  }

  /**
   * Schema for u16
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.u16, n);
   */
  static get u16(): BorshSchema<U16> {
    return BorshSchema.fromSchema('u16');
  }

  /**
   * Schema for u32
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.u32, n);
   */
  static get u32(): BorshSchema<U32> {
    return BorshSchema.fromSchema('u32');
  }

  /**
   * Schema for u64
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.u64, n);
   */
  static get u64(): BorshSchema<U64> {
    return BorshSchema.fromSchema('u64');
  }

  /**
   * Schema for u128
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.u128, n);
   */
  static get u128(): BorshSchema<U128> {
    return BorshSchema.fromSchema('u128');
  }

  /**
   * Schema for i8
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.i8, n);
   */
  static get i8(): BorshSchema<I8> {
    return BorshSchema.fromSchema('i8');
  }

  /**
   * Schema for i16
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.i16, n);
   */
  static get i16(): BorshSchema<I16> {
    return BorshSchema.fromSchema('i16');
  }

  /**
   * Schema for i32
   * @example
   * const n: number = 100;
   * const buffer = borshSerialize(BorshSchema.i32, n);
   */
  static get i32(): BorshSchema<I32> {
    return BorshSchema.fromSchema('i32');
  }

  /**
   * Schema for i64
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.i64, n);
   */
  static get i64(): BorshSchema<I64> {
    return BorshSchema.fromSchema('i64');
  }

  /**
   * Schema for i128
   * @example
   * const n: bigint = 100n;
   * const buffer = borshSerialize(BorshSchema.i128, n);
   */
  static get i128(): BorshSchema<I128> {
    return BorshSchema.fromSchema('i128');
  }

  /**
   * Schema for f32
   * @example
   * const n: number = 1.0;
   * const buffer = borshSerialize(BorshSchema.f32, n);
   */
  static get f32(): BorshSchema<F32> {
    return BorshSchema.fromSchema('f32');
  }

  /**
   * Schema for f64
   * @example
   * const n: number = 1.0;
   * const buffer = borshSerialize(BorshSchema.f64, n);
   */
  static get f64(): BorshSchema<F64> {
    return BorshSchema.fromSchema('f64');
  }

  /**
   * Schema for bool
   * @example
   * const b: boolean = true;
   * const buffer = borshSerialize(BorshSchema.bool, b);
   */
  static get bool(): BorshSchema<Bool> {
    return BorshSchema.fromSchema('bool');
  }

  /**
   * Schema for String
   * @example
   * const message: string = 'hello world';
   * const buffer = borshSerialize(BorshSchema.String, message);
   */
  static get String(): BorshSchema<StringBSE> {
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
  static Option<T extends BorshSchema<BSE>>(value: T): BorshSchema<Option<BSEType<T>>> {
    return BorshSchema.fromSchema({ option: value.toSchema() } as Option<T>);
  }

  /**
   * Schema for Array
   * @example
   * const schema = BorshSchema.Array(BorshSchema.String, 2);
   * const messages: string[] = ['hello', 'world'];
   * const buffer = borshSerialize(schema, messages);
   */
  static Array<T extends BorshSchema<BSE>>(value: T, length: number): BorshSchema<ArrayBSE<BSEType<T>>> {
    return BorshSchema.fromSchema({ array: { type: value.toSchema(), len: length } } as ArrayBSE<T>);
  }

  /**
   * Schema for Vec
   * @example
   * const schema = BorshSchema.Vec(BorshSchema.String);
   * const messages: string[] = ['hello', 'world'];
   * const buffer = borshSerialize(schema, messages);
   */
  static Vec<T extends BorshSchema<BSE>>(value: T): BorshSchema<Vec<BSEType<T>>> {
    return BorshSchema.fromSchema({ array: { type: value.toSchema() } } as Vec<T>);
  }

  /**
   * Schema for HashSet
   * @example
   * const schema = BorshSchema.HashSet(BorshSchema.String);
   * const messages: Set<string> = new Set(['hello', 'world']);
   * const buffer = borshSerialize(schema, messages);
   */
  static HashSet<T extends BorshSchema<BSE>>(value: T): BorshSchema<HashSet<BSEType<T>>> {
    return BorshSchema.fromSchema({ set: value.toSchema() } as HashSet<T>);
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
  static HashMap<K extends BorshSchema<BSE>, V extends BorshSchema<BSE>>(
    key: K,
    value: V,
  ): BorshSchema<HashMap<BSEType<K>, BSEType<V>>> {
    return BorshSchema.fromSchema({ map: { key: key.toSchema(), value: value.toSchema() } } as HashMap<K, V>);
  }

  /**
   * Schema for Unit
   * @example
   * const unit: Unit = {};
   * const buffer = borshSerialize(BorshSchema.Unit, unit);
   */
  static get Unit(): BorshSchema<Struct<Unit>> {
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
  static Struct<R extends Record<string, BorshSchema<BSE>>>(fields: R): BorshSchema<StructOf<R>> {
    return BorshSchema.fromSchema({ struct: toStructTypeStruct(fields) } as Struct<R>);
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
  static Enum<R extends Record<string, BorshSchema<BSE>>>(variants: R): BorshSchema<EnumOf<R>> {
    return BorshSchema.fromSchema({ enum: toEnumTypeEnum(variants) } as Enum<R>);
  }
}

function toStructTypeStruct<R extends Record<string, BorshSchema<BSE>>>(fields: R): StructType['struct'] {
  const entries = Object.entries(fields).map<[string, Schema]>(([key, value]) => [key, value.toSchema()]);
  return Object.fromEntries(entries);
}

function toEnumTypeEnum<R extends Record<string, BorshSchema<BSE>>>(variants: R): EnumType['enum'] {
  return Object.entries(variants).map<StructType>(([key, value]) => ({ struct: { [key]: value.toSchema() } }));
}

export type Unit = Record<string, never>;

// "BorschSchemaElement"
export type BSE =
  | U8
  | U16
  | U32
  | U64
  | U128
  | I8
  | I16
  | I32
  | I64
  | I128
  | F32
  | F64
  | Bool
  | StringBSE
  | Option<unknown>
  | ArrayBSE<unknown>
  | Vec<unknown>
  | HashSet<unknown>
  | HashMap<unknown, unknown>
  | Struct<Record<string, unknown>>
  | Enum<Record<string, unknown>>;

export type TypeOf<S extends BSE> = S extends U8
  ? number
  : S extends U16
    ? number
    : S extends U32
      ? number
      : S extends U64
        ? bigint
        : S extends U128
          ? bigint
          : S extends I8
            ? number
            : S extends I16
              ? number
              : S extends I32
                ? number
                : S extends I64
                  ? bigint
                  : S extends I128
                    ? bigint
                    : S extends F32
                      ? number
                      : S extends F64
                        ? number
                        : S extends Bool
                          ? boolean
                          : S extends string
                            ? string
                            : S extends Option<infer T>
                              ? (T extends BSE ? TypeOf<T> : never) | null
                              : S extends Array<infer T>
                                ? (T extends BSE ? TypeOf<T> : never)[]
                                : S extends Vec<infer T>
                                  ? (T extends BSE ? TypeOf<T> : never)[]
                                  : S extends HashSet<infer T>
                                    ? Set<T extends BSE ? TypeOf<T> : never>
                                    : S extends HashMap<infer K, infer V>
                                      ? K extends BSE
                                        ? V extends BSE
                                          ? Map<TypeOf<K>, TypeOf<V>>
                                          : never
                                        : never
                                      : S extends Struct<infer R>
                                        ? R extends Record<string, BSE>
                                          ? {
                                              [K in keyof R]: TypeOf<R[K]>;
                                            }
                                          : never
                                        : S extends Enum<infer R>
                                          ? R extends Record<string, BSE>
                                            ? { [K in keyof R]: { [KK in K]: TypeOf<R[K]> } }[keyof R]
                                            : never
                                          : never;

type Brand<B, K> = K & { __brand: B };

export type U8 = 'u8';
export type U16 = 'u16';
export type U32 = 'u32';
export type U64 = 'u64';
export type U128 = 'u128';
export type I8 = 'i8';
export type I16 = 'i16';
export type I32 = 'i32';
export type I64 = 'i64';
export type I128 = 'i128';
export type F32 = 'f32';
export type F64 = 'f64';
export type Bool = BoolType;
export type StringBSE = StringType;
export type Option<T> = Brand<T, OptionType>;
export type ArrayBSE<T> = Brand<T, Readonly<{ array: { type: Schema; len: number } }>>;
export type Vec<T> = Brand<T, Readonly<{ array: { type: Schema } }>>;
export type HashSet<T> = Brand<T, SetType>;
export type HashMap<K, V> = Brand<[K, V], MapType>;
export type Struct<R extends Record<string, unknown>> = Brand<R, StructType>;
export type Enum<R extends Record<string, unknown>> = Brand<R, EnumType>;

type BSEType<T extends BorshSchema<BSE>> = T extends BorshSchema<infer S> ? S : never;

type StructOf<R extends Record<string, BorshSchema<BSE>>> = Struct<{
  [K in keyof R]: BSEType<R[K]>;
}>;

type EnumOf<R extends Record<string, BorshSchema<BSE>>> = Enum<{
  [K in keyof R]: BSEType<R[K]>;
}>;
