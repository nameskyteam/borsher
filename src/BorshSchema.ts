import * as borsh from 'borsh';

interface ExternalStructFields {
  [k: string]: borsh.Schema;
}

export interface StructFields {
  [k: string]: BorshSchema;
}

export interface EnumVariants {
  [k: string]: BorshSchema;
}

/**
 * Empty interface
 */
export interface PhantomData {}

/**
 * Schema used for borsh (de)serialization.
 */
export class BorshSchema {
  private readonly schema: borsh.Schema;

  private constructor(schema: borsh.Schema) {
    this.schema = schema;
  }

  static from(schema: borsh.Schema) {
    return new BorshSchema(schema);
  }

  into(): borsh.Schema {
    return this.schema;
  }

  /**
   * Schema for u8.
   * @example
   * const n: number = 100;
   *
   * const buffer = borshSerialize(BorshSchema.u8, n);
   */
  static get u8(): BorshSchema {
    return BorshSchema.from('u8');
  }

  /**
   * Schema for u16.
   * @example
   * const n: number = 100;
   *
   * const buffer = borshSerialize(BorshSchema.u16, n);
   */
  static get u16(): BorshSchema {
    return BorshSchema.from('u16');
  }

  /**
   * Schema for u32.
   * @example
   * const n: number = 100;
   *
   * const buffer = borshSerialize(BorshSchema.u32, n);
   */
  static get u32(): BorshSchema {
    return BorshSchema.from('u32');
  }

  /**
   * Schema for u64.
   * @example
   * const n: bigint = 100n;
   *
   * const buffer = borshSerialize(BorshSchema.u64, n);
   */
  static get u64(): BorshSchema {
    return BorshSchema.from('u64');
  }

  /**
   * Schema for u128.
   * @example
   * const n: bigint = 100n;
   *
   * const buffer = borshSerialize(BorshSchema.u128, n);
   */
  static get u128(): BorshSchema {
    return BorshSchema.from('u128');
  }

  /**
   * Schema for i8.
   * @example
   * const n: number = 100;
   *
   * const buffer = borshSerialize(BorshSchema.i8, n);
   */
  static get i8(): BorshSchema {
    return BorshSchema.from('i8');
  }

  /**
   * Schema for i16.
   * @example
   * const n: number = 100;
   *
   * const buffer = borshSerialize(BorshSchema.i16, n);
   */
  static get i16(): BorshSchema {
    return BorshSchema.from('i16');
  }

  /**
   * Schema for i32.
   * @example
   * const n: number = 100;
   *
   * const buffer = borshSerialize(BorshSchema.i32, n);
   */
  static get i32(): BorshSchema {
    return BorshSchema.from('i32');
  }

  /**
   * Schema for i64.
   * @example
   * const n: bigint = 100n;
   *
   * const buffer = borshSerialize(BorshSchema.i64, n);
   */
  static get i64(): BorshSchema {
    return BorshSchema.from('i64');
  }

  /**
   * Schema for i128.
   * @example
   * const n: bigint = 100n;
   *
   * const buffer = borshSerialize(BorshSchema.i128, n);
   */
  static get i128(): BorshSchema {
    return BorshSchema.from('i128');
  }

  /**
   * Schema for f32.
   * @example
   * const n: number = 1.0;
   *
   * const buffer = borshSerialize(BorshSchema.f32, n);
   */
  static get f32(): BorshSchema {
    return BorshSchema.from('f32');
  }

  /**
   * Schema for f64.
   * @example
   * const n: number = 1.0;
   *
   * const buffer = borshSerialize(BorshSchema.f64, n);
   */
  static get f64(): BorshSchema {
    return BorshSchema.from('f64');
  }

  /**
   * Schema for bool.
   * @example
   * const b: boolean = true;
   *
   * const buffer = borshSerialize(BorshSchema.bool, b);
   */
  static get bool(): BorshSchema {
    return BorshSchema.from('bool');
  }

  /**
   * Schema for String.
   * @example
   * const message: string = 'hello world';
   *
   * const buffer = borshSerialize(BorshSchema.String, message);
   */
  static get String(): BorshSchema {
    return BorshSchema.from('string');
  }

  // --------------------------------------- collection -----------------------------------

