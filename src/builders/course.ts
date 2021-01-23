import faker from 'faker'
import { Course as CourseType, CourseProgress } from 'types/course'
import { Session } from 'types/session'

class Course {
    private id: string
    private title: string
    private description: string
    private sessions: Session[]
    private progress?: CourseProgress
    private sessionCount?: number

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

    WithRandomID() {
        this.id = faker.lorem.slug()

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
        sessionCount: this.sessionCount,
    })
}

export function CourseBuilder() {
    return new Course()
}
