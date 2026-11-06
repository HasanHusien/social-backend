import type { StringValue } from "ms";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      JWT_EXPIRES_IN: StringValue;
      JWT_COOKIE_EXPIRES_IN: number | string;
      PORT?: string;
      MONGO_URI: string;
    }
  }
}
export {};
