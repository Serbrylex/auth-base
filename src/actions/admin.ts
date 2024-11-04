"use server"

import { currentRole } from "@/lib/auth"

enum Role {
    ADMIN,
    USER,
}

export const admin = async () => {
    const role = await currentRole()

    if (role && Role[role] === "ADMIN") {
        return { success: "Allowed Server Action!" }
    }
    
    return { error: "Forbidden!" }
}