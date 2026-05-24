"use client";

import { useEffect, useRef } from "react";
import AppImage from "@/components/ui/AppImage";
import { HiXMark, HiPlus, HiMinus, HiTrash, HiShoppingBag } from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import gsap from "gsap";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        drawerRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(drawerRef.current, {
      x: "100%",
      duration: 0.3,
      ease: "power3.in",
      onComplete: () => setIsOpen(false),
    });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-foreground/40 z-50"
        onClick={handleClose}
      />
      <aside
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-off-white z-50 shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between p-5 border-b border-pista/20">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2">
            <HiShoppingBag className="w-5 h-5" />
            Your Cart ({items.length})
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-pista/10 transition-colors"
            aria-label="Close cart"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <HiShoppingBag className="w-16 h-16 text-pista/30 mb-4" />
            <p className="text-muted font-medium">Your cart is empty</p>
            <p className="text-sm text-muted/70 mt-1">
              Add some beautiful products!
            </p>
            <button
              onClick={handleClose}
              className="mt-6 px-6 py-3 bg-lime text-foreground rounded-full font-semibold text-sm hover:bg-lime-dark transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-2xl bg-cream/50"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <AppImage
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">
                      {product.name}
                    </h3>
                    <p className="text-pista-dark font-semibold text-sm mt-1">
                      {formatPrice(product.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(product.id, quantity - 1)
                        }
                        className="w-7 h-7 rounded-full bg-off-white border border-pista/20 flex items-center justify-center hover:bg-pista/10"
                      >
                        <HiMinus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(product.id, quantity + 1)
                        }
                        className="w-7 h-7 rounded-full bg-off-white border border-pista/20 flex items-center justify-center hover:bg-pista/10"
                      >
                        <HiPlus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="ml-auto p-1.5 text-muted hover:text-red-500 transition-colors"
                      >
                        <HiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-pista/20 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal</span>
                <span className="font-display text-xl font-semibold">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <button className="w-full py-3.5 bg-lime text-foreground rounded-full font-semibold hover:bg-lime-dark transition-colors">
                Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full py-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

