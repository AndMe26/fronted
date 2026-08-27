import { request } from "./api";
import type { Category } from "../interfaces/types";



export interface  CategoryDto {
    name: string;
    descripcion?: string;
}

export const CategoryService = {
    getAll: () => request<Category[]>("get", "/categories"),
    getById: (id: number) => request<Category>("get", `/categories/${id}`),
    create: (dto: CategoryDto) => request<Category>("post", "/categories", dto),
    update: (id: number, dto: Partial<CategoryDto>) => request<Category>("patch", `/categories/${id}`, dto),
    delete: (id: number) => request<void>("delete", `/categories/${id}`),


}