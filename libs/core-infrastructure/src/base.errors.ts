export class VersionMismatchError extends Error {
  constructor() {
    super('Version mismatch!');
    this.name = 'VersionMismatchError';
  }
}

export class ExceedRetryTransactionError extends Error {
  constructor() {
    super('Transaction failed after maximum retries!');
    this.name = 'ExceedRetryTransactionError';
  }
}
