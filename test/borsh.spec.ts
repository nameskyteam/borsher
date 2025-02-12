import {
  borshSerialize,
  borshDeserialize,
  BorshSchema,
  Unit,
  Infer,
} from '../src';

test('u8', () => {
  const schema = BorshSchema.u8;
  const n: number = 100;
  const serialized = borshSerialize(schema, n);
  const deserialized = borshDeserialize(schema, serialized);
  expect(n).toEqual(deserialized);
});

test('u16', () => {
  const schema = BorshSchema.u16;
  const n: number = 100;
  const serialized = borshSerialize(schema, n);
  const deserialized = borshDeserialize(schema, serialized);
  expect(n).toEqual(deserialized);
});

test('u32', () => {
  const schema = BorshSchema.u32;
  const n: number = 100;
  const serialized = borshSerialize(schema, n);
  const deserialized = borshDeserialize(schema, serialized);
  expect(n).toEqual(deserialized);
});

test('u64', () => {
  const schema = BorshSchema.u64;
  const n: bigint = 100n;
  const serialized = borshSerialize(schema, n);
  const deserialized = borshDeserialize(schema, serialized);
  expect(n).toEqual(deserialized);
});

test('u128', () => {
  const schema = BorshSchema.u128;
  const n: bigint = 100n;
  const serialized = borshSerialize(schema, n);
  const deserialized = borshDeserialize(schema, serialized);
  expect(n).toEqual(deserialized);
});

test('i8', () => {
  const schema = BorshSchema.i8;
  const n: number = 100;
  const serialized = borshSerialize(schema, n);
  const deserialized = borshDeserialize(schema, serialized);
  expect(n).toEqual(deserialized);
});

test('i16', () => {
  const schema = BorshSchema.i16;
  const n: number = 100;
  const serialized = borshSerialize(schema, n);
  const deserialized = borshDeserialize(schema, serialized);
  expect(n).toEqual(deserialized);
});

test('i32', () => {
  const schema = BorshSchema.i32;
  const n: number = 100;
  const serialized = borshSerialize(schema, n);
  const deserialized = borshDeserialize(schema, serialized);
  expect(n).toEqual(deserialized);
});

test('i64', () => {
  const schema = BorshSchema.i64;
  const n: bigint = 100n;
  const serialized = borshSerialize(schema, n);
  const deserialized = borshDeserialize(schema, serialized);
  expect(n).toEqual(deserialized);
});

test('i128', () => {
  const schema = BorshSchema.i128;
  const n: bigint = 100n;
  const serialized = borshSerialize(schema, n);
  const deserialized = borshDeserialize(schema, serialized);
  expect(n).toEqual(deserialized);
});

test('f32', () => {
  const schema = BorshSchema.f32;
  const n: number = 1.0;
  const serialized = borshSerialize(schema, n);
  const deserialized = borshDeserialize(schema, serialized);
  expect(n).toEqual(deserialized);
});

test('f64', () => {
  const schema = BorshSchema.f64;
  const n: number = 1.0;
  const serialized = borshSerialize(schema, n);
  const deserialized = borshDeserialize(schema, serialized);
  expect(n).toEqual(deserialized);
});

test('bool', () => {
  const schema = BorshSchema.bool;
  const b: boolean = true;
  const serialized = borshSerialize(schema, b);
  const deserialized = borshDeserialize(schema, serialized);
  expect(b).toEqual(deserialized);
});

test('String', () => {
  const schema = BorshSchema.String;
  const s: string = 'hello world';
  const serialized = borshSerialize(schema, s);
  const deserialized = borshDeserialize(schema, serialized);
  expect(s).toEqual(deserialized);
});

test('Array', () => {
  const schema = BorshSchema.Array(BorshSchema.String, 2);
  const messages: string[] = ['hello', 'world'];
  const serialized = borshSerialize(schema, messages);
  const deserialized = borshDeserialize(schema, serialized);
  expect(messages).toEqual(deserialized);
});

