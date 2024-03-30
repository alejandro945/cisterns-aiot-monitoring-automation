export type Measurement = {
    hostname: string
    timestamp: string
    pre: string // Last value
    raw: string //Pre-process
    value: string // Post-process
    rate: number // Rate of change
    error: string
}