import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ActionButton from '../../components/ActionButton/ActionButton'
import { Session as SessionType } from '../../types/session'
import StepsProgress from './StepsProgress'
import { Left, Right } from '../../constants/buttons'
import Title from './Title'

import './Session.scss'
import StepPanel from './Steps/StepPanel'
import NoAvailableSteps from './Steps/NoAvailableSteps'

interface Props {
    session: SessionType
    currentStepId?: string
    redirectToStep: (id: string) => void
    markStepComplete: (id: string) => void
    onSessionCompleted: () => void
    redirectToNotFound: () => void
}

export default function Session({
    session,
    currentStepId,
    markStepComplete,
    redirectToStep,
    onSessionCompleted,
}: Props) {
    const { course, steps = [] } = session

    const stepIndex = steps.findIndex((x) => x.id === currentStepId)

    const hasSteps = steps.length > 0
    const currentStep = hasSteps ? steps[stepIndex] : undefined
    const isFirstStep = stepIndex === 0
    const isLastStep = stepIndex === steps.length - 1

    const onNextClick = () => {
        if (!!currentStep) {
            markStepComplete(currentStep.id)
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
                {!hasSteps ? (
                    // Keeping this as a place holder for all steps not being available yet
                    <NoAvailableSteps />
                ) : (
                    <>
                        <Title course={course} session={session} step={currentStep} />
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
                            <div className="session-navigation-progress">
                                <StepsProgress steps={steps} currentIndex={stepIndex} />
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
                    </>
                )}
            </div>
        </div>
    )
}
