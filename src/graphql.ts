
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    module(id: string): Nullable<Module> | Promise<Nullable<Module>>;
    moduleList(showInactive?: Nullable<boolean>): Nullable<Nullable<Module>[]> | Promise<Nullable<Nullable<Module>[]>>;
    userType(id: string): Nullable<UserType> | Promise<Nullable<UserType>>;
    userTypeList(showInactive?: Nullable<boolean>): Nullable<Nullable<UserType>[]> | Promise<Nullable<Nullable<UserType>[]>>;
}

export interface IMutation {
    registerModule(description: string): Nullable<Module> | Promise<Nullable<Module>>;
    updateModuleDescription(id: string, description: string): Nullable<Module> | Promise<Nullable<Module>>;
    updateModuleStatus(id: string, isActive: boolean): Nullable<Module> | Promise<Nullable<Module>>;
    removeModule(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    registerUserType(description: string): Nullable<UserType> | Promise<Nullable<UserType>>;
    updateUserTypeDescription(id: string, description?: Nullable<string>): Nullable<UserType> | Promise<Nullable<UserType>>;
    updateUserTypeIsActive(id: string, isActive?: Nullable<boolean>): Nullable<UserType> | Promise<Nullable<UserType>>;
    removeUserType(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export interface Module {
    id: string;
    description?: Nullable<string>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    isActive?: Nullable<boolean>;
    isExcluded?: Nullable<boolean>;
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
