'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'

const SubmitButton: React.FC<{ text: string }> = ({ text }) => {
  const {pending} = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {text}
    </Button>
  )
}

export default SubmitButton