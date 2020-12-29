import React from 'react'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/client'

const COURSE_START_MUTATION = loader('./mutations/COURSE_START_MUTATION.gql')
const STEP_START_MUTATION = loader('./mutations/STEP_START_MUTATION.gql')
const STEP_COMPLETE_MUTATION = loader('./mutations/STEP_COMPLETE_MUTATION.gql')

export const ProgressContext = React.createContext([
    (opts: any) => {
        // something
    },
])

interface Props {
    children: React.ReactNode
}

export default function ProgressContextProvider({ children }: Props) {
    const [courseStartEvent] = useMutation(COURSE_START_MUTATION, {
        ignoreResults: true,
    })

    const [stepStartEvent] = useMutation(STEP_START_MUTATION, {
        ignoreResults: true,
    })

    const [stepCompleteEvent] = useMutation(STEP_COMPLETE_MUTATION, {
        ignoreResults: true,
    })

    const startCourse = (id: string) => {
        courseStartEvent({ variables: { courseID: id } })
    }

    const startStep = (id: string) => {
        stepStartEvent({ variables: { stepID: id } })
    }

    const completeStep = (id: string) => {
        stepCompleteEvent({ variables: { stepID: id } })
    }

    return (
        <ProgressContext.Provider value={[startCourse, startStep, completeStep]}>
            {children}
        </ProgressContext.Provider>
    )
}
