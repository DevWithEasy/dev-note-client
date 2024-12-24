'use client'
import useUserStore from '@/store/userStore'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
    const { user } = useUserStore()
  return (
    <div
        className="h-12 p-2 flex justify-between border-b"
      >
        <div
          className="flex items-center"
        >
          {/* <Image
            src="/image/docs.png"
            alt="doc"
            height={20}
            width={20}
          /> */}
          <span className="font-bold text-xl">Dev-Note</span>
        </div>
        <div>
          {
            user?._id ?
              <Link href={`/user/${user._id}`}>
                <Image
                  src="/image/user.png"
                  alt="user"
                  height={30}
                  width={30}
                />
              </Link> :
              <Link href='/user/signin'>
                <p>Login</p>
              </Link>
          }
        </div>
      </div>
  )
}
