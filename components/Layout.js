'use client'
import React from 'react'
import Header from './Header'

export default function Layout({ children }) {
    return (
        <div
            className="h-screen"
        >
            <Header />
            <div
                className="h-[calc(100%-48px)] overflow-y-auto"
            >
                {children}
            </div>
        </div>
    )
}
