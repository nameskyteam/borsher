# Borsher
Support for [borsh](https://borsh.io) (de)serialization

Borsher wraps the [borsh-js](https://github.com/near/borsh-js) and simplifies the creation of schema

## Install
```shell
yarn add borsher
```

## Usage
```ts
import { BorshSchema, borshSerialize, borshDeserialize } from 'borsher';
```

### u8
```ts
const n: number = 100;

const buffer = borshSerialize(BorshSchema.u8, n);
```

### u16
```ts
const n: number = 100;

const buffer = borshSerialize(BorshSchema.u16, n);
```

### u32
```ts
const n: number = 100;

const buffer = borshSerialize(BorshSchema.u32, n);
```

### u64
```ts
const n: bigint = 100n;

const buffer = borshSerialize(BorshSchema.u64, n);
```

### u128
```ts
const n: bigint = 100n;

const buffer = borshSerialize(BorshSchema.u128, n);
```

### i8
```ts
const n: number = 100;

const buffer = borshSerialize(BorshSchema.i8, n);
```

### i16
```ts
const n: number = 100;

const buffer = borshSerialize(BorshSchema.i16, n);
```

### i32
```ts
const n: number = 100;

const buffer = borshSerialize(BorshSchema.i32, n);
```

### i64
```ts
const n: bigint = 100n;

const buffer = borshSerialize(BorshSchema.i64, n);
```

### i128
```ts
const n: bigint = 100n;

const buffer = borshSerialize(BorshSchema.i128, n);
```

### f32
```ts
const n: number = 1.0;

const buffer = borshSerialize(BorshSchema.f32, n);
```

### f64
```ts
const n: number = 1.0;

const buffer = borshSerialize(BorshSchema.f64, n);
```

### bool
```ts
const b: boolean = true;

const buffer = borshSerialize(BorshSchema.bool, b);
```

### String
```ts
const message: string = 'hello world';

const buffer = borshSerialize(BorshSchema.String, message);
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
  ['bob', 2_000_000_000_000_000_000_000_000n]
]);

const buffer = borshSerialize(schema, balances);
```

### Option
```ts
const schema = BorshSchema.Option(BorshSchema.String);

const some: string | null = 'hello world';
const none: string | null = null;

const someBuffer = borshSerialize(schema, some);
const noneBuffer = borshSerialize(schema, none);
```

### Unit
```ts
const unit: {} = {};

const buffer = borshSerialize(BorshSchema.Unit, unit);
```

### Struct
```ts
type Person = {
  name: string;
  age: number;
}

const schema = BorshSchema.Struct({
  name: BorshSchema.String,
  age: BorshSchema.u8
});

const person: Person = {
  name: 'alice',
  age: 18
};

const buffer = borshSerialize(schema, person);
```

### Enum
```ts
// enum without associated value
type Status = 
  | {
      Pending: {};
    }
  | {
      Fulfilled: {};
    }
  | {
      Rejected: {};
    };

const schema = BorshSchema.Enum({
  Pending: BorshSchema.Unit,
  Fulfilled: BorshSchema.Unit,
  Rejected: BorshSchema.Unit,
});

const status: Status = {
  Pending: {}
};

const buffer = borshSerialize(schema, status);
```

```ts
// enum with associated value
type Shape =
  | {
      Square: number;
    }
  | {
      Rectangle: {
        length: number;
        width: number;
      };
    }
  | {
      Circle: {
        radius: number;
      };
    };

const schema = BorshSchema.Enum({
  Square: BorshSchema.u32,
  Rectangle: BorshSchema.Struct({
    length: BorshSchema.u32,
    width: BorshSchema.u32
  }),
  Circle: BorshSchema.Struct({
    radius: BorshSchema.u32
  })
});

const shape: Shape = {
  Square: 5
};

const buffer = borshSerialize(schema, shape);
```
