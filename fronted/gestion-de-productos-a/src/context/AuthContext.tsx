import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../interfaces/types";
import { AuthService, type LoginDto, type RegisterDto } from "../services/authService";

interface AuthContextValue {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (dto: LoginDto) => Promise<void>;
    register: (dto: RegisterDto) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");
        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser) as User);
            } catch {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (dto: LoginDto) => {
        const { accessToken, user: logged } = await AuthService.login(dto);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(logged));
        setUser(logged);
    };

    const register = async (dto: RegisterDto) => {
        const { accessToken, user: created } = await AuthService.register(dto);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(created));
        setUser(created);
    };

    const logout = async () => {
        try {
            await AuthService.logout();
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: user !== null,
                isAdmin: user?.role === "admin",
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}