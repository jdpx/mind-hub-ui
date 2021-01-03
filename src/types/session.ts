import { Course } from './course'
import { Step } from './step'

export interface Session {
    id: string
    title: string
    description: string

    steps?: Step[]
    course?: Course
}
