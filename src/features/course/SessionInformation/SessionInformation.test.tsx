import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import faker from 'faker'

import { SessionBuilder } from '../../../builders/session'
import SessionInformation from './SessionInformation'
import { StepBuilder } from '../../../builders/step'

describe('Session Information', () => {
    const courseID = faker.lorem.slug()
    const step = StepBuilder().Build()
    const stepTwo = StepBuilder().Build()
    const session = SessionBuilder().WithSteps([step, stepTwo]).Build()

    it('should render a link to the session', () => {
        const testid = faker.lorem.slug()
        const { getByTestId } = render(
            <BrowserRouter>
                <SessionInformation courseID={courseID} session={session} testid={testid} />,
            </BrowserRouter>,
        )

        expect(getByTestId(testid)).toHaveAttribute(
            'href',
            `/course/${courseID}/session/${session.id}`,
        )
    })

    it('it renders a list of steps', () => {
        const testid = faker.lorem.slug()
        const { getByTestId } = render(
            <BrowserRouter>
                <SessionInformation courseID={courseID} session={session} testid={testid} />,
            </BrowserRouter>,
        )

        const items = getByTestId('course-session-steps').getElementsByClassName(
            'course-session-step',
        )

        expect(items.length).toEqual(2)
    })

    describe('given the alternate prop is passed in', () => {
        it('should render the link with the alternate class', () => {
            const testid = faker.lorem.slug()
            const { getByTestId } = render(
                <BrowserRouter>
                    <SessionInformation
                        alternate
                        courseID={courseID}
                        session={session}
                        testid={testid}
                    />
                </BrowserRouter>,
            )

            expect(getByTestId(testid)).toHaveClass('alternate')
        })
    })
})
