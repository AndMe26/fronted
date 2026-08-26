export type role = "user" | "admin"

export interface user {

    id: number;
    name: string;
    email: string;
    rol: string;
}

export interface category {

    id: number;
    name: string;
    descripcion?: string;
}


export interface product {

    id: number;
    name: string;
    descripcion?: string;
    price: number;
    stock: number;
    imageUrl?: string;
    category: category;
    categoryId: number;
}

export interface AuthRespose {
    accesToken: string;
    user: user;
}

export interface ResponsePageProduct<T> {

    data: T[];
    total: number,
    page: number;
    limit: number;
    totalpages: number;
}

export type ApiErrorType = "forbidden" | "validation " | "unauthorized" | "internal server error" | "network"| "conflict" | "not_found" | "unknown";

export class ApiError extends Error {
    type: ApiErrorType;
    status?: number;
    details?: unknown;

    constructor(message: string, type: ApiErrorType, status?: number, details?: unknown ){
        super(message);
        this.name = "ApiErrorType",
        this.type = type,
        this.status = status,
        this.details = details
    }
}