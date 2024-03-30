import { ALERTTYPE } from "../enums/alert.enum"

export type Alert = {
    hostname: string
    type: ALERTTYPE
    value: string
}