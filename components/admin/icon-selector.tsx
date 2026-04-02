"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Common icons for a tech/corporate site
const COMMON_ICONS = Array.from(new Set([
  "Cpu", "HardDrive", "MemoryStick", "Settings", "Shield", "Zap", "Award", "FileText",
  "Monitor", "PcCase", "Laptop", "Gamepad2", "Tv", "Keyboard", "Mouse",
  "Headset", "Server", "Network", "Database", "Cloud", "Lock", "Unlock", "Key",
  "User", "Users", "Briefcase", "Building", "Phone", "Mail", "Globe", "CheckCircle2",
  "AlertCircle", "Info", "HelpCircle", "Star", "Heart", "ThumbsUp", "Rocket",
  "Send", "Activity", "BarChart", "LineChart", "PieChart", "Layers"
]))

interface IconSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function IconSelector({ value, onChange }: IconSelectorProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const IconComponent = (LucideIcons as any)[value] || LucideIcons.HelpCircle

  const filteredIcons = COMMON_ICONS.filter(icon => 
    icon.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white/5 border-white/10 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2">
            <IconComponent className="h-4 w-4 text-primary" />
            <span className="truncate">{value || "Selecionar ícone..."}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 bg-card border-border shadow-xl backdrop-blur-xl">
        <Command className="bg-transparent">
          <CommandInput 
            placeholder="Procurar ícone..." 
            value={search}
            onValueChange={setSearch}
            className="h-9 border-none focus:ring-0"
          />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>Nenhum ícone encontrado.</CommandEmpty>
            <CommandGroup>
              {filteredIcons.map((iconName) => {
                const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle
                return (
                  <CommandItem
                    key={iconName}
                    value={iconName}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                    className="flex items-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors"
                  >
                    <Icon className={cn(
                      "h-4 w-4",
                      value === iconName ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className="flex-1">{iconName}</span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === iconName ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
