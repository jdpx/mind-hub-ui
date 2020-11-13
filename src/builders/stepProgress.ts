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

    Completed = () => {
        this.dateCompleted = faker.date.recent().toDateString()
        return this
    }

    SessionsStarted(date: string) {
        this.dateStarted = date

        return this
    }

    SessionsCompleted(date: string) {
        this.dateCompleted = date

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
