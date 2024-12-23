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
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SelectBookIcon } from "./SelectBookIcon";

export default function UpdateBook({book}) {
    const [icon, setIcon] = useState(book?.icon)
    const [name, setName] = useState(book?.name)
    const [open, setOpen] = useState(false)
    const {setUpdateBook} = useBookStore()

    const updateBook = async (e) => {
        e.preventDefault()
        if (!name) return toast.error('Please input name')
        try {
            const { data } = await axios.put(getAPIRequest(`/book/${book._id}`), {name,icon}, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('dev-note-token')}`
                }
            });
            setUpdateBook(data.data)
            toast.success('Book updated successfully!')
            setOpen(false)
        } catch (error) {
            console.log('Create new book error:', error)
            toast.error('Failed to create book')
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button 
                    onClick={() => setOpen(true)} 
                    className='w-full flex items-center justify-start'
                >
                    <span>{book?.name}</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className='text-left'>Update New Book</DialogTitle>
                </DialogHeader>
                <form onSubmit={updateBook} className="grid gap-4 py-4">
                    <div
                        className="flex items-center space-x-1"
                    >
                        <SelectBookIcon icon={icon} setIcon={setIcon}/>
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
