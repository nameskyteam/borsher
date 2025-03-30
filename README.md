# Borsher
Support for [Borsh](https://borsh.io) (de)serialization

Borsher wraps the [Borsh JS](https://github.com/near/borsh-js) and simplifies the creation of schema

## Install
```shell
pnpm add borsher
```

## Usage
```ts
import { borshSerialize, borshDeserialize, BorshSchema, Infer, Unit } from 'borsher';
```

### u8
```ts
const schema = BorshSchema.u8;
const n: number = 100;
const buffer = borshSerialize(schema, n);
```

### u16
```ts
const schema = BorshSchema.u16;
const n: number = 100;
const buffer = borshSerialize(schema, n);
```

### u32
```ts
const schema = BorshSchema.u32;
const n: number = 100;
const buffer = borshSerialize(schema, n);
```

### u64
```ts
const schema = BorshSchema.u64;
const n: bigint = 100n;
const buffer = borshSerialize(schema, n);
```

### u128
```ts
const schema = BorshSchema.u128;
const n: bigint = 100n;
const buffer = borshSerialize(schema, n);
```

### i8
```ts
const schema = BorshSchema.i8;
const n: number = 100;
const buffer = borshSerialize(schema, n);
```

### i16
```ts
const schema = BorshSchema.i16;
const n: number = 100;
const buffer = borshSerialize(schema, n);
```

### i32
```ts
const schema = BorshSchema.i32;
const n: number = 100;
const buffer = borshSerialize(schema, n);
```

### i64
```ts
const schema = BorshSchema.i64;
const n: bigint = 100n;
const buffer = borshSerialize(schema, n);
```

### i128
```ts
const schema = BorshSchema.i128;
const n: bigint = 100n;
const buffer = borshSerialize(schema, n);
```

### f32
```ts
const schema = BorshSchema.f32;
const n: number = 1.0;
const buffer = borshSerialize(schema, n);
```

### f64
```ts
const schema = BorshSchema.f64;
const n: number = 1.0;
const buffer = borshSerialize(schema, n);
```

### bool
```ts
const schema = BorshSchema.bool;
const b: boolean = true;
const buffer = borshSerialize(schema, b);
```

### String
```ts
const schema = BorshSchema.String;
const message: string = 'hello world';
const buffer = borshSerialize(schema, message);
```

### Option
```ts
const schema = BorshSchema.Option(BorshSchema.String);

const some: string | null = 'hello world';
const someBuffer = borshSerialize(schema, some);

const none: string | null = null;
const noneBuffer = borshSerialize(schema, none);
```

### Array
```ts
const schema = BorshSchema.Array(BorshSchema.String, 2);
const messages: string[] = ['hello', 'world'];
const buffer = borshSerialize(schema, messages);
```

### Vec
```ts
const schema = BorshSchema.Vec(BorshSchema.String);
const messages: string[] = ['hello', 'world'];
const buffer = borshSerialize(schema, messages);
```

### HashSet
```ts
const schema = BorshSchema.HashSet(BorshSchema.String);
const messages: Set<string> = new Set(['hello', 'world']);
const buffer = borshSerialize(schema, messages);
```

### HashMap
```ts
const schema = BorshSchema.HashMap(BorshSchema.String, BorshSchema.u128);
const balances: Map<string, bigint> = new Map([
  ['alice', 1_000_000_000_000_000_000_000_000n],
  ['bob', 2_000_000_000_000_000_000_000_000n],
]);
const buffer = borshSerialize(schema, balances);
```

### Unit
```ts
const schema = BorshSchema.Unit;
const unit: Unit = {};
const buffer = borshSerialize(schema, unit);
```

### Struct
```ts
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

const buffer = borshSerialize(schema, person);
```

### Enum
```ts
const schema = BorshSchema.Enum({
  Pending: BorshSchema.Unit,
  Fulfilled: BorshSchema.Unit,
  Rejected: BorshSchema.Unit,
});

type Status = Infer<typeof schema>;

// type Status =
//   | {
//   Pending: Unit;
// }
//   | {
//   Fulfilled: Unit;
// }
//   | {
//   Rejected: Unit;
// };

const status: Status = {
  Pending: {},
};

const buffer = borshSerialize(schema, status);
```

### Enum Associated
```ts
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
//   Square: number;
// }
//   | {
//   Rectangle: {
//     length: number;
//     width: number;
//   };
// }
//   | {
//   Circle: {
//     radius: number;
//   };
// };

const shape: Shape = {
  Square: 5,
};

const buffer = borshSerialize(schema, shape);
```
