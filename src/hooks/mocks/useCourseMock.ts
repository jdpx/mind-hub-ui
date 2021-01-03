import { loader } from 'graphql.macro'
import faker from 'faker'

import { Course } from '../../types/course'
import { GraphQLError } from 'graphql'

const GET_COURSE_BY_ID = loader('../queries/GET_COURSE_BY_ID.gql')

export class MockGetCourseByIDQuery {
    private id: string
    private course?: Course
    private errors?: GraphQLError[]

    constructor() {
        this.id = faker.lorem.slug()
    }

    WithID = (id: string) => {
        this.id = id

        return this
    }

    WithCourse = (course: Course) => {
        this.course = course

        return this
    }

    WithError = (error: GraphQLError) => {
        this.errors = [error]

        return this
    }

    Build = () => {
        const foo = {
            request: {
                query: GET_COURSE_BY_ID,
                variables: {
                    id: this.id,
                },
            },
            result: {
                errors: this.errors,
                dataa: {
                    course: this.course,
                },
            },
        }

        return foo
    }
}
