import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useCart from "./useCart";

const product = {
  id: 1,
  name: "Test Product",
  price: 10,
};

describe("useCart", () => {
  it("adds a product and calculates the cart total", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartCount).toBe(1);
    expect(result.current.cartTotal).toBe(10);
  });

  it("increments quantity when the same product is added again", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(product);
      result.current.addToCart(product);
    });

    expect(result.current.cartItems[0].quantity).toBe(2);
    expect(result.current.cartCount).toBe(2);
    expect(result.current.cartTotal).toBe(20);
  });

  it("removes a product when its quantity is reduced below one", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(product);
      result.current.updateQuantity(product.id, 0);
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.cartTotal).toBe(0);
  });

  it("clears all items", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(product);
      result.current.clearCart();
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.cartCount).toBe(0);
  });
});
