import useBookStore from '@/store/bookStore'
import icons from '@/utils/icons'
import Image from 'next/image'
import React from 'react'
import CreateBookDailog from '../book/CreateBookDailog'
import useUserStore from '@/store/userStore'

export default function NavigationArea({selectBook,getBookNotes,getDocCollection}) {
    const { user } = useUserStore()
    const { books } = useBookStore()
  return (
    <div
        className='h-screen w-4/12 md:w-2/12 p-2 space-y-2 border-r'
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
              className={`flex items-center space-x-2 border p-2 text-sm rounded-md cursor-pointer hover:bg-gray-50 ${!selectBook._id ? 'bg-gray-50' : ''}`}
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
            <div
              className='pl-2'
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
            
          </div>
        </div>
      </div>
  )
}
