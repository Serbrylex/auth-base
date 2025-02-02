"use client"

enum Role {
    ADMIN,
    USER,
}

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

import { admin } from "@/actions/admin";

const AdminPage = () => {

    const onApiRouteClick = async () => {
        const response = await fetch("/api/admin");
        if (response.ok) {
            toast.success("Allowed API Route");
        } else {
            toast.error("Not allowed API Route");
        }
    }

    const onServerActionClick = async () => {
        const response = await admin();
        if (response?.error) {
            toast.error(response.error);
        }

        if (response?.success) {
            toast.success("Allowed Server Action");
        }
    }

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">Admin</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={Role.ADMIN}>
                    <FormSuccess message="You are an admin" />
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin-only API Route
                    </p>
                    <Button onClick={onApiRouteClick}>
                        Click to test
                    </Button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin-only Server Action
                    </p>
                    <Button onClick={onServerActionClick}>
                        Click to test
                    </Button>
                </div>
            </CardContent>
        </Card>    
    )
}

export default AdminPage