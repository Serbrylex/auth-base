import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

export declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export enum Role {
  ADMIN,
  USER,
}