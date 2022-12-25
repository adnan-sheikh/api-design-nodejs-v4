export {};

declare global {
  namespace Express {
    export interface Request {
      shhhSecret?: string;
    }
  }
}
