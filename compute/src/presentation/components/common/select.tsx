"use client"
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Icons } from '@/presentation/components/ui/icons'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { cn } from '@/presentation/lib/utils'
import { SelectGroup } from '@/domain/dto/in/CisternsGroups'
import { NAVBAR } from '@/presentation/constants/menu.constants'
import { Check, ChevronsUpDown } from 'lucide-react'


const CisternsSelect: React.FC<{ groups: SelectGroup[] }> = ({ groups }) => {
    const [open, setOpen] = React.useState(false)
    const [selectedTeam, setSelectedTeam] = React.useState(groups[0])
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label={NAVBAR.select.placeholder}
                    className={"w-full sm:w-[200px] justify-between"}
                >
                    <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                            src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
                            alt={selectedTeam.label}
                            className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {selectedTeam.label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder={NAVBAR.select.search} />
                        <CommandEmpty>{NAVBAR.select.empty}</CommandEmpty>
                        <CommandGroup>
                            {groups.map((group) => (
                                <CommandItem
                                    key={group.value}
                                    value={group.value}
                                    onSelect={() => {
                                        setSelectedTeam(group)
                                        setOpen(false)
                                    }}
                                    className="text-sm"
                                >
                                    <Avatar className="mr-2 h-5 w-5">
                                        <AvatarImage
                                            src={`https://avatar.vercel.sh/${group.value}.png`}
                                            alt={group.label}
                                            className="grayscale"
                                        />
                                        <AvatarFallback>SC</AvatarFallback>
                                    </Avatar>
                                    {group.label}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            selectedTeam.value === group.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                    />
                                </CommandItem>
                            ))
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default CisternsSelect