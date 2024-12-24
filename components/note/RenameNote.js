import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useBookStore from "@/store/bookStore";
import { getAPIRequest } from "@/utils/getAPI";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function RenameNote({note}) {
    const [title, setTitle] = useState(note.title)
    const [open, setOpen] = useState(false)
    const {updateNote} = useBookStore()

    const renameNote = async (e) => {
        e.preventDefault()
        if (!title) return toast.error('Please input name')
        try {
            const { data } = await axios.put(getAPIRequest(`/note/update/${note._id}`), {title}, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('dev-note-token')}`
                }
            })
            updateNote(data.data)
            toast.success('Note update successfully!')
            setOpen(false)
        } catch (error) {
            console.log('Create new book error:', error)
            toast.error('Failed to create book')
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className='w-full p-1 text-left bg-white hover:bg-gray-50 text-black rounded-md' onClick={() => setOpen(true)}>Rename</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" aria-describedby="dialog-rename">
                <DialogHeader>
                    <DialogTitle className='text-left'>Rename note</DialogTitle>
                </DialogHeader>
                <form onSubmit={renameNote} className="grid gap-4 py-4">
                    <div>
                        <Input
                            id="name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus={true}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
