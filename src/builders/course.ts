import faker from 'faker'
import { Course as CourseType, Session } from 'types/course'

class Course {
    id: string
    title: string
    description: string
    sessions: Session[]

    constructor() {
        this.id = '1'
        this.title = faker.lorem.words(2)
        this.description = faker.lorem.sentences(2)
        this.sessions = []
    }

    WithSession(session: Session) {
        this.sessions.push(session)

        return this
    }

    Build = (): CourseType => ({
        id: this.id,
        title: this.title,
        description: this.description,
        sessions: this.sessions,
    })
}

export function CourseBuilder() {
    return new Course()
}
