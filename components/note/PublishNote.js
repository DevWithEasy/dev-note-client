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
import { CircleCheck, SendHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PublishNote({ note,setNote }) {
    const [keywords, setKeywords] = useState(note.keywords);
    const [title, setTitle] = useState(note.keywords.join(','));
    const [open, setOpen] = useState(false);
    const { updateNote } = useBookStore();

    const handleKeywordChange = (e) => {
        setTitle(e.target.value)
        let splitKeys = e.target.value.split(',')
        let keys = [];
        splitKeys.forEach(element => {
            if (element.trim() !== '') {
                keys.push(element.trim())
            }
        });
        setKeywords(keys)
    };

    const publishNote = async (e) => {
        e.preventDefault()
        if (keywords.length === 0) return toast.error('Please input keywords first');
        try {
            const { data } = await axios.put(getAPIRequest(`/note/publish/${note._id}`), { keywords }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('dev-note-token')}`
                }
            })
            setNote(data.data)
            updateNote(data.data)
            toast.success('Note publish successfully!')
            setOpen(false);
        } catch (error) {
            console.log('Create new book error:', error)
            toast.error('Failed to create book')
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    className={`flex items-center py-1 text-left rounded-md bg-blue-500 hover:bg-blue-600 text-white`}
                    onClick={() => setOpen(true)}
                >
                    <SendHorizontal size={15} />
                    <span className="text-sm">Publish</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" aria-describedby="dialog-publish">
                <DialogHeader>
                    <DialogTitle className='text-left'>Publish Note</DialogTitle>
                </DialogHeader>
                <p id="dialog-publish" className="text-sm text-gray-600">
                    Please enter the keywords for your note, separated by commas.
                </p>
                <form onSubmit={publishNote} className="grid gap-4 py-4">
                    {keywords.length > 0 && (
                        <div>
                            {keywords.map((keyword, index) => (
                                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{keyword}</span>
                            ))}
                        </div>
                    )}
                    <div>
                        <Input
                            id="name"
                            value={title}
                            onChange={handleKeywordChange}
                            autoFocus={true}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
