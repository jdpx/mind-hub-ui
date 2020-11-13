import faker from 'faker'
import { StepProgress as ProgressType } from 'types/course'

class StepProgress {
    id: string
    dateStarted: string
    dateCompleted: string

    constructor() {
        this.id = faker.lorem.slug()
        this.dateStarted = faker.date.recent().toDateString()
        this.dateCompleted = ''
    }

    WithID(id: string) {
        this.id = id

        return this
    }

    SessionsCompleted(count: string) {
        this.dateStarted = count

        return this
    }

    Build = (): ProgressType => ({
        id: this.id,
        dateStarted: this.dateStarted,
        dateCompleted: this.dateCompleted,
    })
}

export function StepProgressBuilder() {
    return new StepProgress()
}
