import * as express from "express";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserProfile {
    id: string;
    username: string;
    email: string;
}

export interface ICreateProfileRequest extends express.Request {
    username: any,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: string,
}

export interface IUserIdRequest extends express.Request {
    userId: number
}

export interface IUpdateProfileRequest extends express.Request {
    userId: number,
    username: any,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: string,
}