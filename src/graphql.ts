
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    userType(id: string): Nullable<UserType> | Promise<Nullable<UserType>>;
    userTypeList(showInactive?: Nullable<boolean>): Nullable<Nullable<UserType>[]> | Promise<Nullable<Nullable<UserType>[]>>;
}

export interface IMutation {
    registerUserType(description?: Nullable<string>): UserType | Promise<UserType>;
    updateUserTypeDescription(id: string, description?: Nullable<string>): Nullable<UserType> | Promise<Nullable<UserType>>;
    updateUserTypeIsActive(id: string, isActive?: Nullable<boolean>): Nullable<UserType> | Promise<Nullable<UserType>>;
    removeUserType(id: string): boolean | Promise<boolean>;
}

export interface UserType {
    id: string;
    description?: Nullable<string>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    isActive?: Nullable<boolean>;
    isExcluded?: Nullable<boolean>;
}

type Nullable<T> = T | null;
