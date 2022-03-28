import { Dispatch } from "react";

export interface IAppContext {
    data: IReducerData,
    dispatch: Dispatch<IAction>,
    localStorageUser: IUser | null
}

export interface IUser {
    email: string;
    password: string;
    token: string;
}

export interface IReducerData {
    user: IUser | null;
    isLoading: boolean;
}

//reducer

export enum ActionsTypes {
    AUTH = "AUTH",
    LOGOUT = "LOGOUT",
    LOADING = "LOADING"
} 

export interface IAction {
    type: ActionsTypes,
    payload: IUser | boolean | null
}

