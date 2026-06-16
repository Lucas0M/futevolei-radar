export class AppError extends Error {
  public message: string;
  public statusCode: number;

  constructor(message: string, statusCode: number = 400,) {
    super(message),
    this.message = message;
    this.statusCode = statusCode
    this.name = "AppError";
  }
}
