import faker from 'faker'
import { Course as CourseType, CourseProgress, Session } from 'types/course'

class Course {
    id: string
    title: string
    description: string
    sessions: Session[]
    progress?: CourseProgress
    sessionCount?: number

    constructor() {
        this.id = '1'
        this.title = faker.lorem.words(2)
        this.description = faker.lorem.sentences(2)
        this.sessions = []
        this.sessionCount = faker.random.number(10)
    }

    WithID(id: string) {
        this.id = id
        return this
    }

    WithTitle(title: string) {
        this.title = title
        return this
    }

    WithSession(session: Session) {
        this.sessions.push(session)

        return this
    }

    WithSessions(sessions: Session[]) {
        this.sessions.push(...sessions)

        return this
    }

    WithProgress(progress: CourseProgress) {
        this.progress = progress

        return this
    }

    Build = (): CourseType => ({
        id: this.id,
        title: this.title,
        description: this.description,
        sessions: this.sessions,
        progress: this.progress,
    })
}

export function CourseBuilder() {
    return new Course()
}
