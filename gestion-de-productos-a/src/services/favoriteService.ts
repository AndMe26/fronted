import { request } from "./api";
import type { Product } from "../interfaces/types";


// se encarga de manejar los favoritos del usuario 
//los void junto con los request son para que no retorne nada, solo haga la accion de agregar o eliminar
export const FavoriteService = {
    getMyFavorites: () => request<Product[]>("get", "/favorites"),
    add: (productId: number) => request<void>("post", "/favorites", { productId }),
    remove: (productId: number) => request<void>("delete", `/favorites/${productId}`),
}