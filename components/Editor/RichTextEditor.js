'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import extenstion from './extenstion'
import MenuBar from './MenuBar'
import { useState } from 'react'

const RichTextEditor = () => {
  const [content,setContent] = useState('<p>Hello World! 🌎️</p>')
  const editor = useEditor({
    extensions : extenstion,
    onUpdate : ({editor})=>{
      setContent(editor.getHTML())
    },
    editorProps : {
      attributes : {
        class : 'tiptap h-96 overflow-y-auto p-2 font-bangla border focus:outline-none'
      }
    },
    content : content
  })

  return <div
    className='w-8/12 mx-auto '
  >
    <MenuBar editor={editor}/>
    <EditorContent
    editor={editor}
    />
    <p>{content}</p>
  </div>
}

export default RichTextEditor
