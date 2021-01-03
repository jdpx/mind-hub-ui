import { Session } from './session'
import { Question, Video, Audio } from '../constants/steps'
import { StepNote, StepProgress } from './course'

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

export type StepTypes = typeof Video | typeof Audio | typeof Question
