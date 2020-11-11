import React from 'react'
import { render } from '@testing-library/react'

import { StepBuilder } from '../../../builders/step'
import SessionStep from './SessionStep'
import { StepProgressBuilder } from '../../../builders/stepProgress'

describe('Session Step', () => {
    const progress = StepProgressBuilder().Build()
    const step = StepBuilder().WithProgress(progress).Build()

    it('should display the step title', () => {
        const { getByTestId } = render(<SessionStep step={step} />)

        const element = getByTestId(`session-step-${step.id}`)
        const titleDiv = element.getElementsByClassName('course-session-step-title')

        expect(titleDiv[0].innerHTML).toEqual(step.title)
    })

    describe('given the step has progress', () => {
        it('should render with the completed class', () => {
            const { getByTestId } = render(<SessionStep step={step} />)

            expect(getByTestId(`session-step-${step.id}`)).toHaveClass('completed')
        })
    })
})
