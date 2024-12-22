import React from 'react'
import { TiDocumentAdd } from "react-icons/ti";
import { CgFolderAdd } from "react-icons/cg";
import axios from 'axios';
import { getAPIRequest } from '@/utils/getAPI';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter()
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
  return (
    <div>
      <button
        onClick={createNewDocument}
        className='fixed bottom-4 right-4 border p-3 rounded-full shadow-md'
      >
        <TiDocumentAdd size={25} />
      </button>
    </div>
  )
}
