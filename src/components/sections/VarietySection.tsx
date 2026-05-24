"use client";

import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { HiArrowRight } from "react-icons/hi2";
import { getCategories, getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { useGsapFadeIn } from "@/hooks/useGsapAnimation";

const varietyMeta: Record<
  string,
  { title: string; description: string; reverse?: boolean }
> = {
  skincare: {
    title: "Skincare Essentials",
    description: "Complete sets and daily skincare rituals.",
  },
  serums: {
    title: "Serums & Treatments",
    description: "Concentrated formulas for visible results.",
    reverse: true,
  },
  moisturizers: {
    title: "Moisturizers",
    description: "Deep hydration for every skin type.",
  },
  "sun-protection": {
    title: "Sun Protection",
    description: "SPF essentials to protect your glow.",
    reverse: true,
  },
  lips: {
    title: "Lip Color",
    description: "Bold lipsticks in matte and satin finishes.",
  },
  complexion: {
    title: "Complexion",
    description: "Foundation, tint and powder for flawless skin.",
    reverse: true,
  },
  eyes: {
    title: "Eye Makeup",
    description: "Palettes and shadows for every look.",
  },
  haircare: {
    title: "Haircare",
    description: "Shampoos, masks and growth serums.",
    reverse: true,
  },
  "body-care": {
    title: "Body Care",
    description: "Nourish your skin from head to toe.",
  },
  fragrance: {
    title: "Fragrance",
    description: "Luxurious scents for every moment.",
    reverse: true,
  },
  tools: {
    title: "Beauty Tools",
    description: "Brushes and rollers for pro results.",
  },
  "masks-treatments": {
    title: "Masks & Treatments",
    description: "Intensive care for skin and hair.",
    reverse: true,
  },
};

function VarietyBlock({
  slug,
  title,
  description,
  image,
  reverse,
}: {
  slug: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}) {
  const categoryProducts = getProductsByCategory(slug);
  const displayProducts = categoryProducts.slice(0, 4);
  const ref = useGsapFadeIn(".variety-item", { stagger: 0.08 });

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
            reverse ? "lg:[direction:rtl]" : ""
          }`}
        >
          <div className={`relative ${reverse ? "lg:[direction:ltr]" : ""}`}>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <AppImage
                src={image}
                alt={title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-off-white mb-2">
                  {title}
                </h3>
                <p className="text-off-white/85 text-sm sm:text-base">
                  {description}
                </p>
              </div>
            </div>
          </div>

          <div className={reverse ? "lg:[direction:ltr]" : ""}>
            <div ref={ref} className="grid grid-cols-2 gap-3 sm:gap-4">
              {displayProducts.map((product, index) => (
                <div key={product.id} className="variety-item">
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </div>
            <Link
              href={`/shop?category=${slug}`}
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-pista-dark hover:text-pista transition-colors"
            >
              Shop {title.split(" ")[0]}
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function VarietySection() {
  const categories = getCategories();

  return (
    <div className="bg-off-white">
      {categories.map((cat) => {
        const meta = varietyMeta[cat.slug];
        if (!meta || !cat.coverImage) return null;
        return (
          <VarietyBlock
            key={cat.slug}
            slug={cat.slug}
            title={meta.title}
            description={meta.description}
            image={cat.coverImage}
            reverse={meta.reverse}
          />
        );
      })}
    </div>
  );
}
