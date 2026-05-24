"use client";

import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { HiArrowUpRight } from "react-icons/hi2";
import { CategoryInfo } from "@/types/product";
import { CategoryIcon } from "@/lib/categoryIcons";

interface CategoryCardProps {
  category: CategoryInfo;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative block aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-pista/10 hover:border-pista/30 hover:shadow-xl hover:shadow-pista/15 transition-all duration-300"
    >
      {category.coverImage ? (
        <AppImage
          src={category.coverImage}
          alt={category.name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-pista-light to-lime/40" />
      )}

      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 lg:p-5">
        <CategoryIcon
          category={category.slug}
          className="w-6 h-6 sm:w-7 sm:h-7 mb-1.5 text-off-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] shrink-0"
        />
        <h3 className="font-display w-full text-lg sm:text-xl lg:text-2xl xl:text-[1.35rem] 2xl:text-2xl font-bold text-off-white leading-snug text-balance break-words drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] group-hover:text-lime transition-colors duration-300">
          {category.name}
        </h3>

        <HiArrowUpRight className="absolute top-4 right-4 w-6 h-6 text-off-white opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]" />
      </div>
    </Link>
  );
}
