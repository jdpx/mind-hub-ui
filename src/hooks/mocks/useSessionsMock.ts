import { loader } from 'graphql.macro'
import faker from 'faker'

import { Session } from '../../types/session'
import { GraphQLError } from 'graphql'

const SESSION_QUERY = loader('../queries/GET_SESSION.gql')
const GET_COURSE_SESSIONS = loader('../queries/GET_COURSE_SESSIONS.gql')

export class MockGetSessionByCourseIDQuery {
    private courseId: string
    private sessions: Session[]
    private errors?: GraphQLError[]

    constructor() {
        this.courseId = faker.lorem.slug()
        this.sessions = []
    }

    WithCourseID = (id: string) => {
        this.courseId = id

        return this
    }

    WithSessions = (sessions: Session[]) => {
        this.sessions = sessions

        return this
    }

    WithError = (error: GraphQLError) => {
        this.errors = [error]

        return this
    }

    Build = () => {
        return {
            request: {
                query: GET_COURSE_SESSIONS,
                variables: {
                    id: this.courseId,
                },
            },
            result: {
                errors: this.errors,
                data: {
                    sessionsByCourseID: this.sessions,
                },
            },
        }
    }
}

export class MockGetSessionByIDQuery {
    private id: string
    private session?: Session
    private errors?: GraphQLError[]

    constructor() {
        this.id = faker.lorem.slug()
    }

    WithID = (id: string) => {
        this.id = id

        return this
    }

    WithSession = (session: Session) => {
        this.session = session

        return this
    }

    WithError = (error: GraphQLError) => {
        this.errors = [error]

        return this
    }

    Build = () => {
        return {
            request: {
                query: SESSION_QUERY,
                variables: {
                    id: this.id,
                },
            },
            result: {
                errors: this.errors,
                data: {
                    session: this.session,
                },
            },
        }
    }
}
