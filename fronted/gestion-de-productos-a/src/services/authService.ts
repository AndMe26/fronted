import { request } from "./api.ts";
import type {  AuthResponse , User } from "../interfaces/types.ts";


export interface LoginDto {
    email: string;
    password: string;
} 

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}   

export const AuthService = {
    login: (dto: LoginDto) => request<AuthResponse>("post", "/auth/login", dto),
    register: (dto: RegisterDto) => request<AuthResponse>("post", "/auth/register", dto),
    logout: () => request<void>("post", "/auth/logout"),
    getme: () => request<User>("get", "/users/me"),
};

