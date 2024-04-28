'use client'
import React from 'react'
import { SignIn } from '../server/SignIn'
import SignUp from '../server/SignUp'

const AuthForm = () => {
    const [isSignIn, setIsSignIn] = React.useState<boolean>(true)
    return (
        <div>
            {/* Local Strategy */}
            {isSignIn ? <SignIn /> : <SignUp />}
            {/* External Strategy */}
            
            {/* Change of form*/}
            <div className="flex justify-center mt-4">
                <button
                    className="text-sm text-muted-foreground hover:text-white"
                    onClick={() => setIsSignIn(!isSignIn)}
                >
                    {isSignIn ? 'Create an account' : 'Sign in'}
                </button>
            </div>
        </div>
    )
}

export default AuthForm