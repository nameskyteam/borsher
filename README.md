# Borsher
Support for [borsh](https://borsh.io) (de)serialization

Borsher wraps the [borsh-js](https://github.com/near/borsh-js) and simplifies the creation of schema

## Usage
```ts
import { BorshSchema, borshSerialize, borshDeserialize, PhantomData } from 'borsher';
```

### Primitive type
```ts
const n: number = 100;

const buffer = borshSerialize(BorshSchema.u8, n);
```

```ts
const n: number = 100;

const buffer = borshSerialize(BorshSchema.u16, n);
```

```ts
const n: number = 100;

const buffer = borshSerialize(BorshSchema.u32, n);
```

```ts
const n: bigint = 100n;

const buffer = borshSerialize(BorshSchema.u64, n);
```

```ts
const n: bigint = 100n;

const buffer = borshSerialize(BorshSchema.u128, n);
```

```ts
const n: number = 100;

const buffer = borshSerialize(BorshSchema.i8, n);
```

```ts
const n: number = 100;

const buffer = borshSerialize(BorshSchema.i16, n);
```

```ts
const n: number = 100;

const buffer = borshSerialize(BorshSchema.i32, n);
```

```ts
const n: bigint = 100n;

const buffer = borshSerialize(BorshSchema.i64, n);
```

```ts
const n: bigint = 100n;

const buffer = borshSerialize(BorshSchema.i128, n);
```

```ts
const n: number = 1.0;

const buffer = borshSerialize(BorshSchema.f32, n);
```

```ts
const n: number = 1.0;

const buffer = borshSerialize(BorshSchema.f64, n);
```

```ts
const b: boolean = true;

const buffer = borshSerialize(BorshSchema.bool, b);
```

### String
```ts
const message: string = 'hello world';

const buffer = borshSerialize(BorshSchema.String, message);
```

### Fixed length array
```ts
const schema = BorshSchema.Array(BorshSchema.String, 2);

const messages: string[] = ['hello', 'world'];

const buffer = borshSerialize(schema, messages);
```

### Non-fixed length array
```ts
const schema = BorshSchema.Vec(BorshSchema.String);

const messages: string[] = ['hello', 'world'];

const buffer = borshSerialize(schema, messages);
```

### Non-fixed length set
```ts
const schema = BorshSchema.HashSet(BorshSchema.String);

const messages: Set<string> = new Set(['hello', 'world']);

const buffer = borshSerialize(schema, messages);
```

### Non-fixed length map
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

### Nothing
```ts
const nothing: PhantomData = {};

const buffer = borshSerialize(BorshSchema.PhantomData, nothing);
```

### Custom struct
```ts
interface Person {
  name: string;
  age: number;
}

const { Struct, String, u8 } = BorshSchema;

const schema = Struct({
  name: String,
  age: u8
});

const person: Person = {
  name: 'alice',
  age: 18
};

const buffer = borshSerialize(schema, person);
```

### Custom enum
```ts
type Shape =
  | {
      Any: PhantomData;
    }
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

const { Enum, Struct, PhantomData, u32 } = BorshSchema;

const schema = Enum({
  Any: PhantomData,
  Square: u32,
  Rectangle: Struct({
    length: u32,
    width: u32
  }),
  Circle: Struct({
    radius: u32
  })
});

const rectangle: Shape = {
  Rectangle: {
    length: 5,
    width: 4
  }
};

const buffer = borshSerialize(schema, rectangle);
```
