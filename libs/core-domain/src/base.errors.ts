export abstract class BaseDomainError extends Error {
  protected status: number;
  protected errorCode: string;

  getStatus(): number {
    return this.status;
  }

  getErrorCode(): string {
    return this.errorCode;
  }
}
