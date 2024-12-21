'use client'
import EditNoteEditor from '@/components/EditNoteEditor';
import { useRouter } from 'next/router';

export default function EditNote() {
    const router = useRouter()
    const {note_id} = router.query
    // console.log(note_id)
    return (
        <EditNoteEditor
            id={note_id}
        />
    );
}
