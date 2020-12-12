import { useContext } from 'react'

import { ProgressContext } from '../context/progressContext'

const useProgress = () => {
    const [startCourse, startStep, completeStep] = useContext(ProgressContext)

    return {
        startCourse,
        startStep,
        completeStep,
    }
}

export default useProgress
