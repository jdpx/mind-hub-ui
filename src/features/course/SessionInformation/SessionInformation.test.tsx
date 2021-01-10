import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import faker from 'faker'

import { SessionBuilder } from '../../../builders/session'
import SessionInformation from './SessionInformation'
import { StepBuilder } from '../../../builders/step'

describe('Course Session Information', () => {
    const courseID = faker.lorem.slug()
    const step = StepBuilder().Build()
    const stepTwo = StepBuilder().Build()
    const session = SessionBuilder().WithSteps([step, stepTwo]).Build()

    it('should render the session title', () => {
        const testid = faker.lorem.slug()
        const { getByTestId } = render(
            <BrowserRouter>
                <SessionInformation courseID={courseID} session={session} testid={testid} />,
            </BrowserRouter>,
        )

        const titleElements = getByTestId(testid).getElementsByClassName('course-session-title')

        expect(titleElements[0].innerHTML).toEqual(session.title)
    })

    describe('when the session steps list is collapsed', () => {
        it('should not have expanded attribute', () => {
            const testid = faker.lorem.slug()
            const { getByTestId } = render(
                <BrowserRouter>
                    <SessionInformation courseID={courseID} session={session} testid={testid} />,
                </BrowserRouter>,
            )

            const sessionSection = getByTestId(testid)

            expect(sessionSection).toHaveAttribute('aria-expanded', 'false')
        })

        it('should render the down arrow', () => {
            const testid = faker.lorem.slug()
            const { getByTestId } = render(
                <BrowserRouter>
                    <SessionInformation courseID={courseID} session={session} testid={testid} />,
                </BrowserRouter>,
            )

            const downArrow = getByTestId('down-arrow')

            expect(downArrow).toBeInTheDocument()
        })

        it('should not render steps', () => {
            const testid = faker.lorem.slug()
            const { queryByTestId } = render(
                <BrowserRouter>
                    <SessionInformation courseID={courseID} session={session} testid={testid} />,
                </BrowserRouter>,
            )

            const items = queryByTestId('course-session-steps')

            expect(items).not.toBeInTheDocument()
        })
    })

    describe('when the session steps list is expanded', () => {
        it('should have expanded attribute', () => {
            const testid = faker.lorem.slug()
            const { getByTestId } = render(
                <BrowserRouter>
                    <SessionInformation courseID={courseID} session={session} testid={testid} />,
                </BrowserRouter>,
            )

            const sessionSection = getByTestId(testid)

            fireEvent.click(sessionSection)

            expect(sessionSection).toHaveAttribute('aria-expanded', 'true')
        })

        it('should render the up arrow', () => {
            const testid = faker.lorem.slug()
            const { getByTestId } = render(
                <BrowserRouter>
                    <SessionInformation courseID={courseID} session={session} testid={testid} />,
                </BrowserRouter>,
            )

            const sessionSection = getByTestId(testid)

            fireEvent.click(sessionSection)

            const upArrow = getByTestId('up-arrow')

            expect(upArrow).toBeInTheDocument()
        })

        it('should render steps', () => {
            const testid = faker.lorem.slug()
            const { getByTestId } = render(
                <BrowserRouter>
                    <SessionInformation courseID={courseID} session={session} testid={testid} />,
                </BrowserRouter>,
            )

            const sessionSection = getByTestId(testid)

            fireEvent.click(sessionSection)

            const items = getByTestId('course-session-steps').getElementsByClassName(
                'course-session-step',
            )

            expect(items).toHaveLength(2)
        })

        describe('given there are no steps for the session', () => {
            it('should render the No Sessions component', () => {
                const testid = faker.lorem.slug()
                const session = SessionBuilder().Build()

                const { getByTestId } = render(
                    <BrowserRouter>
                        <SessionInformation courseID={courseID} session={session} testid={testid} />
                    </BrowserRouter>,
                )

                const sessionSection = getByTestId(testid)

                fireEvent.click(sessionSection)

                expect(getByTestId('no-steps')).toBeInTheDocument()
            })
        })
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
