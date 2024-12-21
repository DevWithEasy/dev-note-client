'use client'
import extenstion from '@/components/Editor/extenstion';
import MenuBar from '@/components/Editor/MenuBar';
import IconSelectView from '@/components/IconSelectView';
import getAPI from '@/utils/getAPI';
import icons from '@/utils/icons';
import { EditorContent, useEditor } from '@tiptap/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client"

export default function EditNoteEditor({id}) {
    const [icon, setIcon] = useState('doc')
    const [title, setTitle] = useState('Untitled note')
    const [description, setDescription] = useState('')
    const [menuHeight, setMenuHeight] = useState(96)
    const [iconSelectView, setIconSelectView] = useState(false)
    const [socket,setSocket] = useState()

    const saveHandler = async () => {
        console.log(`${title}\n ${description}`)
    }

    const editor = useEditor({
        extensions: extenstion,
        onUpdate: ({ editor }) => {
            setDescription(editor.getHTML())
            socket.emit('edit_note', { id, description : editor.getHTML() })
        },
        editorProps: {
            attributes: {
                class: 'h-full flex-1 overflow-y-auto p-2 font-bangla focus:outline-none',
            },
        },
        content: description,
    });

    useEffect(() => {
        // Initialize socket connection
        const socketInstance = io(getAPI());
        setSocket(socketInstance);
        
        // Join edit room
        socketInstance.emit('join_edit', { id });

        // Listen for edit_note_client event
        socketInstance.on('edit_note_client', (data) => {
            setDescription(data.description);
            editor?.commands.setContent(data.description);
        });

        // Cleanup on unmount
        return () => {
            socketInstance.disconnect();
            socketInstance.off('edit_note_client')
        }
    }, [id, editor])

    useEffect(() => {
        //dynamic height
        const updateMenuHeight = () => {
            const menu = document.querySelector('.menu-bar');
            if (menu) {
                setMenuHeight(menu.offsetHeight + 48);
            }
        }

        window.addEventListener('resize', updateMenuHeight);
        updateMenuHeight()

        return () => {
            window.removeEventListener('resize', updateMenuHeight);
        }
    }, [])

    return (
        <div className='h-screen overflow-y-hidden'>
            <div className='h-12 p-2 flex items-center space-x-1'>
                <div>
                    <Image
                        src={icons[icon]}
                        alt='icon'
                        height={25}
                        width={25}
                        onClick={() => setIconSelectView(true)}
                        className='cursor-pointer'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // Handle title change
                        className='p-1 rounded'
                    />
                </div>

            </div>
            <MenuBar editor={editor} save={saveHandler} />
            <div
                style={{
                    height: `calc(100% - ${menuHeight}px)`
                }}
                className='flex flex-col overflow-y-auto'
            >
                <EditorContent editor={editor} />
            </div>
            {
                iconSelectView &&
                <IconSelectView
                    icon={icon}
                    setIcon={setIcon}
                    setView={setIconSelectView}
                />
            }
        </div>
    );
}
