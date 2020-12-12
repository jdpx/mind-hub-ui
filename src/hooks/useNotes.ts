import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/client'

const UPDATE_COURSE_MUTATION = loader('./queries/UPDATE_COURSE_NOTE.gql')
const UPDATE_STEP_MUTATION = loader('./queries/UPDATE_STEP_NOTE.gql')

const useNotes = () => {
    const [updateCourseNote] = useMutation(UPDATE_COURSE_MUTATION)
    const [updateStepNote] = useMutation(UPDATE_STEP_MUTATION)

    return {
        updateCourseNote,
        updateStepNote,
    }
}

export default useNotes
