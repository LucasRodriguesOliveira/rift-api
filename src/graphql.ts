
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    userType(id: string): Nullable<UserType> | Promise<Nullable<UserType>>;
    userTypeList(): Nullable<Nullable<UserType>[]> | Promise<Nullable<Nullable<UserType>[]>>;
}

export interface UserType {
    id: string;
    description?: Nullable<string>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    isActive?: Nullable<boolean>;
    isExcluded?: Nullable<boolean>;
    teste?: Nullable<boolean>;
}

type Nullable<T> = T | null;
