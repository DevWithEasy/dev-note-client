
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger
} from "@/components/ui/select"
import icons from "../../utils/icons"

export function SelectBookIcon({ icon,setIcon }) {
  const keys = Object.keys(icons)
  return (
    <Select
      onValueChange={(v)=>setIcon(v)}
    >
      <SelectTrigger className="w-[60px]">
        <img
          className="w-6 h-6"
          src={icons[icon]}
          alt={icon}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            keys.map((key) => (
              <SelectItem key={key} value={key}>
                <img
                  className="w-6 h-6"
                  src={icons[key]}
                  alt={key}
                />
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
