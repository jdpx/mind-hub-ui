import React from 'react'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/client'

const COURSE_START_MUTATION = loader('./COURSE_START_MUTATION.gql')

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

    const startCourse = (id: string) => {
        courseStartEvent({ variables: { courseID: id } })
    }

    return <ProgressContext.Provider value={[startCourse]}>{children}</ProgressContext.Provider>
}
