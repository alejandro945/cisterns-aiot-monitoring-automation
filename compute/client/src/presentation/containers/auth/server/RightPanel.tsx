import { AUTH_PAGE } from '@/presentation/constants/auth.constants'
import Link from 'next/link'
import AuthForm from '../client/AuthForm'

const RightPanel = () => {
    return (
        <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[100%]">

                {/* Auth Form */}
                <AuthForm />

                {/* Footer */}
                <p className="px-8 text-center text-sm text-muted-foreground">
                    {AUTH_PAGE.right.footerTitle}{" "}
                    <Link
                        href="#"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        {AUTH_PAGE.right.termsAndPolicies.split(" ")[0]}
                    </Link>{" "}
                    {AUTH_PAGE.right.termsAndPolicies.split(" ")[1]}{" "}
                    <Link
                        href="#"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        {AUTH_PAGE.right.termsAndPolicies.split(" ")[2]}
                    </Link>.
                </p>

            </div>
        </div>
    )
}

export default RightPanel