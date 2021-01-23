import { loader } from 'graphql.macro'
import faker from 'faker'

import { Course } from '../../types/course'
import { GraphQLError } from 'graphql'

const GET_COURSES_QUERY = loader('../queries/GET_COURSES.gql')
const GET_COURSE_BY_ID = loader('../queries/GET_COURSE_BY_ID.gql')

export class MockGeAllQuery {
    private courses: Course[]
    private errors?: GraphQLError[]

    constructor() {
        this.courses = []
    }

    WithCourses = (courses: Course[]) => {
        this.courses = courses

        return this
    }

    WithError = (error: GraphQLError) => {
        this.errors = [error]

        return this
    }

    Build = () => {
        return {
            request: {
                query: GET_COURSES_QUERY,
            },
            result: {
                errors: this.errors,
                data: {
                    courses: this.courses,
                },
            },
        }
    }
}

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
        return {
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
    }
}
