import { BiRedo, BiUndo } from "react-icons/bi";
import { IoIosCode } from "react-icons/io";
import { LuCodeXml } from "react-icons/lu";
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdHorizontalRule, MdOutlineFormatListBulleted, MdOutlineFormatListNumbered, MdSubdirectoryArrowLeft } from "react-icons/md";
import { RiFormatClear, RiH1, RiH2, RiH3, RiParagraph } from "react-icons/ri";
import { TbBlockquote, TbClearFormatting } from "react-icons/tb";
export default function MenuBar({editor}) {

    if (!editor) {
        return null
    }

    const buttons = [
        {
            icon: <MdFormatBold/>,
            onClick: () => editor.chain().focus().toggleBold().run(),
            disabled: !editor.can().chain().focus().toggleBold().run(),
            className : editor.isActive('bold') ? 'is-active' : ''
        },
        {
            icon: <MdFormatItalic/>,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            disabled: !editor.can().chain().focus().toggleItalic().run(),
            className : editor.isActive('italic') ? 'is-active' : ''
        },
        {
            icon: <MdFormatUnderlined/>,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            disabled: !editor.can().chain().focus().toggleStrike().run(),
            className : editor.isActive('strike') ? 'is-active' : ''
        },
        {
            icon: <IoIosCode/>,
            onClick: () => editor.chain().focus().toggleCode().run(),
            disabled: !editor.can().chain().focus().toggleCode().run(),
            className : editor.isActive('code') ? 'is-active' : ''
        },
        {
            icon: <LuCodeXml />,
            onClick: ()=> editor.chain().focus().toggleCodeBlock().run(),
            disabled: false,
            className : editor.isActive('codeBlock') ? 'is-active' : ''
        },
        {
            icon: <RiFormatClear/>,
            onClick: () => editor.chain().focus().unsetAllMarks().run(),
            disabled: false,
            className : ''
        },
        {
            icon: <TbClearFormatting/>,
            onClick: () => editor.chain().focus().clearNodes().run(),
            disabled: false,
            className : ''
        },
        {
            icon: <RiParagraph />,
            onClick: () => editor.chain().focus().setParagraph().run(),
            disabled: false,
            className : editor.isActive('paragraph') ? 'is-active' : ''
        },
        {
            icon: <RiH1 />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            className : editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
        },
        {
            icon: <RiH2 />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            className : editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
        },
        {
            icon: <RiH3 />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            className : editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
        },
        {
            icon: <MdOutlineFormatListBulleted />,
            onClick: ()=> editor.chain().focus().toggleBulletList().run(),
            disabled: false,
            className : editor.isActive('bulletList') ? 'is-active' : ''
        },
        {
            icon: <MdOutlineFormatListNumbered />,
            onClick: ()=> editor.chain().focus().toggleOrderedList().run(),
            disabled: false,
            className : editor.isActive('orderedList') ? 'is-active' : ''
        },
        {
            icon: <TbBlockquote />,
            onClick: ()=> editor.chain().focus().toggleBlockquote().run(),
            disabled: false,
            className : editor.isActive('blockquote') ? 'is-active' : ''
        },
        {
            icon: <MdHorizontalRule  />,
            onClick: ()=> editor.chain().focus().setHorizontalRule().run(),
            disabled: false,
            className : ''
        },
        {
            icon: <MdSubdirectoryArrowLeft />,
            onClick: ()=> editor.chain().focus().setHardBreak().run(),
            disabled: false,
            className : ''
        },
        {
            icon: <BiUndo />,
            onClick: ()=> editor.chain().focus().undo().run(),
            disabled: !editor.can().chain().focus().undo().run(),
            className : ''
        },
        {
            icon: <BiRedo />,
            onClick: ()=> editor.chain().focus().redo().run(),
            disabled: !editor.can().chain().focus().redo().run(),
            className : ''
        },
        // {
        //     icon: <MdColorLens />,
        //     onClick: ()=> editor.chain().focus().setColor('#958DF1').run(),
        //     disabled: false,
        //     className : editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''
        // },
      ]

    return (
        <div className="menu-bar p-2 flex flex-wrap gap-2 border-b">
                {
                    buttons.map((button, index) => (
                        <button 
                            key={index}
                            onClick={button.onClick}
                            disabled={button.disabled}
                            className={`p-1 border rounded ${button.className}`}
                        >
                            {button.icon}
                        </button>
                    ))
                }
            </div>
    )
}
