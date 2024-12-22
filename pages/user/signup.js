import { getAPIRequest } from '@/utils/getAPI'
import axios from 'axios'
import React, { useState } from 'react'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(getAPIRequest('/user/signup'), { name,email, password })
      console.log('signup response:', data)
    } catch (error) {
      console.log('signup error:', error)

    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}