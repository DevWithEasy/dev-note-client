import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
const bookStore = (set)=>({
    books : [],
    notes : [],
    setCollection : (data) =>{
        set((state)=>({
            books : data.books,
            notes : data.notes
        }))
    },
    addBook : (book) =>{
        set((state)=>({
            books : [...state.books,book]
        }))
    },
    updateBook : (book) =>{
        set((state)=>({
            books : state.books.map((b)=>b._id === book._id? book : b)
        }))
    },
    deleteBook : (id) =>{
        set((state)=>({
            books : state.books.filter((b)=>b._id!==id)
        }))
    },
    addNote : (note) =>{
        set((state)=>({
            notes : [...state.notes,note]
        }))
    },
    updateNote : (note) =>{
        set((state)=>({
            notes : state.notes.map((n)=>n._id === note._id? note : n)
        }))
    },
    setDeleteNote : (id) =>{
        set((state)=>({
            notes : state.notes.filter((n)=>n._id!==id)
        }))
    },
    addBookNotes : (notes) =>{
        set((state)=>({
            notes : notes
        }))
    },
    setEditNote : (id,title) =>{
        console.log(id,title)
        set((state)=>({
            notes : state.notes.map((n)=>n._id === id? {...n,title} : n)
        }))
    },
    logout : () =>{
        set((state)=>({
            user : {}
        }))
    }
})
const useBookStore = create(
    devtools(
        persist(bookStore,{
            name : "dev-note-book",
        })
    )
)
export default useBookStore;