import { AUTH_PAGE } from '@/presentation/constants/auth.constants'
import Image from 'next/image'

const LeftPanel = () => {
    return (
        < div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r" >
            {/* Left BG Color */}
            < div className="absolute inset-0 bg-zinc-900" />

            {/* Organization Logo */}
            < div className="relative z-20 flex items-center text-lg font-medium" >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-6 w-6"
                >
                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                {AUTH_PAGE.left.organization}
            </div >

            {/* Organization Image */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
            <Image src={AUTH_PAGE.left.image} alt={AUTH_PAGE.left.alt} width={700} height={700} priority />
            </div>

            {/* Quote Section */}
            < div className="relative z-20 mt-auto" >
                <blockquote className="space-y-2">
                    <p className="text-lg">
                        &ldquo;{AUTH_PAGE.left.quote}&rdquo;
                    </p>
                    <footer className="text-sm">{AUTH_PAGE.left.quoteName}</footer>
                </blockquote>
            </div >

        </div >
    )
}

export default LeftPanel