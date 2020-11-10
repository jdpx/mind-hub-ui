import { useContext } from 'react'
import { ProgressContext } from '../context/progressContext'

const useProgress = () => {
    const [courseStartEvent] = useContext(ProgressContext)

    function startCourse(id: string) {
        courseStartEvent(id)
    }

    return {
        startCourse,
    }
}

export default useProgress
