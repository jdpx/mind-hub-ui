import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/client'

const UPDATE_COURSE_MUTATION = loader('./queries/UPDATE_COURSE_NOTE.gql')
const UPDATE_STEP_MUTATION = loader('./queries/UPDATE_STEP_NOTE.gql')

const useNotes = () => {
    const [saveCourseNote] = useMutation(UPDATE_COURSE_MUTATION)
    const [saveStepNote] = useMutation(UPDATE_STEP_MUTATION)

    const updateCourseNote = (id: string, value: string) => {
        saveCourseNote({ variables: { courseID: id, value: value } })
    }

    const updateStepNote = (id: string, value: string) => {
        saveStepNote({ variables: { stepID: id, value: value } })
    }

    return {
        updateCourseNote,
        updateStepNote,
    }
}

export default useNotes
