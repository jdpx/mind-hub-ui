import faker from 'faker'
import { Course as CourseType } from 'types/course'

class Course {
    id: string
    title: string
    description: string

    constructor() {
        this.id = '1'
        this.title = faker.lorem.words(2)
        this.description = faker.lorem.sentences(2)
    }

    Build = (): CourseType => ({
        id: this.id,
        title: this.title,
        description: this.description,
    })
}

export function CourseBuilder() {
    return new Course()
}
