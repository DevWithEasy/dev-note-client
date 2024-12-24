import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function NavigationSheet({isOpen, setIsOpen,children}) {
  return (
    <Sheet
        open={isOpen}
        onOpenChange={()=>setIsOpen(!isOpen)}
    >
      <SheetTrigger asChild>
        <button  onClick={()=>setIsOpen(true)}><Menu/></button>
      </SheetTrigger>
      <SheetContent side='left'>
        {children}
      </SheetContent>
    </Sheet>
  )
}