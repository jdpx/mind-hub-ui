import { StepTypes } from './step'

export interface Course {
    id: string
    title: string
    description: string

    sessionCount?: number

    note?: Note
    progress?: Progress | null
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
}

export interface Note {
    id: string
    courseID?: string
    userID?: string
    value: string
}

export interface Progress {
    started?: boolean
    sessionsCompleted?: number
}
