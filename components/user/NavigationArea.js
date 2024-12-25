import useBookStore from '@/store/bookStore'
import icons from '@/utils/icons'
import Image from 'next/image'
import React, { useState } from 'react'
import CreateBookDailog from '../book/CreateBookDailog'
import useUserStore from '@/store/userStore'
import { ChevronRight, LogOut, Settings, Star } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function NavigationArea({ selectBook, getBookNotes, getDocCollection }) {
  const { user } = useUserStore()
  const { books } = useBookStore()
  const [view, setView] = useState(false)
  return (
    <div
      className='h-screen w-full flex flex-col p-2 space-y-2'
    >
      <div
        className='h-24 flex flex-col items-center border-b text-sm'
      >
        <Image
          src='/image/user.png'
          alt='book'
          height={16}
          width={40}
          className='mb-2'
        />
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
      <div
        className='h-[calc(100%-136px)] overflow-y-auto space-y-2 flex-1'
      >
        <CreateBookDailog />
        <div
          className='flex flex-col space-y-2'
        >
          <div
            className={`flex items-center space-x-2 border px-2 py-1.5 text-sm rounded-md cursor-pointer hover:bg-gray-50 ${!selectBook._id ? 'bg-gray-50' : ''}`}
          >
            <ChevronRight onClick={() => setView(!view)} className='px-1 text-gray-600' />
            <div
              className={`w-full flex items-center space-x-2 `}
              onClick={() => getDocCollection(user._id)}
            >
              <Image
                src='/image/user.png'
                alt='book'
                height={16}
                width={16}
              />
              <p className='truncate'>My Notes</p>
            </div>
          </div>
          {
            view &&
            <div
              className='pl-4 flex flex-col space-y-1'
            >
              {
                books.length > 0 && books.map((book) => (
                  <div
                    key={book._id}
                    className={`flex items-center space-x-2 border p-2 text-sm rounded-md cursor-pointer hover:bg-gray-50 ${book._id === selectBook._id ? 'bg-gray-50' : ''}`}
                    onClick={() => getBookNotes(book)}
                  >
                    <Image
                      src={icons[book.icon]}
                      alt={book.icon}
                      height={20}
                      width={20}
                    />
                    <p className='truncate'>{book.name}</p>
                  </div>
                ))
              }
            </div>
          }
        </div>
        <div
          className='flex flex-col text-sm space-y-2'
        >
          <Link
            href={`/user/${user._id}/favorite`}
          >
            <p
              className='flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50'
            >
              <Star size={16}/>
              <span>Favorite</span>
            </p>
          </Link>
          <Link
            href={`/user/${user._id}/settings`}
          >
            <p
              className='flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50'
            >
              <Settings size={16}/>
              <span>Setting</span>
            </p>
          </Link>
        </div>
      </div>
      <div
        className='h-10'
      >
          <Button>
            <LogOut />
            <span>Logout</span>
          </Button>
      </div>
    </div>
  )
}
