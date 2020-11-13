import React from 'react'
import { render } from '@testing-library/react'

import { StepBuilder } from '../../../builders/step'
import SessionStep from './SessionStep'
import { StepProgressBuilder } from '../../../builders/stepProgress'

describe('Session Step', () => {
    const step = StepBuilder().Build()

    it('should display the step title', () => {
        const { getByTestId } = render(<SessionStep step={step} />)

        const element = getByTestId(`session-step-${step.id}`)
        const titleDiv = element.getElementsByClassName('course-session-step-title')

        expect(titleDiv[0].innerHTML).toEqual(step.title)
    })

    it('should not be rendered with the compelted class', () => {
        const { getByTestId } = render(<SessionStep step={step} />)

        expect(getByTestId(`session-step-${step.id}`)).not.toHaveClass('completed')
    })

    describe('given the step has progress', () => {
        const progress = StepProgressBuilder().Completed().Build()
        const step = StepBuilder().WithProgress(progress).Build()

        describe('given the step has been completed', () => {
            it('should render with the completed class', () => {
                const { getByTestId } = render(<SessionStep step={step} />)

                expect(getByTestId(`session-step-${step.id}`)).toHaveClass('completed')
            })
        })
    })
})
