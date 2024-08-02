export abstract class BaseInfrastructureError extends Error {
  protected status: number;
  protected errorCode: string;

  getStatus(): number {
    return this.status;
  }

  getErrorCode(): string {
    return this.errorCode;
  }
}

export class VersionMismatchError extends BaseInfrastructureError {
  constructor() {
    super('Version mismatch!');
    this.name = 'VersionMismatchError';
  }
}

export class ExceedRetryTransactionError extends BaseInfrastructureError {
  constructor() {
    super('Transaction failed after maximum retries!');
    this.name = 'ExceedRetryTransactionError';
    this.errorCode = 'ExceedRetryTransactionError';
    this.status = 503; // 503 Service Unavailable
  }
}

export class RecordNotFoundException extends BaseInfrastructureError {
  constructor() {
    super('Record was not found!');
    this.name = 'RecordNotFoundException';
    this.errorCode = 'RecordNotFoundException';
    this.status = 404; // 404 Not Found
  }
}
