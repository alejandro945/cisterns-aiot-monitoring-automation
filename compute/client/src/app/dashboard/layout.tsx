import { MenuOptions } from "@/presentation/components/layout/main-nav"
import { UserNav } from "@/presentation/components/layout/user-nav"
import { Input } from "@/presentation/components/ui/input"
import { METADATA } from "@/presentation/constants/metadata.constants"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = METADATA.dashboard

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex w-full justify-center">
            {/* Main Dash Layout */}
            <div className="flex flex-col w-full lg:max-w-screen-2xl">
                {/* Main Nav */}
                <div className="border-b">
                    <div className="flex h-16 px-4">
                        <MenuOptions className="mx-8 sm:mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            <Input type="search" placeholder="Buscar..." className="hidden sm:w-[100px] lg:w-[300px]" />
                            <UserNav />
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </section>
    )
}