import { useState } from 'react'
import axios from 'axios'
import { getAPIRequest } from '@/utils/getAPI'
import useUserStore from '@/store/userStore'
import { toast } from 'sonner'
import { useRouter } from 'next/router'

export default function Signin() {
  const router = useRouter()
  const {loged} = useUserStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(getAPIRequest('/user/signin'), { email, password })
      localStorage.setItem('dev-note-token', data.token)
      loged(data.data)
      toast.success('Login success')
      router.push(`/user/${data.data._id}`)
    } catch (error) {
      console.log('Login error:', error)

    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}