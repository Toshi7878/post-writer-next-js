"use client";
import { NavItem } from "@/types";
import Link from "next/link";
import { ReactNode, useState } from "react";
import MobileNav from "./MobileNav";

interface MainNavProps {
  items: NavItem[];
}

export default function MainNav({ items }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <div className="flex items-center md:gap-10">
      <span>
        <Link href={"/"} className="hidden md:flex items-center space-x-2">
          Post Writer
        </Link>
      </span>
      <nav className="md:flex gap-6 hidden">
        {items?.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.href}
              className="text-lg sm:text-sm font-medium hover:text-foreground/80"
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
      <button
        className="md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <span>メニュー</span>
      </button>
      {showMobileMenu && <MobileNav items={items} />}
    </div>
  );
}
