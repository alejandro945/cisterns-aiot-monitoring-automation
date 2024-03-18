'use client'
import React from 'react'
import { SignIn } from './SignIn'
import SignUp from './SignUp'

const AuthWrapper = () => {
    const [isSignIn, setIsSignIn] = React.useState<boolean>(true)
    return (
        <div>
            {/* Local Strategy */}
            {isSignIn ? <SignIn /> : <SignUp />}
            {/* External Strategy */}
            
        </div>
    )
}

export default AuthWrapper