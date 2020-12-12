import faker from 'faker'
import { CourseNote as NoteType } from 'types/course'

class CourseNote {
    id: string
    value: string

    constructor() {
        this.id = '1'
        this.value = faker.lorem.words(2)
    }

    Value = (value: string) => {
        this.value = value
        return this
    }

    Build = (): NoteType => ({
        id: this.id,
        value: this.value,
    })
}

export function CourseNoteBuilder() {
    return new CourseNote()
}
