import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";

import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  const content = [
    {
      title: "ID",
      value: user?.id,
    },
    {
      title: "Name",
      value: user?.name,
    },
    {
      title: "Email",
      value: user?.email,
    },
    {
      title: "Role",
      value: user?.role,
    },
    {
      title: "Two Factor Authentication",
      value: user?.isTwoFactorEnabled ? "ON" : "OFF",
      isBadge: true,
      variant: (user?.isTwoFactorEnabled ? "success" : "destructive") as
        | "success"
        | "destructive"
    },
  ];
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold">{label}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {content.map(({ title, value, isBadge = false, variant = null }) => (
          <div
            key={title}
            className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
          >
            <p className="text-sm font-medium">{title}</p>
            {isBadge ? (
              <Badge variant={variant}>{value}</Badge>
            ) : (
              <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                {value}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
