'use client'
import { getAPIRequest } from '@/utils/getAPI';
import icons from '@/utils/icons';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';

export default function ViewNote() {
    const router = useRouter()
    const [note, setNote] = useState({})
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

    console.log(note)
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div
                className='h-screen overflow-y-auto bg-gray-50'
            >
                <Head>
                    <title>{note?.title ? note?.title : 'Loading...'}</title>
                </Head>
                <div
                    className='h-screen md:w-8/12 mx-auto bg-white'
                >
                    <div
                        className='p-4 border-b-2'
                    >
                        <div
                            className='flex items-center space-x-2'
                        >
                            <Image
                                src={icons[note?.icon]}
                                alt='icon'
                                height={25}
                                width={25}
                                onClick={() => setIconSelectView(true)}
                                className='cursor-pointer'
                            />
                            <h1 className='font-bold text-xl'>{note?.title}</h1>
                        </div>
                        <div
                            className=''
                        >
                            <p>Created By : {note?.user?.name}</p>
                            <p>Created At : {new Date(note?.createdAt).toDateString()}</p>
                        </div>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{ __html: note?.description }}
                        className='p-4 tiptap'
                    ></div>
                </div>
            </div>

        </Suspense>
    );
}