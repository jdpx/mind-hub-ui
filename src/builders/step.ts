import faker from 'faker'
import { Course, StepProgress } from 'types/course'
import { Step as StepType } from 'types/step'
import { Question } from '../constants/steps'
import { StepTypes } from '../types/step'

class Step {
    private id: string
    private title: string
    private description: string
    private course?: Course
    private steps: Step[]
    private type: StepTypes
    private progress?: StepProgress

    constructor() {
        this.id = faker.lorem.slug()
        this.title = faker.lorem.words(2)
        this.description = faker.lorem.sentences(2)
        this.type = Question
        this.steps = []
    }

    WithID = (id: string) => {
        this.id = id

        return this
    }

    WithType(type: StepTypes) {
        this.type = type

        return this
    }

    WithTitle(title: string) {
        this.title = title
        return this
    }

    WithProgress(progress: StepProgress) {
        this.progress = progress

        return this
    }

    Build = (): StepType => ({
        id: this.id,
        title: this.title,
        description: this.description,
        type: this.type,
        progress: this.progress,
    })
}

export function StepBuilder() {
    return new Step()
}
