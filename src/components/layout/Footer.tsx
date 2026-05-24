"use client";

import Link from "next/link";
import HomeLink from "@/components/ui/HomeLink";
import { withBasePath } from "@/lib/basePath";

import {
  HiHeart,
  HiChatBubbleOvalLeft,
  HiPaperAirplane,
  HiEnvelope,
} from "react-icons/hi2";
import { categories } from "@/data/products";

export default function Footer() {
  return (
    <footer className='bg-foreground text-off-white mt-auto'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
          <div>
            <HomeLink className='inline-block mb-4'>
              <img
                src={withBasePath("/logo.png")}
                alt='logo'
                width={200}
                height={56}
                className='h-19 w-auto sm:h-21'
              />
            </HomeLink>
            <p className='text-off-white/70 text-sm leading-relaxed'>
              Premium Indian cosmetics crafted with Ayurvedic and botanical
              ingredients — made for Indian skin, delivered across Bharat.
            </p>
            <div className='flex gap-3 mt-5'>
              {[HiHeart, HiChatBubbleOvalLeft, HiPaperAirplane, HiEnvelope].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href='#'
                    className='w-9 h-9 rounded-full bg-off-white/10 flex items-center justify-center hover:bg-lime hover:text-foreground transition-colors'>
                    <Icon className='w-4 h-4' />
                  </a>
                ),
              )}
            </div>
          </div>

          <div>
            <h4 className='font-semibold mb-4 text-lime'>Shop</h4>
            <ul className='space-y-2.5'>
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className='text-sm text-off-white/70 hover:text-lime transition-colors'>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-4 text-lime'>Support</h4>
            <ul className='space-y-2.5 text-sm text-off-white/70'>
              <li>
                <a href='#' className='hover:text-lime transition-colors'>
                  Contact Us
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-lime transition-colors'>
                  Pan-India Delivery
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-lime transition-colors'>
                  COD Available
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-lime transition-colors'>
                  Returns
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-lime transition-colors'>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-4 text-lime'>Newsletter</h4>
            <p className='text-sm text-off-white/70 mb-3'>
              Get 15% off your first order.
            </p>
            <form className='flex gap-2' onSubmit={(e) => e.preventDefault()}>
              <input
                type='email'
                placeholder='Your email'
                className='flex-1 px-4 py-2.5 rounded-full bg-off-white/10 border border-off-white/20 text-sm placeholder:text-off-white/40 focus:outline-none focus:border-lime'
              />
              <button
                type='submit'
                className='px-5 py-2.5 bg-lime text-foreground rounded-full text-sm font-semibold hover:bg-lime-dark transition-colors shrink-0'>
                Join
              </button>
            </form>
          </div>
        </div>

        <div className='border-t border-off-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-off-white/50'>
          <p>&copy; 2026 GlowVerse. All rights reserved.</p>
          <div className='flex gap-4'>
            <a href='#' className='hover:text-lime transition-colors'>
              Privacy
            </a>
            <a href='#' className='hover:text-lime transition-colors'>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
