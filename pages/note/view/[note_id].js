'use client'
import { getAPIRequest } from '@/utils/getAPI';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';

export default function ViewNote() {
    const router = useRouter()
    const [note, setNote] = useState()
    const { note_id } = router.query

    const getNote = async (id) => {
        try {
            const { data } = await axios.get(getAPIRequest(`/note/${id}`), {
                headers: {
                    authorization: `Bareer ${localStorage.getItem('dev-note-token')}`
                }
            })
            setNote(data.data)
        } catch (error) {
            console.log('Get note error:', error)
        }
    }

    useEffect(() => {
        if (note_id) {
            getNote(note_id)
        }
    }, [note_id])
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Head>
                <title>{note?.title ? note.title : 'Loading...'}</title>
            </Head>
            {note?.description &&
                <div
                    dangerouslySetInnerHTML={{ __html: note.description }}
                    className='tiptap font-bangla'
                ></div>
            }
        </Suspense>
    );
}