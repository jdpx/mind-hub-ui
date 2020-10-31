import React, { useState } from 'react'
import ActionButton from '../../components/ActionButton/ActionButton'
import { Session as SessionType } from '../../types/course'
import StepsProgress from './StepsProgress'

import './Session.scss'
import './Step.scss'
import { Left, Right } from '../../constants/buttons'
import CurrentStep from './Step'
import Title from './Title'

interface Props {
    session: SessionType
}

export default function Session({ session }: Props) {
    const { course, steps = [] } = session

    const [index, setIndex] = useState(0)
    const step = steps.length > 0 ? steps[index] : undefined

    const onNextClick = () => {
        setIndex(index + 1)
    }

    const onPreviousClick = () => {
        setIndex(index - 1)
    }

    return (
        <div className="container" data-test-id="session-information">
            <div className="session">
                <Title course={course} session={session} step={step} />
                <CurrentStep step={step} />
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
                            text="Next"
                            position={Right}
                            onClick={onNextClick}
                            disabled={index === steps.length - 1}
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
