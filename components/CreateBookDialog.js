import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { BiBookAdd } from "react-icons/bi"

export default function CreateBookDialog() {
    return (
        <Dialog>
            <DialogTrigger
                className={cn('flex items-center space-x-2')}
            >
            <BiBookAdd/>
            <span>New Book</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Book</DialogTitle>
                    <DialogDescription>
                        <div>
                            <input
                                type="text"
                                placeholder="Book name"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