test('Vec', () => {
  const schema = BorshSchema.Vec(BorshSchema.String);
  const messages: string[] = ['hello', 'world'];
  const serialized = borshSerialize(schema, messages);
  const deserialized = borshDeserialize(schema, serialized);
  expect(messages).toEqual(deserialized);
});

test('HashSet', () => {
  const schema = BorshSchema.HashSet(BorshSchema.String);
  const messages: Set<string> = new Set(['hello', 'world']);
  const serialized = borshSerialize(schema, messages);
  const deserialized = borshDeserialize(schema, serialized);
  expect(messages).toEqual(deserialized);
});

test('HashMap', () => {
  const schema = BorshSchema.HashMap(BorshSchema.String, BorshSchema.u128);
  const balances: Map<string, bigint> = new Map([
    ['alice', 1_000_000_000_000_000_000_000_000n],
    ['bob', 2_000_000_000_000_000_000_000_000n],
  ]);
  const serialized = borshSerialize(schema, balances);
  const deserialized = borshDeserialize(schema, serialized);
  expect(balances).toEqual(deserialized);
});

test('Option', () => {
  const schema = BorshSchema.Option(BorshSchema.String);

  const some: string | null = 'hello world';
  const serializedSome = borshSerialize(schema, some);
  const deserializedSome = borshDeserialize(schema, serializedSome);
  expect(some).toEqual(deserializedSome);

  const none: string | null = null;
  const serializedNone = borshSerialize(schema, none);
  const deserializedNone = borshDeserialize(schema, serializedNone);
  expect(none).toEqual(deserializedNone);
});

test('Unit', () => {
  const schema = BorshSchema.Unit;
  const unit: Unit = {};
  const serialized = borshSerialize(schema, unit);
  const deserialized = borshDeserialize(schema, serialized);
  expect(unit).toEqual(deserialized);
});

test('Struct', () => {
  const schema = BorshSchema.Struct({
    name: BorshSchema.String,
    age: BorshSchema.u8,
  });

  type Person = Infer<typeof schema>;

  // type Person = {
  //   name: string;
  //   age: number;
  // };

  const person: Person = {
    name: 'alice',
    age: 18,
  };

  const serialized = borshSerialize(schema, person);
  const deserialized = borshDeserialize(schema, serialized);

  expect(person).toEqual(deserialized);
});

test('Enum', () => {
  const schema = BorshSchema.Enum({
    Pending: BorshSchema.Unit,
    Fulfilled: BorshSchema.Unit,
    Rejected: BorshSchema.Unit,
  });

  type Status = Infer<typeof schema>;

  // type Status =
  //   | {
  //       Pending: Unit;
  //     }
  //   | {
  //       Fulfilled: Unit;
  //     }
  //   | {
  //       Rejected: Unit;
  //     };

  const status: Status = {
    Pending: {},
  };

  const serialized = borshSerialize(schema, status);
  const deserialized = borshDeserialize(schema, serialized);

  expect(status).toEqual(deserialized);
});

test('Enum Associated', () => {
  const schema = BorshSchema.Enum({
    Square: BorshSchema.u32,
    Rectangle: BorshSchema.Struct({
      length: BorshSchema.u32,
      width: BorshSchema.u32,
    }),
    Circle: BorshSchema.Struct({
      radius: BorshSchema.u32,
    }),
  });

  type Shape = Infer<typeof schema>;

  // type Shape =
  //   | {
  //       Square: number;
  //     }
  //   | {
  //       Rectangle: {
  //         length: number;
  //         width: number;
  //       };
  //     }
  //   | {
  //       Circle: {
  //         radius: number;
  //       };
  //     };

  const shape: Shape = {
    Square: 5,
  };

  const serialized = borshSerialize(schema, shape);
  const deserialized = borshDeserialize(schema, serialized);

  expect(shape).toEqual(deserialized);
});
