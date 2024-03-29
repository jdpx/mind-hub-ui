import faker from 'faker'
import { CourseProgress as ProgressType } from 'types/course'

class CourseProgress {
    id: string
    dateStarted: number

    constructor() {
        this.id = faker.lorem.slug()
        this.dateStarted = faker.random.number(2)
    }

    WithID(id: string) {
        this.id = id

        return this
    }

    SessionsCompleted(count: number) {
        this.dateStarted = count

        return this
    }

    Build = (): ProgressType => ({
        id: this.id,
        dateStarted: this.dateStarted,
    })
}

export function CourseProgressBuilder() {
    return new CourseProgress()
}
