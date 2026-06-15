import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts } from '../data/mockData';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  description: string;
  specs: Record<string, string>;
  isNew?: boolean;
  featured?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  
  // Product actions
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  
  // Getters
  cartTotal: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      cart: [],
      wishlist: [],
      
      addProduct: (product) => {
        set((state) => ({ products: [...state.products, product] }));
      },
      updateProduct: (id, updatedFields) => {
        set((state) => ({
          products: state.products.map(p => p.id === id ? { ...p, ...updatedFields } : p)
        }));
      },
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter(p => p.id !== id),
          cart: state.cart.filter(item => item.id !== id),
          wishlist: state.wishlist.filter(wId => wId !== id)
        }));
      },

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity }] };
        });
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        }));
      },
      cartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'falcontech-storage',
    }
  )
);
