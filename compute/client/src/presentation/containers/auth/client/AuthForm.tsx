'use client'
import React from 'react'
import { SignIn } from './SignIn'
import { SignUp } from '../server/SignUp'

const AuthForm = () => {
    const [isSignIn, setIsSignIn] = React.useState<boolean>(true)

    /**
     * Function to change the panel
     * @returns void
     */
    const handleChangePanel = () => {
        setIsSignIn(!isSignIn)
    }

    return (
        <div>
            {isSignIn ? <SignIn handleChangePanel={handleChangePanel} /> : <SignUp handleChangePanel={handleChangePanel} />}
        </div>
    )
}

export default AuthForm