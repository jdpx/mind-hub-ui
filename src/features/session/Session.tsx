import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { loader } from 'graphql.macro'

import ActionButton from '../../components/ActionButton/ActionButton'
import { Session as SessionType } from '../../types/course'
import StepsProgress from './StepsProgress'
import { Left, Right } from '../../constants/buttons'
import CurrentStep from './Steps/StepPanel'
import Title from './Title'

import './Session.scss'
import useProgress from '../../hooks/useProgress'

const UPDATE_COURSE_MUTATION = loader('./UPDATE_STEP_NOTE.gql')

interface Props {
    session: SessionType
}

export default function Session({ session }: Props) {
    const { course, steps = [] } = session
    const history = useHistory()
    const { completeStep } = useProgress()

    const [index, setIndex] = useState(0)
    const step = steps.length > 0 ? steps[index] : undefined

    const isLastStep = index === steps.length - 1

    const [updateCourseNote] = useMutation(UPDATE_COURSE_MUTATION)

    const handleStepNoteSave = (value: string) => {
        if (!step) {
            return
        }

        updateCourseNote({ variables: { stepID: step.id, value: value } })
    }

    const onNextClick = () => {
        if (!!step) {
            completeStep(step.id)
        }

        if (isLastStep) {
            history.push(`/course/${course?.id}/session/${session.id}/completed`)
        } else {
            setIndex(index + 1)
        }
    }

    const onPreviousClick = () => {
        setIndex(index - 1)
    }

    return (
        <div className="container" data-test-id="session-information">
            <div className="session">
                <Title course={course} session={session} step={step} />
                <CurrentStep step={step} handleNoteSave={handleStepNoteSave} />
                <div className="session-navigation">
                    <div className="session-navigation-item">
                        <ActionButton
                            text="Previous"
                            position={Left}
                            onClick={onPreviousClick}
                            disabled={index === 0}
                            testid="session-previous"
                        />
                    </div>
                    <div className="session-navigation-item">
                        <ActionButton
                            text={isLastStep ? 'Finish' : 'Next'}
                            position={Right}
                            onClick={onNextClick}
                            testid="session-next"
                        />
                    </div>
                </div>
                <div className="session-navigation-progress">
                    <StepsProgress steps={steps} currentIndex={index} />
                </div>
            </div>
        </div>
    )
}