  /**
   * Schema for Array.
   * @example
   * const schema = BorshSchema.Array(BorshSchema.String, 2);
   *
   * const messages: string[] = ['hello', 'world'];
   *
   * const buffer = borshSerialize(schema, messages);
   * @param ele Element
   * @param len Length
   */
  static Array(ele: BorshSchema, len: number): BorshSchema {
    return BorshSchema.from({ array: { type: ele.into(), len } });
  }

  /**
   * Schema for Vec.
   * @example
   * const schema = BorshSchema.Vec(BorshSchema.String);
   *
   * const messages: string[] = ['hello', 'world'];
   *
   * const buffer = borshSerialize(schema, messages);
   * @param ele Element
   */
  static Vec(ele: BorshSchema): BorshSchema {
    return BorshSchema.from({ array: { type: ele.into() } });
  }

  /**
   * Schema for HashSet.
   * @example
   * const schema = BorshSchema.HashSet(BorshSchema.String);
   *
   * const messages: Set<string> = new Set(['hello', 'world']);
   *
   * const buffer = borshSerialize(schema, messages);
   * @param ele Element
   */
  static HashSet(ele: BorshSchema): BorshSchema {
    return BorshSchema.from({ set: ele.into() });
  }

  /**
   * Schema for HashMap.
   * @example
   * const schema = BorshSchema.HashMap(BorshSchema.String, BorshSchema.u128);
   *
   * const balances: Map<string, bigint> = new Map([
   *   ['alice', 1_000_000_000_000_000_000_000_000n],
   *   ['bob', 2_000_000_000_000_000_000_000_000n]
   * ]);
   *
   * const buffer = borshSerialize(schema, balances);
   * @param k Key
   * @param v Value
   */
  static HashMap(k: BorshSchema, v: BorshSchema): BorshSchema {
    return BorshSchema.from({ map: { key: k.into(), value: v.into() } });
  }

  // -------------------------------------- option ----------------------------------------

  /**
   * Schema for Option.
   * @example
   * const schema = BorshSchema.Option(BorshSchema.String);
   *
   * const some: string | null = 'hello world';
   * const none: string | null = null;
   *
   * const someBuffer = borshSerialize(schema, some);
   * const noneBuffer = borshSerialize(schema, none);
   * @param v Value
   */
  static Option(v: BorshSchema): BorshSchema {
    return BorshSchema.from({ option: v.into() });
  }

  // -------------------------------------- nothing ---------------------------------------

  /**
   * Schema for PhantomData.
   * @example
   * const nothing: PhantomData = {};
   *
   * const buffer = borshSerialize(BorshSchema.PhantomData, nothing);
   */
  static get PhantomData(): BorshSchema {
    return BorshSchema.Struct({});
  }

  /**
   * Schema for Struct.
   * @example
   * interface Person {
   *   name: string;
   *   age: number;
   * }
   *
   * const { Struct, String, u8 } = BorshSchema;
   *
   * const schema = Struct({
   *   name: String,
   *   age: u8
   * });
   *
   * const person: Person = {
   *   name: 'alice',
   *   age: 18
   * };
   *
   * const buffer = borshSerialize(schema, person);
   * @param fields Struct fields
   */
  static Struct(fields: StructFields): BorshSchema {
    return BorshSchema.from({
      struct: Object.entries(fields).reduce<ExternalStructFields>((externalStructFields, [k, v]) => {
        externalStructFields[k] = v.into();
        return externalStructFields;
      }, {}),
    });
  }

  /**
   * Schema for Enum.
   * @example
   * type Shape =
   *   | {
   *       Any: PhantomData;
   *     }
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
   * const { Enum, Struct, PhantomData, u32 } = BorshSchema;
   *
   * const schema = Enum({
   *   Any: PhantomData,
   *   Square: u32,
   *   Rectangle: Struct({
   *     length: u32,
   *     width: u32
   *   }),
   *   Circle: Struct({
   *     radius: u32
   *   })
   * });
   *
   * const rectangle: Shape = {
   *   Rectangle: {
   *     length: 5,
   *     width: 4
   *   }
   * };
   *
   * const buffer = borshSerialize(schema, rectangle);
   * @param variants Enum variants
   */
  static Enum(variants: EnumVariants): BorshSchema {
    return BorshSchema.from({
      enum: Object.entries(variants).map(([k, v]) => {
        return { struct: { [k]: v.into() } };
      }),
    });
  }
}
