import NextAuth from 'next-auth';
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions:AuthOptions = ({
    providers: [
        CredentialsProvider({
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            try{
              if (typeof credentials !== "undefined"){

                const res: any = await fetch("http://localhost:3000/api/auth", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username: credentials?.username,
                  password: credentials?.password
                }),

                });

                if (res.ok) {
                  return {...res.user, token: res.token}
                } else return null

              }else return null
              
              
              // If no error and we have user data, return it
              

            }catch(error){
              console.error("Error de Autenticación: ", error)
            }
            
          }
        })
      ],

      session:{
        strategy: 'jwt'
      },

      jwt:{
        maxAge: 5 * 60 * 60, 
      },

      pages:{
        signIn: '/',
        signOut: '/',
      },

      callbacks:{
        async session({session,token,user}){
          const sanitizedToken = Object.keys(token).reduce((p,c)=>{
            if (
              c !== "iat" &&
              c !== "exp" &&
              c !== "jti" &&
              c !== "token"
            ){
              return { ...p, [c]: token[c] }
            } else{
              return p
            }
          },{})
          return { ...session, user: sanitizedToken, token: token.token }
        },
        
        async jwt ({ token, user, account, profile }) {
          if (typeof user !== "undefined") {
            // user has just signed in so the user object is populated
            return token
          }
          return token
        }
      }
})

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
