
import { Button } from '@/presentation/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'
import { AUTH_PAGE } from '@/presentation/constants/auth.constants'
import React from 'react'
import Providers from './Providers'
import { useFormState } from 'react-dom'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { createUser } from '@/application/actions/server/user-actions'

const SignUp: React.FC<{ handleChangePanel: () => void }> = ({ handleChangePanel }) => {
  const [state, dispatch, isPending] = useFormState(createUser, undefined);
  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">{AUTH_PAGE.right.signUp.title}</CardTitle>
        <CardDescription>
          {AUTH_PAGE.right.signUp.subtitle}
        </CardDescription>
      </CardHeader>
      <form action={dispatch} className='space-y-6'>
        <CardContent className="grid gap-4">
          <Providers />
          <div className="grid gap-2">
            <Label htmlFor="name">{AUTH_PAGE.right.signUp.form.name}</Label>
            <Input id="name" name="name" type="text" placeholder="Carlos" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{AUTH_PAGE.right.signUp.form.email}</Label>
            <Input id="email" name="email" type="email" placeholder="a@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{AUTH_PAGE.right.signUp.form.password}</Label>
            <Input id="password" name="password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">{AUTH_PAGE.right.signUp.form.confirmPassword}</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" />
          </div>
          {(state as any)?.errors && (
            <div className="grid grid-cols-2 gap-6">
              {
                Object.values((state as any)?.errors)?.map((error: any) => (
                  <div className='flex gap-2'>
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">
                      {error?.[0]}
                    </p>
                  </div>
                ))
              }
            </div>
          )}
        </CardContent>
        <CardFooter className="gap-6">
          <Button className="w-full" variant='secondary' onClick={handleChangePanel}>{AUTH_PAGE.right.signUp.form.alreadyHaveAccount}</Button>
          <Button type='submit' className="w-full" disabled={isPending}>{AUTH_PAGE.right.signUp.form.localButton}</Button>
        </CardFooter>
      </form>

    </Card >
  )
}

export default SignUp