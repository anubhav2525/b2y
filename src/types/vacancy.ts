export interface ShiftDetails {
    type: 'Day' | 'Night' | 'Rotational'
    startTime: string
    endTime: string
}

export interface ShiftFormData {
    shiftDetails: ShiftDetails
}

