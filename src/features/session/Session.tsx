import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ActionButton from '../../components/ActionButton/ActionButton'
import { Session as SessionType } from '../../types/session'
import StepsProgress from './StepsProgress'
import { Left, Right } from '../../constants/buttons'
import Title from './Title'

import './Session.scss'
import StepPanel from './Steps/StepPanel'

interface Props {
    session: SessionType
    currentStepId?: string
    redirectToStep: (id: string) => void
    markStepComplete: (id: string) => void
    onSessionCompleted: () => void
}

export default function Session({
    session,
    currentStepId,
    markStepComplete,
    redirectToStep,
    onSessionCompleted,
}: Props) {
    const { course, steps = [] } = session

    if (!currentStepId) {
        return <></>
    }

    const stepIndex = steps.findIndex((x) => x.id === currentStepId)

    if (stepIndex === -1) {
        return <></>
    }

    const step = steps.length > 0 ? steps[stepIndex] : undefined
    const isFirstStep = stepIndex === 0
    const isLastStep = stepIndex === steps.length - 1

    const onNextClick = () => {
        if (!!step) {
            markStepComplete(step.id)
        }

        if (isLastStep) {
            onSessionCompleted()
            return
        }
        redirectToStep(steps[stepIndex + 1].id)
    }

    const onPreviousClick = () => {
        redirectToStep(steps[stepIndex - 1].id)
    }

    return (
        <div className="container" data-test-id="session-information">
            <div className="session">
                <Title course={course} session={session} step={step} />
                <Switch>
                    <Route
                        path="/course/:courseId/session/:sessionId/step/:stepId"
                        exact
                        component={StepPanel}
                    />
                </Switch>
                <div className="session-navigation">
                    <div className="session-navigation-item">
                        <ActionButton
                            text="Previous"
                            position={Left}
                            onClick={onPreviousClick}
                            disabled={isFirstStep}
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
                    <StepsProgress steps={steps} currentIndex={stepIndex} />
                </div>
            </div>
        </div>
    )
}
