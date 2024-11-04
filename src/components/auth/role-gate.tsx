"use client";

import { Role } from "@/next-auth";

import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: Role;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (!role || role !== allowedRole) {
    return <FormError message="You are not authorized to view this page" />;
  }

  return <>{children}</>;
};
