import icons from '@/utils/icons'
import Image from 'next/image'
import React from 'react'

export default function IconSelectView({ icon, iconHandler }) {
    const keys = Object.keys(icons)
    return (
        <div
            className='fixed top-0 h-screen w-full flex justify-center items-center bg-gray-500/50'
        >
            <div
                className='p-4 grid grid-cols-6 gap-4 bg-white rounded'
            >
                {
                    keys.map((key) => (
                        <div
                            key={key}
                            className={`border p-1 rounded hover:scale-110 transition-all duration-300 cursor-pointer ${icon === key ? 'border-blue-500' : ''}`}
                            onClick={()=>iconHandler(key)}
                        >
                            <Image
                                src={icons[key]}
                                alt={key}
                                height={30}
                                width={30}
                            />
                        </div>

                    ))
                }
            </div>
        </div>
    )
}
