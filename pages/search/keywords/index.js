import Layout from '@/components/Layout'
import NoteNavLink from '@/components/NoteNavLink'
import { getAPIRequest } from '@/utils/getAPI'
import axios from 'axios'
import React from 'react'

export default function SearchNoteKey({notes}) {
  return (
    <Layout>
      <div
        className="h-full w-full md:w-8/12 p-2 overflow-y-auto md:border-r"
      >
        <div>
          {
            notes.map(note => (
              <NoteNavLink
                key={note._id}
                note={note}
              />
            ))
          }
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  try {
    const { data } = await axios.get(getAPIRequest('/note/search_key?key=' + context.query.key))
    return {
      props: {
        notes: data.data,
        key: context.query.key
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    return {
      props: {
        notes: []
      }
    }
  }
}
