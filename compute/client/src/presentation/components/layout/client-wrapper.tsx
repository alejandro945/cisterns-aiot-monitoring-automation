"use client"

import { logoutUser } from "@/application/actions/client/user-actions";

interface WrapperProps {
    children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
    return <div onClick={logoutUser}>{children}</div>; 
}
