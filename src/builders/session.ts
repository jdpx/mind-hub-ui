import faker from 'faker'
import { Course } from 'types/course'
import { Step } from 'types/step'
import { Session as SesssionType } from 'types/session'

class Session {
    private id: string
    private title: string
    private description: string
    private course?: Course
    private steps: Step[]

    constructor() {
        this.id = '2'
        this.title = faker.lorem.words(2)
        this.description = faker.lorem.sentences(2)
        this.steps = []
    }

    WithID = (id: string) => {
        this.id = id

        return this
    }
    WithRandomID = () => {
        this.id = faker.lorem.slug()

        return this
    }

    WithCourse = (course: Course) => {
        this.course = course

        return this
    }

    WithStep = (step: Step) => {
        this.steps.push(step)

        return this
    }

    WithSteps = (steps: Step[]) => {
        this.steps = [...this.steps, ...steps]

        return this
    }

    Build = (): SesssionType => ({
        id: this.id,
        title: this.title,
        description: this.description,
        course: this.course,
        steps: this.steps,
    })
}

export function SessionBuilder() {
    return new Session()
}
