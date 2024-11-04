"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

const buttons = [
    { label: 'Server', href: '/server' },
    { label: 'Client', href: '/client' },
    { label: 'Admin', href: '/admin' },
    { label: 'Settings', href: '/settings' },
]

export const Navbar = () => {
    const pathname = usePathname();
  return (
    <div className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
        <div className="flex gap-x-2">
            {buttons.map(({ label, href }, idx) => (
                <Button asChild variant={pathname === href ? "default" : "outline"} key={idx}>
                    <Link href={href}>
                        {label}
                    </Link>
                </Button>
            ))}
        </div>
        <UserButton />
    </div>
  );
};
