import { getAPIRequest } from '@/utils/getAPI'
import axios from 'axios'
import React from 'react'

export default function SearchNoteKey() {
  return (
    <div>SearchKey</div>
  )
}

export async function getServerSideProps(context) {
  try {
    const { data } = await axios.get(getAPIRequest('/note/search_key?key=' + context.query.key))
    console.log(data.data)
    return {
      props: {
        notes: [],
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    return { props: { data: [] } }
  }
}
