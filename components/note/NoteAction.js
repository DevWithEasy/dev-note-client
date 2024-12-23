import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react';
import RenameNote from "./RenameNote";
import DeleteNote from "./DeleteNote";


export default function NoteAction({note}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <EllipsisVertical className="text-gray-500" size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <div
                    className="px-2 font-bangla"
                >
                    <RenameNote note={note}/>
                    <DeleteNote note={note}/>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
