"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToHero } from "@/lib/scrollToHero";
import { withBasePath } from "@/lib/basePath";

interface HomeLinkProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
  "aria-label"?: string;
}

export default function HomeLink({
  className,
  children,
  onNavigate,
  "aria-label": ariaLabel,
}: HomeLinkProps) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    if (pathname === "/") {
      e.preventDefault();
      scrollToHero();
      window.history.replaceState(null, "", withBasePath("/#hero"));
    }
  };

  return (
    <Link
      href="/#hero"
      scroll={false}
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
