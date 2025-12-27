import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;

  total: () => number;
  getSubtotal: () => number;
  getTax: (rate?: number) => number;
  getTotal: (rate?: number) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        }),

      removeItem: (id) =>
        set({
          items: get().items.filter((i) => i.id !== id),
        }),

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce<number>(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),

      getSubtotal: () =>
        get().items.reduce<number>(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),

      getTax: (rate = 0.12) => {
        const subtotal = get().getSubtotal();
        return subtotal * rate;
      },

      getTotal: (rate = 0.12) => {
        const subtotal = get().getSubtotal();
        return subtotal + subtotal * rate;
      },
    }),
    {
      name: "cart-storage", // localStorage
    }
  )
);

