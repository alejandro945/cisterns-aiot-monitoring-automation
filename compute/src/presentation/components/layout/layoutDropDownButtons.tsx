"use client"
import { signOut } from "next-auth/react"


interface WrapperProps {
    children: React.ReactNode;
}

const logoutHandler = async () => {
console.log('logout')
try{
    await signOut({redirect: true, callbackUrl: '/'})
}catch(error){
    console.error("Error al cerrar sesión:", error);
}

}
  
  
export function Wrapper({ children }: WrapperProps) {
return <div onClick={logoutHandler}>{children}</div>; // Asociamos onClick al evento onClick del div
}
  