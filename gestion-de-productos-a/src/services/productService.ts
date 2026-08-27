import { request } from "./api";
import type { PaginatedResponse, Product, ProductQueryParams } from "../interfaces/types";


export interface ProductDto {
    name: string;
    descripcion?: string;
    price: number;
    stock: number;
    imageUrl?: string[];
    categoryId: number;
}

export const ProductService = {
    getAll: (params?: ProductQueryParams) => request<PaginatedResponse<Product>>("get", "/products", undefined, params as Record<string, unknown>),
    getById: (id: number) => request<Product>("get", `/products/${id}`),
    create: (dto: ProductDto) => request<Product>("post", "/products", dto),
    update: (id: number, dto: Partial<ProductDto>) => request<Product>("patch", `/products/${id}`, dto),
    delete: (id: number) => request<void>("delete", `/products/${id}`),

}