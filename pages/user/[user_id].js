import React, { useEffect, useState } from 'react'
import { TiDocumentAdd } from "react-icons/ti";
import axios from 'axios';
import { getAPIRequest } from '@/utils/getAPI';
import { useRouter } from 'next/router';
import Image from 'next/image';
import icons from '@/utils/icons';
import Link from 'next/link';
import CreateBookDailog from '@/components/book/CreateBookDailog';
import { FilePenLine, Rows3 } from 'lucide-react';
import useBookStore from '@/store/bookStore';
import NoteAction from '@/components/note/NoteAction';

export default function Profile() {
  const router = useRouter()
  const { user_id } = router.query
  const [mode, setMode] = useState('edit')
  const { books, notes, setCollection, addNote,addBookNotes } = useBookStore()
  const [selectBook, setSelectBook] = useState({})

  //get user document collection
  const getDocCollection = async (user_id) => {
    setSelectBook({})
    try {
      const { data } = await axios.get(getAPIRequest(`/user/${user_id}`), {
        headers: {
          authorization: `Bareer ${localStorage.getItem('dev-note-token')}`
        }
      })
      setCollection(data.data)
    } catch (error) {
      console.log('Create new document error:', error)
    }
  }

  const getBookNotes = async (book) => {
    setSelectBook(book)
    try {
      const { data } = await axios.get(getAPIRequest(`/book/notes/${book._id}`), {
        headers: {
          authorization: `Bareer ${localStorage.getItem('dev-note-token')}`
        }
      })
      addBookNotes(data.data)
    } catch (error) {
      console.log('Create new document error:', error)
    }
  }

  //create new document
  const createNewDocument = async () => {
    try {
      const { data } = await axios.post(getAPIRequest(`/note/create?is_book=${selectBook._id ? 'yes' : 'no'}&book=${selectBook._id}`), {}, {
        headers: {
          authorization: `Bareer ${localStorage.getItem('dev-note-token')}`
        }
      })
      console.log(data)
      // addNote(data.data)
      // window.open(`/note/edit/${data.data._id}`, '_blank')
    } catch (error) {
      console.log('Create new document error:', error)
    }
  }

  useEffect(() => {
    if (user_id) {
      getDocCollection(user_id)
    }
  }, [user_id])

  return (
    <div
      className='h-screen flex justify-between'
    >
      <div
        className='h-screen w-4/12 md:w-2/12 p-2 space-y-2 overflow-y-auto border-r'
      >
        <CreateBookDailog />
        <div
          className='flex flex-col space-y-2'
        >
          <div
                className={`flex items-center space-x-2 border p-2 rounded-md cursor-pointer hover:bg-gray-50 ${!selectBook._id ? 'bg-gray-50' : ''}`}
                onClick={() => getDocCollection(user_id)}
              >
                <Image
                  src={icons['note']}
                  alt='book'
                  height={16}
                  width={16}
                />
                <p className='truncate'>My Notes</p>
              </div>
          {
            books.length > 0 && books.map((book) => (
              <div
                key={book._id}
                className={`flex items-center space-x-2 border p-2 rounded-md cursor-pointer hover:bg-gray-50 ${book._id === selectBook._id ? 'bg-gray-50' : ''}`}
                onClick={() => getBookNotes(book)}
              >
                <Image
                  src={icons[book.icon]}
                  alt={book.icon}
                  height={16}
                  width={16}
                />
                <p className='truncate'>{book.name}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div
        className='h-screen w-8/12 md:w-10/12 p-2 space-y-2 overflow-y-auto'
      >

        <div
          className='flex justify-between items-center'
        >
          <h1>Notes</h1>
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
          className='grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4'
        >
          {
            notes.length > 0 && notes.map((note) => (
              <div
                key={note._id}
                className='flex border p-2 rounded-md justify-between'
              >
                <Link
                  href={`/note/${mode}/${note._id}`}
                  target='_blank'
                >
                  <div
                    className='flex space-x-2'
                  >
                    <Image
                      src={icons[note.icon]}
                      alt={note.icon}
                      height={20}
                      width={25}
                    />
                    <p className='truncate'>{note.title}</p>
                  </div>
                </Link>
                <NoteAction note={note} />
              </div>
            ))
          }
        </div>
      </div>
      {/* Floating Button */}
      <button
        onClick={createNewDocument}
        className='fixed bottom-4 right-4 border p-3 rounded-full shadow-md'
      >
        <TiDocumentAdd size={25} />
      </button>
    </div>
  )
}
