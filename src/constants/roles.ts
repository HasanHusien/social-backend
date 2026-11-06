export const ROLES = {
  USER: "user",
  ADMIN: "admin",
  MODERATOR: "guid",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
//  "user" | "admin" | "moderator"
