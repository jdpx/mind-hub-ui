export interface Course {
    id: string
    title: string
    description: string

    sessions?: Session[]
}

export interface Session {
    id: string
    title: string

    course?: Course
}
