import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import useBookStore from "@/store/bookStore";
import { getAPIRequest } from "@/utils/getAPI";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteNote({note}) {
    const [open, setOpen] = useState(false)
    const { setDeleteNote } = useBookStore()

    const deleteNote = async () => {
        console.log('click delete')
        try {
            const { data } = await axios.delete(getAPIRequest(`/note/delete/${note?._id}`), {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('dev-note-token')}`
                }
            });
            setDeleteNote(note?._id)
            toast.success('Note Deleted successfully!')
            setOpen(false)
        } catch (error) {
            console.log('Create new book error:', error)
            toast.error('Failed to create book')
        }
    };
    
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <button className='w-full p-1 text-left bg-white hover:bg-gray-50 text-black rounded-md' onClick={() => setOpen(true)}>Delete</button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Delete this {note?.title}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteNote}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
