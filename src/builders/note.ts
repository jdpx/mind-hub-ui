import faker from 'faker'
import { Note as NoteType } from 'types/course'

class Note {
    id: string
    value: string

    constructor() {
        this.id = '1'
        this.value = faker.lorem.words(2)
    }

    Build = (): NoteType => ({
        id: this.id,
        value: this.value,
    })
}

export function NoteBuilder() {
    return new Note()
}
