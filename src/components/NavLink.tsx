"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  activeClassName?: string;
}

export const NavLink = ({ className, activeClassName, href, ...props }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname === props.as;

  return (
    <Link
      href={href}
      className={cn(className, isActive && activeClassName)}
      {...props}
    />
  );
};

NavLink.displayName = "NavLink";
