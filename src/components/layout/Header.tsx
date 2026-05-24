"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeLink from "@/components/ui/HomeLink";
import { withBasePath } from "@/lib/basePath";
import {
  HiMagnifyingGlass,
  HiShoppingBag,
  HiBars3,
  HiXMark,
  HiHeart,
} from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import SearchBar from "@/components/ui/SearchBar";
import CartDrawer from "@/components/ui/CartDrawer";
import MobileMenu from "@/components/layout/MobileMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=skincare", label: "Skincare" },
  { href: "/shop?category=complexion", label: "Makeup" },
  { href: "/shop?category=fragrance", label: "Fragrance" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onHero = pathname === "/" && !scrolled;

  const iconBtnClass =
    onHero ?
      "p-2 rounded-full text-off-white hover:bg-off-white/15 transition-colors"
    : "p-2 rounded-full text-foreground hover:bg-pista/10 transition-colors";

  const navLinkClass =
    onHero ?
      "text-sm font-medium text-off-white/90 hover:text-lime transition-colors relative group"
    : "text-sm font-medium text-foreground/80 hover:text-pista-dark transition-colors relative group";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          onHero ?
            "bg-gradient-to-b from-foreground/70 via-foreground/30 to-transparent py-5"
          : "glass shadow-sm border-b border-pista/20 py-3"
        }`}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between gap-4'>
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden ${iconBtnClass}`}
              aria-label='Open menu'>
              <HiBars3 className='w-5 h-5' />
            </button>

            <HomeLink className='flex items-center shrink-0'>
              <img
                src={withBasePath("/logo.png")}
                alt='logo'
                width={200}
                height={100}
                className='h-19 w-auto sm:h-21'
              />
            </HomeLink>

            <nav className='hidden lg:flex items-center gap-8'>
              {navLinks.map((link) =>
                link.href === "/" ?
                  <HomeLink key={link.href} className={navLinkClass}>
                    {link.label}
                    <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-lime group-hover:w-full transition-all duration-300' />
                  </HomeLink>
                : <Link
                    key={link.href}
                    href={link.href}
                    className={navLinkClass}>
                    {link.label}
                    <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-lime group-hover:w-full transition-all duration-300' />
                  </Link>,
              )}
            </nav>

            <div className='flex items-center gap-2 sm:gap-3'>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={iconBtnClass}
                aria-label='Search'>
                <HiMagnifyingGlass className='w-5 h-5' />
              </button>
              <button
                className={`hidden sm:flex ${iconBtnClass}`}
                aria-label='Wishlist'>
                <HiHeart className='w-5 h-5' />
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className={`relative ${iconBtnClass}`}
                aria-label='Cart'>
                <HiShoppingBag className='w-5 h-5' />
                {totalItems > 0 && (
                  <span className='absolute -top-0.5 -right-0.5 w-5 h-5 bg-lime text-foreground text-xs font-bold rounded-full flex items-center justify-center'>
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className='absolute top-full left-0 right-0 p-4 glass border-b border-pista/20'>
            <div className='max-w-2xl mx-auto flex items-center gap-3'>
              <SearchBar autoFocus onClose={() => setSearchOpen(false)} />
              <button
                onClick={() => setSearchOpen(false)}
                className='p-2 rounded-full hover:bg-pista/10'
                aria-label='Close search'>
                <HiXMark className='w-5 h-5' />
              </button>
            </div>
          </div>
        )}
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer />
    </>
  );
}
