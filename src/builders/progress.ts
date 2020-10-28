import faker from 'faker'
import { Progress as ProgressType } from 'types/course'

class Progress {
    started: boolean
    sessionsCompleted: number

    constructor() {
        this.started = true
        this.sessionsCompleted = faker.random.number(2)
    }

    HasStarted(started: boolean) {
        this.started = started

        return this
    }

    SessionsCompleted(count: number) {
        this.sessionsCompleted = count

        return this
    }

    Build = (): ProgressType => ({
        started: this.started,
        sessionsCompleted: this.sessionsCompleted,
    })
}

export function ProgressBuilder() {
    return new Progress()
}
