import { SelectGroup } from "@/types/CisternsGroups"


export const CisternService = {
    getCisterns: async (): Promise<SelectGroup[]> => {
        return new Promise((resolve, _) => resolve([
            {
                label: "Biblioteca",
                value: "personal",
            },

            {
                label: "Parqueadero L",
                value: "acme-inc",
            },
            {
                label: "Canchas",
                value: "monsters",
            },
        ],
        ))
    }
}