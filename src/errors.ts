export class BorshSchemaError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UnreachableError extends Error {
  constructor() {
    super();
  }
}
