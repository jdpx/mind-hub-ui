import faker from 'faker'
import { Session as SesssionType } from 'types/course'

class Session {
    id: string
    title: string
    description: string

    constructor() {
        this.id = '2'
        this.title = faker.lorem.words(2)
        this.description = faker.lorem.sentences(2)
    }

    ID = (id: string) => {
        this.id = id

        return this
    }

    Build = (): SesssionType => ({
        id: this.id,
        title: this.title,
        description: this.description,
    })
}

export function SessionBuilder() {
    return new Session()
}
