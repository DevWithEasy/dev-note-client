import ContentArea from '@/components/user/ContentArea';
import NavigationArea from '@/components/user/NavigationArea';
import { NavigationSheet } from '@/components/user/NavigationSheet';
import useBookStore from '@/store/bookStore';
import { getAPIRequest } from '@/utils/getAPI';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TiDocumentAdd } from "react-icons/ti";

export default function Profile() {
  const router = useRouter()
  const { user_id } = router.query
  const { setCollection, addBookNotes } = useBookStore()
  const [selectBook, setSelectBook] = useState({})
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  //get user document collection
  const getDocCollection = async (user_id) => {
    setSelectBook({})
    setLoading(true)
    setIsOpen(false)
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
    setIsOpen(false)
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
      <div
        className='hidden md:block w-2/12 border-r'
      >
        <NavigationArea
          selectBook={selectBook}
          getBookNotes={getBookNotes}
          getDocCollection={getDocCollection}
        />
      </div>

      <ContentArea
        loading={loading}
        selectBook={selectBook}
      >
        <div
          className='block md:hidden'
        >
          <NavigationSheet
          isOpen = {isOpen}
          setIsOpen={setIsOpen}
          >
          <NavigationArea
            selectBook={selectBook}
            getBookNotes={getBookNotes}
            getDocCollection={getDocCollection}
          />
        </NavigationSheet>
        </div>
        
      </ContentArea>
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
