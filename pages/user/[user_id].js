import React, { useEffect, useState } from 'react'
import { TiDocumentAdd } from "react-icons/ti";
import { BiBookAdd } from "react-icons/bi";
import axios from 'axios';
import { getAPIRequest } from '@/utils/getAPI';
import { useRouter } from 'next/router';
import Image from 'next/image';
import icons from '@/utils/icons';
import Link from 'next/link';
import CreateBookDialog from '@/components/CreateBookDialog';

export default function Profile() {
  const router = useRouter()
  const { user_id } = router.query
  const [mode,setMode] = useState('edit')
  const [books, setBooks] = useState([])
  const [notes, setNotes] = useState([])

  //get user document collection
  const getDocCollection = async (user_id) => {
    try {
      const { data } = await axios.get(getAPIRequest(`/user/${user_id}`), {
        headers: {
          authorization: `Bareer ${localStorage.getItem('dev-note-token')}`
        }
      })
      setBooks(data.data.books)
      setNotes(data.data.notes)
    } catch (error) {
      console.log('Create new document error:', error)
    }
  }

  //create new document
  const createNewDocument = async () => {
    try {
      const { data } = await axios.post(getAPIRequest('/note/create'), {}, {
        headers: {
          authorization: `Bareer ${localStorage.getItem('dev-note-token')}`
        }
      })
      router.push(`/note/edit/${data.data._id}`)
      console.log(data)
    } catch (error) {
      console.log('Create new document error:', error)
    }
  }

  useEffect(() => {
    if (user_id) {
      getDocCollection(user_id)
    }
  }, [user_id])

  console.log(notes)
  return (
    <div
      className='font-bangla flex justify-between'
    >
      <div
        className='w-2/12'
      >
        <CreateBookDialog/>
        <div
          className='flex flex-col'
        >
          {
            books.map((book) => (
              <div
                key={book._id}
                className='border p-2 rounded-md'
              >

              </div>
            ))
          }
        </div>
      </div>
      <div
        className='w-10/12'
      >

        <div
          className='flex justify-between items-center'
        >
        <h1>Notes</h1>
        <div
          className='flex space-x-2'
        >
          <button
            onClick={()=>setMode('view')}
            className='border p-2 rounded-md'
          >
            <span>View</span>
          </button>
          <button
            onClick={()=>setMode('edit')}
            className='border p-2 rounded-md'
          >
            <span>Edit</span>
          </button>
        </div>
        </div>
        <div
          className='grid grid-cols-3 gap-4'
        >
          {
            notes.map((note) => (
              <Link
                key={note._id}
                href={`/note/${mode}/${note._id}`}
                target='_blank'
              >
                <div
                  className='flex space-x-2 border p-2 rounded-md'
                >
                  <Image
                    src={icons[note.icon]}
                    alt={note.icon}
                    height={20}
                    width={25}
                  />
                  <h1>{note.title}</h1>
                </div>
              </Link>
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
