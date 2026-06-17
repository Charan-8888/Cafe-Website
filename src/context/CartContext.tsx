import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartContext } from './CartContextValue';
import type { CartItem, MenuItem, PropsWithChildren } from '../types';

const STORAGE_KEY = 'aura-cafe-cart';

const readStoredCartItems = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.reduce<CartItem[]>((items, storedItem: Partial<CartItem> & { basePrice?: number }) => {
      if (!storedItem?.id) return items;

      const cleanItem = {
        ...storedItem,
        price: storedItem.basePrice || storedItem.price,
        quantity: storedItem.quantity || 1,
      } as CartItem & { basePrice?: number; cartId?: string; selectedOptions?: unknown; selectedOptionDetails?: unknown };
      delete cleanItem.basePrice;
      delete cleanItem.cartId;
      delete cleanItem.selectedOptions;
      delete cleanItem.selectedOptionDetails;

      const existingItem = items.find((item) => item.id === cleanItem.id);
      if (!existingItem) return [...items, cleanItem];

      return items.map((item) =>
        item.id === cleanItem.id ? { ...item, quantity: item.quantity + cleanItem.quantity } : item,
      );
    }, []);
  } catch {
    return [];
  }
};

const addOrIncrementItem = (items: CartItem[], item: MenuItem | CartItem): CartItem[] => {
  const itemExists = items.some((cartItem) => cartItem.id === item.id);

  if (!itemExists) return [...items, { ...item, quantity: 1 }];

  return items.map((cartItem) =>
    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
  );
};

const sumCartQuantities = (items: CartItem[]) => items.reduce((total, item) => total + item.quantity, 0);

const sumCartPrices = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>(readStoredCartItems);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [items]);

  const addToCart = useCallback((item: MenuItem | CartItem) => {
    setItems((current) => addOrIncrementItem(current, item));
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    setItems((current) => current.filter((item) => item.id !== cartItemId));
  }, []);

  const decrementCartItem = useCallback((cartItemId: string) => {
    setItems((current) =>
      current.flatMap((item) => {
        if (item.id !== cartItemId) return [item];
        if (item.quantity <= 1) return [];
        return [{ ...item, quantity: item.quantity - 1 }];
      }),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(() => sumCartQuantities(items), [items]);

  const cartTotal = useMemo(() => sumCartPrices(items), [items]);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      cartTotal,
      addToCart,
      removeFromCart,
      decrementCartItem,
      clearCart,
    }),
    [addToCart, cartTotal, clearCart, decrementCartItem, itemCount, items, removeFromCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
