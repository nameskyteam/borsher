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

  // --------------------------------------- custom ---------------------------------------

  /**
   * Schema for custom struct.
   * @example
   * interface Person {
   *   name: string;
   *   age: number;
   * }
   *
   * const person: Person = {
   *   name: 'alice',
   *   age: 18
   * };
   *
   * const schema = BorshSchema.Struct({
   *   name: BorshSchema.String,
   *   age: BorshSchema.u8
   * });
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
   * Schema for custom enum.
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
   * const any: Shape = {
   *   Any: {}
   * };
   *
   * const square: Shape = {
   *   Square: 5
   * };
   *
   * const rectangle: Shape = {
   *   Rectangle: {
   *     length: 5,
   *     width: 4
   *   }
   * };
   *
   * const circle: Shape = {
   *   Circle: {
   *     radius: 2
   *   }
   * };
   *
   * const schema = BorshSchema.Enum({
   *   Any: BorshSchema.PhantomData,
   *   Square: BorshSchema.u32,
   *   Rectangle: BorshSchema.Struct({
   *     length: BorshSchema.u32,
   *     width: BorshSchema.u32
   *   }),
   *   Circle: BorshSchema.Struct({
   *     radius: BorshSchema.u32
   *   })
   * });
   * @param variants Enum variants
   */
  static Enum(variants: EnumVariants): BorshSchema {
    return BorshSchema.from({
      enum: Object.entries(variants).map(([k, v]) => {
        return { struct: { [k]: v.into() } };
      }),
    });
  }

  // -------------------------------------- string ----------------------------------------

  /**
   * Schema for non-fixed length string.
   * @example
   * const message: string = 'hello world';
   *
   * const schema = BorshSchema.String;
   */
  static get String(): BorshSchema {
    return BorshSchema.from('string');
  }

  // -------------------------------------- option ----------------------------------------

  /**
   * Schema for optional value.
   * @example
   * const message: string | null = 'hello world';
   *
   * const schema = BorshSchema.Option(BorshSchema.String);
   * @param v Value
   */
  static Option(v: BorshSchema): BorshSchema {
    return BorshSchema.from({ option: v.into() });
  }

  // --------------------------------------- collection -----------------------------------

  /**
   * Schema for fixed length array.
   * @example
   * const messages: string[] = ['hello', 'world'];
   *
   * const schema = BorshSchema.Array(BorshSchema.String, 2);
   * @param ele Element
   * @param len Length
   */
  static Array(ele: BorshSchema, len: number): BorshSchema {
    return BorshSchema.from({ array: { type: ele.into(), len } });
  }

  /**
   * Schema for non-fixed length array.
   * @example
   * const messages: string[] = ['hello', 'world'];
   *
   * const schema = BorshSchema.Vec(BorshSchema.String);
   * @param ele Element
   */
  static Vec(ele: BorshSchema): BorshSchema {
    return BorshSchema.from({ array: { type: ele.into() } });
  }

  /**
   * Schema for non-fixed length set.
   * @example
   * const messages: Set<string> = new Set(['hello', 'world']);
   *
   * const schema = BorshSchema.HashSet(BorshSchema.String);
   * @param ele Element
   */
  static HashSet(ele: BorshSchema): BorshSchema {
    return BorshSchema.from({ set: ele.into() });
  }

  /**
   * Schema for non-fixed length map.
   * @example
   * const balances: Map<string, bigint> = new Map([
   *   ['alice', 1_000_000_000_000_000_000_000_000n],
   *   ['bob', 2_000_000_000_000_000_000_000_000n]
   * ]);
   *
   * const schema = BorshSchema.HashMap(BorshSchema.String, BorshSchema.u128);
   * @param k Key
   * @param v Value
   */
  static HashMap(k: BorshSchema, v: BorshSchema): BorshSchema {
    return BorshSchema.from({ map: { key: k.into(), value: v.into() } });
  }

  // -------------------------------------- primitive -------------------------------------

  /**
   * Schema for u8.
   * @example
   * const n: number = 100;
   *
   * const schema = BorshSchema.u8;
   */
  static get u8(): BorshSchema {
    return BorshSchema.from('u8');
  }

  /**
   * Schema for u16.
   * @example
   * const n: number = 100;
   *
   * const schema = BorshSchema.u16;
   */
  static get u16(): BorshSchema {
    return BorshSchema.from('u16');
  }

  /**
   * Schema for u32.
   * @example
   * const n: number = 100;
   *
   * const schema = BorshSchema.u32;
   */
  static get u32(): BorshSchema {
    return BorshSchema.from('u32');
  }

  /**
   * Schema for u64.
   * @example
   * const n: bigint = 100n;
   *
   * const schema = BorshSchema.u64;
   */
  static get u64(): BorshSchema {
    return BorshSchema.from('u64');
  }

  /**
   * Schema for u128.
   * @example
   * const n: bigint = 100n;
   *
   * const schema = BorshSchema.u128;
   */
  static get u128(): BorshSchema {
    return BorshSchema.from('u128');
  }

  /**
   * Schema for i8.
   * @example
   * const n: number = 100;
   *
   * const schema = BorshSchema.i8;
   */
  static get i8(): BorshSchema {
    return BorshSchema.from('i8');
  }

  /**
   * Schema for i16.
   * @example
   * const n: number = 100;
   *
   * const schema = BorshSchema.i16;
   */
  static get i16(): BorshSchema {
    return BorshSchema.from('i16');
  }

  /**
   * Schema for i32.
   * @example
   * const n: number = 100;
   *
   * const schema = BorshSchema.i32;
   */
  static get i32(): BorshSchema {
    return BorshSchema.from('i32');
  }

  /**
   * Schema for i64.
   * @example
   * const n: bigint = 100n;
   *
   * const schema = BorshSchema.i64;
   */
  static get i64(): BorshSchema {
    return BorshSchema.from('i64');
  }

  /**
   * Schema for i128.
   * @example
   * const n: bigint = 100n;
   *
   * const schema = BorshSchema.i128;
   */
  static get i128(): BorshSchema {
    return BorshSchema.from('i128');
  }

  /**
   * Schema for f32.
   * @example
   * const n: number = 1.0;
   *
   * const schema = BorshSchema.f32;
   */
  static get f32(): BorshSchema {
    return BorshSchema.from('f32');
  }

  /**
   * Schema for f64.
   * @example
   * const n: number = 1.0;
   *
   * const schema = BorshSchema.f64;
   */
  static get f64(): BorshSchema {
    return BorshSchema.from('f64');
  }

  /**
   * Schema for bool.
   * @example
   * const b: boolean = true;
   *
   * const schema = BorshSchema.bool;
   */
  static get bool(): BorshSchema {
    return BorshSchema.from('bool');
  }

  // -------------------------------------- nothing ---------------------------------------

  /**
   * Schema for nothing.
   * @example
   * const nothing: PhantomData = {};
   *
   * const schema = BorshSchema.PhantomData;
   */
  static get PhantomData(): BorshSchema {
    return BorshSchema.Struct({});
  }
}
