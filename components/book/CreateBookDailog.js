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

export default function CreateBookDialog() {
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const {addBook} = useBookStore()

    const createNewBook = async (e) => {
        e.preventDefault()
        if (!name) return toast.error('Please input name')
        try {
            const { data } = await axios.post(getAPIRequest('/book/create'), {name}, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('dev-note-token')}`
                }
            });
            addBook(data.data)
            toast.success('Book created successfully!')
            setOpen(false)
        } catch (error) {
            console.log('Create new book error:', error)
            toast.error('Failed to create book')
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setOpen(true)} className='w-full'>New Book</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className='text-left'>Create New Book</DialogTitle>
                </DialogHeader>
                <form onSubmit={createNewBook} className="grid gap-4 py-4">
                    <div>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus={true}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
