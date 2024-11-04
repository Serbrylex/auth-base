"use client";

import { Button } from "../ui/button";

import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => (
  <Button
    variant="link"
    className="font-normal w-full"
    size="sm"
    asChild
  >
    <Link href={href}>{label}</Link>
  </Button>
);
