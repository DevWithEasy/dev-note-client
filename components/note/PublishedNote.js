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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useBookStore from "@/store/bookStore";
import { getAPIRequest } from "@/utils/getAPI";
import axios from "axios";
import { CircleCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PublishedNote({ note,setNote }) {
    const [open, setOpen] = useState(false);
    const { updateNote } = useBookStore();

    const unPublishNote = async (e) => {
        try {
            const { data } = await axios.put(getAPIRequest(`/note/un_publish/${note._id}`),{}, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('dev-note-token')}`
                }
            })
            setNote(data.data)
            updateNote(data.data)
            toast.success('Note publish remove successfully!')
            setOpen(false);
        } catch (error) {
            console.log('Create new book error:', error)
            toast.error('Failed to create book')
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className={`flex items-center py-1 text-left rounded-md bg-gray-100 hover:bg-gray-200 text-black`}
                    onClick={() => setOpen(true)}
                >
                    <CircleCheck size={15} />
                    <span className="text-sm">Published</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action unpublish your note.No anyone cannot sea your note.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                    <Button onClick={unPublishNote} className="ml-auto">Continue</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
