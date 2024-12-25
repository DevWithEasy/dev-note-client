import useBookStore from '@/store/bookStore'
import { FilePenLine, Loader, Rows3 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import NoteAction from '../note/NoteAction'
import icons from '@/utils/icons'
import UpdateBook from '../book/UpdateBook'

export default function ContentArea({loading,selectBook,setSelectBook,children}) {
    const [mode, setMode] = useState('edit')
    const { notes} = useBookStore()
  return (
    <div
        className='h-screen w-full md:w-10/12 p-2 space-y-2'
      >
        <div
          className='h-10 flex justify-between items-center border-b'
        >
          <div
            className='flex space-x-2'
          >
            {children}
            {
              !selectBook._id ?
                <h1>My Notes</h1>
                :
                <UpdateBook book={selectBook} setBook={setSelectBook}/>
            }
          </div>
          <div
            className='flex border'
          >
            <button
              onClick={() => setMode('view')}
              className={`p-1 ${mode === 'view' ? 'bg-blue-50 text-blue-500' : ''}`}
            >
              <Rows3 size={20} />
            </button>
            <button
              onClick={() => setMode('edit')}
              className={`p-1 ${mode === 'edit' ? 'bg-blue-50 text-blue-500' : ''}`}
            >
              <FilePenLine size={20} />
            </button>
          </div>
        </div>
        <div
          className='h-[calc(100%-40px)] overflow-y-auto'
        >
          {
            loading ?
              <div
                className='p-6 flex flex-col justify-center items-center space-y-3'
              >
                <Loader className='animate-spin' />
                <p>Loading...</p>
              </div>
              :
              <div
                className='grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4'
              >
                {
                  notes.length > 0 && notes.map((note) => (
                    <div
  key={note._id}
  className='flex border p-2 text-sm rounded-md justify-between'
>
  <Link
    href={`/note/${mode}/${note._id}`}
    target='_blank'
    className='flex items-center space-x-2 flex-grow'
  >
    <Image
      src={icons[note.icon]}
      alt={note.icon}
      height={20}
      width={20}
    />
    <p className='truncate max-w-xs'> {/* Added max-w-xs for width control */}
      {note.title}
    </p>
  </Link>
  <NoteAction note={note} />
</div>

                  ))
                }
              </div>
          }
        </div>
      </div>
  )
}
