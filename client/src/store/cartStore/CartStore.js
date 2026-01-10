import { CartService } from "@/service/cart/CartService";
import { create } from "zustand";

export const CartStore = create((set, get) => ({
    cart: [],
    setCartFromServer: (count) =>
        set({
            cart: Array.from({ length: count }, () => ({ img: "" }))
        }),
    addToCart: (item) =>
        set((state) => ({
            cart: [...state.cart, item]
        })),
    removeCart: () => set((state) => ({

    })),
    createCart: async (productId, sku, quantity) => {
        const data = await CartService.createCart(productId, sku, quantity)
        return data
    },
    updateCart: async (sku, quantity) => {
        const data = await CartService.updateCart(sku, quantity)
        return data
    },
    deleteCart: async (sku) => {
        const data = await CartService.deleteCart(sku)
        return data
    }
}))