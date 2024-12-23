import React, { useEffect, useState } from 'react'
import { TiDocumentAdd } from "react-icons/ti";
import axios from 'axios';
import { getAPIRequest } from '@/utils/getAPI';
import { useRouter } from 'next/router';
import Image from 'next/image';
import icons from '@/utils/icons';
import Link from 'next/link';
import CreateBookDailog from '@/components/book/CreateBookDailog';
import { FilePenLine, Loader, Rows3 } from 'lucide-react';
import useBookStore from '@/store/bookStore';
import NoteAction from '@/components/note/NoteAction';
import useUserStore from '@/store/userStore';
import { Input } from '@/components/ui/input';
import NavigationArea from '@/components/user/NavigationArea';
import ContentArea from '@/components/user/ContentArea';

export default function Profile() {
  const router = useRouter()
  const { user_id } = router.query
  const [mode, setMode] = useState('edit')
  const { books, notes, setCollection, addNote, addBookNotes } = useBookStore()
  const { user } = useUserStore()
  const [selectBook, setSelectBook] = useState({})
  const [loading, setLoading] = useState(false)

  //get user document collection
  const getDocCollection = async (user_id) => {
    setSelectBook({})
    setLoading(true)
    try {
      const { data } = await axios.get(getAPIRequest(`/user/${user_id}`), {
        headers: {
          authorization: `Bareer ${localStorage.getItem('dev-note-token')}`
        }
      })
      setCollection(data.data)
      setLoading(false)
    } catch (error) {
      console.log('Create new document error:', error)
      setLoading(false)
    }
  }

  const getBookNotes = async (book) => {
    setSelectBook(book)
    setLoading(true)
    try {
      const { data } = await axios.get(getAPIRequest(`/book/notes/${book._id}`), {
        headers: {
          authorization: `Bareer ${localStorage.getItem('dev-note-token')}`
        }
      })
      addBookNotes(data.data)
      setLoading(false)
    } catch (error) {
      console.log('Create new document error:', error)
      setLoading(false)
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
      <NavigationArea
        selectBook={selectBook}
        getBookNotes={getBookNotes}
        getDocCollection={getDocCollection}
      />
      <ContentArea
        loading={loading}
        selectBook={selectBook}
      />
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
