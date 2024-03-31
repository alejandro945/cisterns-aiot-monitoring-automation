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
            
        </div>
    )
}

export default AuthForm