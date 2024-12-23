import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getAPIRequest } from '@/utils/getAPI'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function Signup() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(getAPIRequest('/user/signup'), { name,email, password })
      router.push('/user/signin')
    } catch (error) {
      console.log('signup error:', error)

    }
  }

  return (
    <div
      className='h-screen flex justify-center items-center'
    >
      <div
        className='md:w-4/12 p-4 space-y-2 border rounded-lg shadow-md'
      >
        <form onSubmit={handleSubmit}
          className='space-y-2'
        >
          <h1>Sign Up</h1>
          <div
            className='flex flex-col'
          >
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div
            className='flex flex-col'
          >
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
        <div>
          Create an account? <Link href='/user/signin'>
                <b className='text-blue-500'>Signin</b>
          </Link>
        </div>
      </div>
    </div>
  )
}