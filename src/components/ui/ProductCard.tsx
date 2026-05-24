"use client";

import { useRef } from "react";
import AppImage from "@/components/ui/AppImage";
import { HiStar, HiShoppingBag, HiHeart } from "react-icons/hi2";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { formatPrice, tagLabels } from "@/lib/utils";
import gsap from "gsap";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -6,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <article
      ref={cardRef}
      className="group relative bg-off-white rounded-2xl overflow-hidden border border-pista/10 hover:border-pista/30 hover:shadow-lg hover:shadow-pista/10 transition-shadow duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative aspect-square overflow-hidden bg-cream">
        <AppImage
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {product.tags.length > 0 && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-lime text-foreground text-xs font-semibold rounded-full">
            {tagLabels[product.tags[0]]}
          </span>
        )}

        {discount && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-pista text-off-white text-xs font-semibold rounded-full">
            -{discount}%
          </span>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
            <span className="px-4 py-2 bg-off-white rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}

        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="w-9 h-9 rounded-full bg-off-white/90 backdrop-blur flex items-center justify-center hover:bg-lime transition-colors shadow-sm"
            aria-label="Add to wishlist"
          >
            <HiHeart className="w-4 h-4" />
          </button>
          {product.inStock && (
            <button
              onClick={() => addToCart(product)}
              className="w-9 h-9 rounded-full bg-lime flex items-center justify-center hover:bg-lime-dark transition-colors shadow-sm"
              aria-label="Add to cart"
            >
              <HiShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-muted uppercase tracking-wider mb-1">
          {product.category.replace("-", " ")}
        </p>
        <h3 className="font-medium text-sm leading-snug line-clamp-2 mb-2 group-hover:text-pista-dark transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <HiStar
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(product.rating)
                  ? "fill-lime text-lime"
                  : "text-pista/30"
              }`}
            />
          ))}
          <span className="text-xs text-muted ml-1">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-pista-dark">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {product.colors && (
          <div className="flex gap-1.5 mt-3">
            {product.colors.map((color) => (
              <span
                key={color}
                className="w-4 h-4 rounded-full border border-pista/20"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
