'use client'
import { EditorContent, useEditor } from '@tiptap/react';
import { useEffect, useState } from 'react';
import extenstion from './extenstion';
import MenuBar from './MenuBar';

const RichTextEditor = () => {
  const [content, setContent] = useState('');
  const [menuHeight, setMenuHeight] = useState(96)
  const editor = useEditor({
    extensions: extenstion,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'h-full flex-1 overflow-y-auto p-2 font-bangla focus:outline-none',
      },
    },
    content: content,
  });

  useEffect(() => {
    const updateMenuHeight = () => {
      const menu = document.querySelector('.menu-bar')
      if (menu) {
        setMenuHeight(menu.offsetHeight);
      }
    };

    window.addEventListener('resize', updateMenuHeight);
    updateMenuHeight()

    return () => {
      window.removeEventListener('resize', updateMenuHeight);
    };
  });

  return (
    <div className='w-full md:w-8/12 h-screen mx-auto flex flex-col border'>
      <MenuBar editor={editor} />
      <div
        style={{
          height: `calc(100% - ${menuHeight}px)`
        }}
        className='flex flex-col overflow-y-auto'
      >
        <EditorContent
          editor={editor}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
