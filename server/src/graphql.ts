
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum UserRoles {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL",
    ANONYMOUS = "ANONYMOUS"
}

export class UserLoginInput {
    email: string;
    password: string;
}

export class CreateHeartbeatTypeInput {
    exampleField?: Nullable<number>;
}

export class UpdateHeartbeatTypeInput {
    id: number;
}

export class UserAddInput {
    email: string;
    roles: UserRoles[];
}

export class UserSignupInput {
    email: string;
    password: string;
}

export abstract class IMutation {
    abstract login(user?: Nullable<UserLoginInput>): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;

    abstract createHeartbeatType(createHeartbeatTypeInput: CreateHeartbeatTypeInput): HeartbeatType | Promise<HeartbeatType>;

    abstract updateHeartbeatType(updateHeartbeatTypeInput: UpdateHeartbeatTypeInput): HeartbeatType | Promise<HeartbeatType>;

    abstract removeHeartbeatType(id: number): Nullable<HeartbeatType> | Promise<Nullable<HeartbeatType>>;

    abstract signup(user?: Nullable<UserSignupInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract addUser(user?: Nullable<UserAddInput>): Nullable<User> | Promise<Nullable<User>>;
}

export class HeartbeatType {
    exampleField?: Nullable<number>;
}

export abstract class IQuery {
    abstract heartbeatTypes(): Nullable<HeartbeatType>[] | Promise<Nullable<HeartbeatType>[]>;

    abstract heartbeatType(id: number): Nullable<HeartbeatType> | Promise<Nullable<HeartbeatType>>;

    abstract user(userId: string): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    email: string;
    roles: UserRoles[];
    status: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class AuthPayload {
    token?: Nullable<string>;
    user?: Nullable<User>;
}

type Nullable<T> = T | null;
