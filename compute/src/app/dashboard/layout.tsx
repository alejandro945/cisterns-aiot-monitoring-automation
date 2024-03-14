import { MainNav } from "@/components/layout/main-nav"
import CisternsSelect from "@/components/layout/select"
import { UserNav } from "@/components/layout/user-nav"
import { Input } from "@/components/ui/input"
import { METADATA } from "@/constants/metadata.constants"
import { Metadata } from "next"
import React from "react"


export const metadata: Metadata = METADATA.dashboard

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            {/* Main Nav */}
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <CisternsSelect />
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            <Input
                                type="search"
                                placeholder="Buscar..."
                                className="md:w-[100px] lg:w-[300px]"
                            />
                            <UserNav />
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </section>
    )
}