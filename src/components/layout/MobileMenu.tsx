"use client";

import Link from "next/link";
import { HiXMark } from "react-icons/hi2";
import HomeLink from "@/components/ui/HomeLink";
import { withBasePath } from "@/lib/basePath";
import { getCategories } from "@/data/products";
import { CategoryIcon } from "@/lib/categoryIcons";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const categories = getCategories();

  if (!open) return null;

  return (
    <>
      <div
        className='fixed inset-0 bg-foreground/30 z-50 lg:hidden'
        onClick={onClose}
      />
      <aside className='fixed top-0 left-0 bottom-0 w-72 bg-off-white z-50 lg:hidden shadow-xl animate-in slide-in-from-left duration-300'>
        <div className='flex items-center justify-between p-5 border-b border-pista/20'>
          <HomeLink onNavigate={onClose} className='inline-flex'>
            <img
              src={withBasePath("/logo.png")}
              alt='logo'
              width={200}
              height={56}
              className='h-19 w-auto sm:h-21'
            />
          </HomeLink>
          <button
            onClick={onClose}
            className='p-2 rounded-full hover:bg-pista/10'
            aria-label='Close menu'>
            <HiXMark className='w-5 h-5' />
          </button>
        </div>
        <nav className='p-5 space-y-1'>
          <HomeLink
            onNavigate={onClose}
            className='block px-4 py-3 rounded-xl hover:bg-pista/10 font-medium transition-colors'>
            Home
          </HomeLink>
          <Link
            href='/shop'
            onClick={onClose}
            className='block px-4 py-3 rounded-xl hover:bg-pista/10 font-medium transition-colors'>
            Shop All
          </Link>
          <p className='px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted'>
            Categories
          </p>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              onClick={onClose}
              className='flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-pista/10 transition-colors'>
              <CategoryIcon
                category={cat.slug}
                className='w-5 h-5 text-pista-dark shrink-0'
              />
              <span className='text-sm font-medium'>{cat.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
