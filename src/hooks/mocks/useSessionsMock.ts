import { loader } from 'graphql.macro'
import faker from 'faker'

import { Session } from '../../types/course'
import { GraphQLError } from 'graphql'

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
