'use client'
import extenstion from '@/components/Editor/extenstion';
import MenuBar from '@/components/Editor/MenuBar';
import IconSelectView from '@/components/IconSelectView';
import useBookStore from '@/store/bookStore';
import { getAPI } from '@/utils/getAPI';
import icons from '@/utils/icons';
import { EditorContent, useEditor } from '@tiptap/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client"
import { Input } from './ui/input';
import PublishNote from './note/PublishNote';

export default function EditNoteEditor({ id, note, setNote }) {
    const [icon, setIcon] = useState(note.icon)
    const [title, setTitle] = useState(note.title)
    const [description, setDescription] = useState(note.description)
    const [menuHeight, setMenuHeight] = useState(96)
    const [iconSelectView, setIconSelectView] = useState(false)
    const [socket, setSocket] = useState(null)

    const titleHandler = (e) => {
        setTitle(e.target.value)
        setNote({ title: e.target.value, setDescription })
        socket.emit('edit_title_api', { id, title: e.target.value })
    }

    const iconHandler = (icon) => {
        setIcon(icon)
        setIconSelectView(false)
        socket.emit('edit_icon_api', { id, icon: icon })
    }

    const editor = useEditor({
        extensions: extenstion,
        onUpdate: ({ editor }) => {
            setDescription(editor.getHTML())
            socket.emit('edit_note', { id, description: editor.getHTML() })
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
        socketInstance.on('edit_title_client', (data) => {
            setTitle(data.title)
        })

        socketInstance.on('edit_icon_client', (data) => {
            setIcon(data.icon)
        })

        // Listen for edit_note_client event
        socketInstance.on('edit_note_client', (data) => {
            setDescription(data.description);
            editor?.commands.setContent(data.description);
        })

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
            <div className='h-12 p-2 flex justify-between items-center space-x-1'>
                <div
                    className='flex items-center space-x-1'
                >
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
                        <Input
                            type='text'
                            value={title}
                            onChange={titleHandler}
                            className='border-white focus:outline-none focus:border-gray-300'
                        />
                    </div>
                </div>
                <div>
                    <PublishNote note={note} setNote={setNote}/>
                </div>
            </div>
            <MenuBar editor={editor} />
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
                    iconHandler={iconHandler}
                />
            }
        </div>
    );
}
