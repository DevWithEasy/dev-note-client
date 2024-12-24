import { BiRedo, BiUndo } from "react-icons/bi";
import { IoIosCode } from "react-icons/io";
import { LuCodeXml } from "react-icons/lu";
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdHorizontalRule, MdOutlineFormatListBulleted, MdOutlineFormatListNumbered, MdSubdirectoryArrowLeft, MdOutlineFormatAlignJustify, MdOutlineFormatAlignLeft,MdOutlineFormatAlignRight,MdOutlineFormatAlignCenter  } from "react-icons/md";
import { RiFormatClear, RiH1, RiH2, RiH3, RiParagraph } from "react-icons/ri";
import { TbBlockquote, TbClearFormatting } from "react-icons/tb";
export default function MenuBar({editor}) {

    if (!editor) {
        return null
    }
    

    const buttons = [
        {
            icon: <BiUndo />,
            lebel : 'Undo',
            onClick: ()=> editor.chain().focus().undo().run(),
            disabled: !editor.can().chain().focus().undo().run(),
            className : ''
        },
        {
            icon: <BiRedo />,
            lebel : 'Redo',
            onClick: ()=> editor.chain().focus().redo().run(),
            disabled: !editor.can().chain().focus().redo().run(),
            className : ''
        },
        {
            icon: <RiParagraph />,
            lebel : 'Paragraph',
            onClick: () => editor.chain().focus().setParagraph().run(),
            disabled: false,
            className : editor.isActive('paragraph') ? 'is-active' : ''
        },
        {
            icon: <MdFormatBold/>,
            lebel : 'Bold',
            onClick: () => editor.chain().focus().toggleBold().run(),
            disabled: !editor.can().chain().focus().toggleBold().run(),
            className : editor.isActive('bold') ? 'is-active' : ''
        },
        {
            icon: <MdFormatItalic/>,
            lebel : 'Italic',
            onClick: () => editor.chain().focus().toggleItalic().run(),
            disabled: !editor.can().chain().focus().toggleItalic().run(),
            className : editor.isActive('italic') ? 'is-active' : ''
        },
        {
            icon: <MdFormatUnderlined/>,
            lebel : 'Underline',
            onClick: () => editor.chain().focus().toggleStrike().run(),
            disabled: !editor.can().chain().focus().toggleStrike().run(),
            className : editor.isActive('strike') ? 'is-active' : ''
        },
        {
            icon: <IoIosCode/>,
            lebel : 'Code',
            onClick: () => editor.chain().focus().toggleCode().run(),
            disabled: !editor.can().chain().focus().toggleCode().run(),
            className : editor.isActive('code') ? 'is-active' : ''
        },
        {
            icon: <LuCodeXml />,
            lebel : 'Code Block',
            onClick: ()=> editor.chain().focus().toggleCodeBlock().run(),
            disabled: false,
            className : editor.isActive('codeBlock') ? 'is-active' : ''
        },
        {
            icon: <RiFormatClear/>,
            lebel : 'Clear Text Format',
            onClick: () => editor.chain().focus().unsetAllMarks().run(),
            disabled: false,
            className : ''
        },
        {
            icon: <TbClearFormatting/>,
            lebel : 'Clear Node',
            onClick: () => editor.chain().focus().clearNodes().run(),
            disabled: false,
            className : ''
        },
        // {
        //     icon: <RiH1 />,
        //     lebel : 'Heading 1',
        //     onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        //     className : editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
        // },
        // {
        //     icon: <RiH2 />,
        //     lebel : 'Heading 2',
        //     onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        //     className : editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
        // },
        // {
        //     icon: <RiH3 />,
        //     lebel : 'Heading 3',
        //     onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        //     className : editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
        // },
        {
            icon: <MdOutlineFormatListBulleted />,
            lebel : 'Unorder List',
            onClick: ()=> editor.chain().focus().toggleBulletList().run(),
            disabled: false,
            className : editor.isActive('bulletList') ? 'is-active' : ''
        },
        {
            icon: <MdOutlineFormatListNumbered />,
            lebel : 'Order List',
            onClick: ()=> editor.chain().focus().toggleOrderedList().run(),
            disabled: false,
            className : editor.isActive('orderedList') ? 'is-active' : ''
        },
        {
            icon: <TbBlockquote />,
            lebel : 'Blockquote',
            onClick: ()=> editor.chain().focus().toggleBlockquote().run(),
            disabled: false,
            className : editor.isActive('blockquote') ? 'is-active' : ''
        },
        {
            icon: <MdOutlineFormatAlignLeft/>,
            lebel : 'Left Align',
            onClick: ()=> editor.chain().focus().setTextAlign('left').run(),
            disabled: false,
            className : editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''
        },
        {
            icon: <MdOutlineFormatAlignCenter/>,
            lebel : 'Center Align',
            onClick: ()=> editor.chain().focus().setTextAlign('center').run(),
            disabled: false,
            className : editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
        },
        {
            icon: < MdOutlineFormatAlignRight/>,
            lebel : 'Right Align',
            onClick: ()=> editor.chain().focus().setTextAlign('right').run(),
            disabled: false,
            className : editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''
        },
        {
            icon: < MdOutlineFormatAlignJustify/>,
            lebel : 'Justify Align',
            onClick: ()=> editor.chain().focus().setTextAlign('justify').run(),
            disabled: false,
            className : editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''
        },
        // {
        //     icon: <MdHorizontalRule  />,
        //     lebel : '',
        //     onClick: ()=> editor.chain().focus().setHorizontalRule().run(),
        //     disabled: false,
        //     className : ''
        // },
        {
            icon: <MdSubdirectoryArrowLeft />,
            lebel : 'New Line',
            onClick: ()=> editor.chain().focus().setHardBreak().run(),
            disabled: false,
            className : ''
        },
        // {
        //     icon: <IoPrintOutline />,
        //     lebel : 'Print',
        //     onClick: ()=>printHandler(),
        //     disabled: false,
        //     className : ''
        // },
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
                            className={`relative group p-1 border border-gray-100 rounded cursor-pointer ${button.className}`}
                        >
                            {button.icon}
                            {/* <span className="group-hover:inline-block hidden absolute left-0 -bottom-4 px-1 bg-gray-100 text-xs rounded z-10">
                                {button.lebel}
                            </span> */}
                        </button>
                    ))
                }
            </div>
    )
}
