export type Role = "user" | "admin"

export interface User {

    id: number;
    name: string;
    email: string;
    role: string;
}

export interface Category {

    id: number;
    name: string;
    descripcion?: string;
}


export interface Product {

    id: number;
    name: string;
    descripcion?: string;
    price: number;
    stock: number;
    imageUrl?: string[];
    category: Category;
    categoryId: number;
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}

export interface PaginatedResponse<T> {

    data: T[];
    total: number,
    page: number;
    limit: number;
    totalpages: number;
}

export interface ProductQueryParams {
    search?: string;
    categoryId?: number;
    page?: number;
    limit?: number;
}



export type ApiErrorType = "forbidden" | "validation" | "unauthorized" | "internal server error" | "network" | "conflict" | "not_found" | "unknown";

export class ApiError extends Error {
    type: ApiErrorType;
    status?: number;
    details?: unknown;

    constructor(message: string, type: ApiErrorType, status?: number, details?: unknown) {
        super(message);
        this.name = "ApiErrorType",
            this.type = type,
            this.status = status,
            this.details = details
    }
}