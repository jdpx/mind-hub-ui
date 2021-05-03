import { loader } from 'graphql.macro'
import faker from 'faker'

import { Step } from '../../types/step'
import { GraphQLError } from 'graphql'

const GET_STEP_BY_ID_QUERY = loader('../queries/GET_STEP_BY_ID.gql')

export class MockGetStepByIDQuery {
    private id: string
    private step?: Step
    private errors?: GraphQLError[]

    constructor() {
        this.id = faker.lorem.slug()
    }

    WithID = (id: string) => {
        this.id = id

        return this
    }

    WithStep = (step: Step) => {
        this.step = step

        return this
    }

    WithError = (error: GraphQLError) => {
        this.errors = [error]

        return this
    }

    Build = () => {
        return {
            request: {
                query: GET_STEP_BY_ID_QUERY,
                variables: {
                    id: this.id,
                },
            },
            result: {
                errors: this.errors,
                data: {
                    step: this.step,
                },
            },
        }
    }
}
