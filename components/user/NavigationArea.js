import useBookStore from '@/store/bookStore'
import icons from '@/utils/icons'
import Image from 'next/image'
import React, { useState } from 'react'
import CreateBookDailog from '../book/CreateBookDailog'
import useUserStore from '@/store/userStore'
import { ChevronRight } from 'lucide-react'

export default function NavigationArea({ selectBook, getBookNotes, getDocCollection }) {
  const { user } = useUserStore()
  const { books } = useBookStore()
  const [view, setView] = useState(false)
  return (
    <div
      className='h-screen w-full p-2 space-y-2'
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
        className='h-[calc(100%-96px)] overflow-y-auto space-y-2'
      >
        <CreateBookDailog />
        <div
          className='flex flex-col space-y-2'
        >
          <div
            className={`flex items-center space-x-2 border px-2 py-1.5 text-sm rounded-md cursor-pointer hover:bg-gray-50 ${!selectBook._id ? 'bg-gray-50' : ''}`}
          >
            <ChevronRight onClick={()=>setView(!view)} className='px-1 text-gray-600'/>
          <div
            className={`w-full flex items-center space-x-2 cursor-pointer hover:bg-gray-50 `}
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
              className='pl-4'
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
      </div>
    </div>
  )
}
