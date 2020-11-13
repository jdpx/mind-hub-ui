import { StepTypes } from './step'

export interface Course {
    id: string
    title: string
    description: string

    sessionCount?: number

    note?: CourseNote
    progress?: CourseProgress | null
    sessions?: Session[]
}

export interface Session {
    id: string
    title: string
    description: string

    steps?: Step[]
    course?: Course
}

export interface Step {
    id: string
    title: string
    description?: string
    type: StepTypes
    videoUrl?: string
    audioUrl?: string
    question?: string

    session?: Session
    note?: StepNote
    progress?: StepProgress | null
}

export interface CourseNote {
    id: string
    courseID?: string
    userID?: string
    value: string
}

export interface CourseProgress {
    id: string
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
