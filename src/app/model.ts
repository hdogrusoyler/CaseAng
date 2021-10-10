export class Content {}

export class User {
  user: string | undefined;
  role: number | undefined;
}

export enum Role {
  User = 'User',
  Admin = 'Admin',
}

