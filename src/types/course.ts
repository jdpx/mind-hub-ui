import { Session } from './session'

export interface Course {
    id: string
    title: string
    description: string

    sessionCount?: number
    stepCount?: number

    note?: CourseNote
    progress?: CourseProgress | null
    sessions?: Session[]
}

export interface CourseNote {
    id: string
    courseID?: string
    userID?: string
    value: string
}

export interface CourseProgress {
    id: string
    completedSteps?: number
    dateStarted?: number
}

export interface StepNote {
    id: string
    stepID?: string
    userID?: string
    value: string
}

export interface StepProgress {
    id: string
    dateStarted?: string
    dateCompleted?: string
}
