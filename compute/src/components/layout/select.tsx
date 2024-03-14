"use client"
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Icons } from '@/components/ui/icons'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '../ui/command'
import { cn } from '@/lib/utils'
const groups = [
    {
        label: "Personal Account",
        teams: [
            {
                label: "Alicia Koch",
                value: "personal",
            },
        ],
    },
    {
        label: "Teams",
        teams: [
            {
                label: "Acme Inc.",
                value: "acme-inc",
            },
            {
                label: "Monsters Inc.",
                value: "monsters",
            },
        ],
    },
]

type Team = (typeof groups)[number]["teams"][number]

const CisternsSelect = () => {
    const [open, setOpen] = React.useState(false)
    const [selectedTeam, setSelectedTeam] = React.useState<Team>(
        groups[0].teams[0]
      )
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a team"
                    className={"w-[200px] justify-between"}
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
                    <Icons.caretSort className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search team..." />
                        <CommandEmpty>No team found.</CommandEmpty>
                        {groups.map((group) => (
                            <CommandGroup key={group.label} heading={group.label}>
                                {group.teams.map((team) => (
                                    <CommandItem
                                        key={team.value}
                                        onSelect={() => {
                                            setSelectedTeam(team)
                                            setOpen(false)
                                        }}
                                        className="text-sm"
                                    >
                                        <Avatar className="mr-2 h-5 w-5">
                                            <AvatarImage
                                                src={`https://avatar.vercel.sh/${team.value}.png`}
                                                alt={team.label}
                                                className="grayscale"
                                            />
                                            <AvatarFallback>SC</AvatarFallback>
                                        </Avatar>
                                        {team.label}
                                        <Icons.check
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                selectedTeam.value === team.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default CisternsSelect