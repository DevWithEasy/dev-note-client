import icons from '@/utils/icons'
import { CalendarDays, CircleUserRound } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NoteNavLink({ note }) {
    return (
        <div
            className="p-1 mb-2 flex space-x-2 border rounded"
        >
            <div>
                <Image
                    src={icons[note.icon]}
                    alt={note.icon}
                    height={25}
                    width={25}
                />
            </div>
            <div
                className="w-full space-y-1"
            >
                <Link
                    href={`/note/view/${note._id}`}
                >
                    <h3 className="font-medium text-blue-500">{note.title}</h3>
                </Link>

                <div
                    className="flex space-x-2 pb-1 text-gray-400"
                >
                    <div
                        className="flex items-center space-x-1"
                    >
                        <CircleUserRound size={16} />
                        <span
                            className="text-xs"
                        >
                            {note?.user?.name}
                        </span>
                    </div>
                    <div
                        className="flex items-center space-x-1"
                    >
                        <CalendarDays size={14} />
                        <span
                            className="text-xs"
                        >
                            {new Date(note?.createdAt).toDateString()}
                        </span>
                    </div>
                </div>
                <div
                    className="flex flex-wrap space-x-1"
                >
                    {
                        note.keywords.map(keyword => (
                            <Link
                                key={keyword}
                                href={`/search/keywords?key=${keyword}`}
                            >
                                <span
                                    key={keyword}
                                    className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-full"
                                >
                                    {keyword}
                                </span>
                            </Link>

                        ))
                    }
                </div>
            </div>
        </div>
    )
}
