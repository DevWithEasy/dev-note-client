import { AiOutlineFontColors } from "react-icons/ai";
import { BsBlockquoteRight } from "react-icons/bs";
import { CgRedo, CgUndo } from "react-icons/cg";
import { FaParagraph } from "react-icons/fa";
import { ImClearFormatting } from "react-icons/im";
import { IoIosCode } from "react-icons/io";
import { IoCodeSlash } from "react-icons/io5";
import { MdFormatBold, MdFormatClear, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdFormatUnderlined, MdOutlineHorizontalRule, MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { RiH1, RiH2, RiH3, RiH4, RiH5, RiH6 } from "react-icons/ri";
export default function MenuBar({editor}) {

    if (!editor) {
        return null
    }

    return (
        <div className="h-24 control-group">
            <div className="flex flex-wrap gap-2">
                <button 
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={`p-2 border rounded ${editor.isActive('bold') ? 'is-active' : ''}`}
                >
                    <MdFormatBold/>
                </button>
                <button 
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    className={`p-2 border rounded ${editor.isActive('italic') ? 'is-active' : ''}`}
                >
                    <MdFormatItalic/>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    className={`p-2 border rounded ${editor.isActive('strike') ? 'is-active' : ''}`}
                >
                    <MdFormatUnderlined/>
                </button>
                <button 
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleCode()
                            .run()
                    }
                    className={`p-2 border rounded ${editor.isActive('code') ? 'is-active' : ''}`}
                >
                    <IoIosCode/>
                </button>
                <button className='p-2 border rounded'  onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                    <MdFormatClear/>
                </button>
                <button className='p-2 border rounded'  onClick={() => editor.chain().focus().clearNodes().run()}>
                    <ImClearFormatting/>
                </button>
                <button 
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`p-2 border rounded ${editor.isActive('paragraph') ? 'is-active' : ''}`}
                >
                    <FaParagraph/>
                </button>
                <button 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-2 border rounded ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
                >
                    <RiH1/>
                </button>
                <button 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 border rounded ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
                >
                    <RiH2/>
                </button>
                <button 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`p-2 border rounded ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
                >
                    <RiH3/>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={`p-2 border rounded ${editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}`}
                >
                    <RiH4/>
                </button>
                <button 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={`p-2 border rounded ${editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}`}
                >
                    <RiH5/>
                </button>
                <button 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={`p-2 border rounded ${editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}`}
                >
                    <RiH6/>
                </button>
                <button 
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 border rounded ${editor.isActive('bulletList') ? 'is-active' : ''}`}
                >
                    <MdFormatListBulleted />
                </button>
                <button 
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 border rounded ${editor.isActive('orderedList') ? 'is-active' : ''}`}
                >
                    <MdFormatListNumbered />
                </button>
                <button 
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`p-2 border rounded ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
                >
                    <IoCodeSlash/>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`p-2 border rounded ${editor.isActive('blockquote') ? 'is-active' : ''}`}
                >
                    <BsBlockquoteRight/>
                </button>
                <button className='p-2 border rounded'  onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    <MdOutlineHorizontalRule/>
                </button>
                <button className='p-2 border rounded'  onClick={() => editor.chain().focus().setHardBreak().run()}>
                    <MdOutlineSubdirectoryArrowLeft/>
                </button>
                <button className='p-2 border rounded' 
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                >
                    <CgUndo/>
                </button>
                <button className='p-2 border rounded' 
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                >
                    <CgRedo/>
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                    className={`p-2 border rounded ${editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}`}
                >
                    <AiOutlineFontColors />
                </button>
            </div>
        </div>
    )
}
