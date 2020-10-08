import React, { Dispatch, useState } from 'react'
import { render } from '@testing-library/react'
import faker from 'faker'

import { SessionBuilder } from '../../builders/session'
import Session from './Session'
import { CourseBuilder } from '../../builders/course'
import { StepBuilder } from '../../builders/step'
import Mock from '../../helpers/testing/mockType'
import { Audio, Video } from '../../constants/steps'

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}))

const mockUseState = useState as jest.MockedFunction<typeof useState>

describe('Session', () => {
    const courseTitle = faker.lorem.sentence()
    const course = CourseBuilder().WithTitle(courseTitle).Build()

    const stepTitle = faker.lorem.sentence()
    const step = StepBuilder().WithTitle(stepTitle).Build()
    const stepTwo = StepBuilder().WithType(Video).Build()
    const stepThree = StepBuilder().WithType(Audio).Build()

    const session = SessionBuilder()
        .WithCourse(course)
        .WithSteps([step, stepTwo, stepThree])
        .Build()

    beforeEach(() => {
        mockUseState.mockReturnValue(
            Mock<[unknown, Dispatch<unknown>]>([0]),
        )
    })

    describe('given there are steps', () => {
        it('should render the sesson header', () => {
            const { getByTestId } = render(<Session session={session} />)

            expect(getByTestId('session-header')).toHaveTextContent(
                `${courseTitle} - ${session.title} - ${stepTitle}`,
            )
        })
    })

    describe('given a Question step is selected', () => {
        beforeEach(() => {
            mockUseState.mockReturnValue(
                Mock<[unknown, Dispatch<unknown>]>([0]),
            )
        })
        it('renders the question step panel', () => {
            const { getByTestId } = render(<Session session={session} />)

            expect(getByTestId(`question-step-${step.id}`)).toBeInTheDocument()
        })
    })

    describe('given a Video step is selected', () => {
        beforeEach(() => {
            mockUseState.mockReturnValue(
                Mock<[unknown, Dispatch<unknown>]>([1]),
            )
        })
        it('renders the question step panel', () => {
            const { getByTestId } = render(<Session session={session} />)

            expect(getByTestId(`video-step-${step.id}`)).toBeInTheDocument()
        })
    })

    describe('given a Audio step is selected', () => {
        beforeEach(() => {
            mockUseState.mockReturnValue(
                Mock<[unknown, Dispatch<unknown>]>([2]),
            )
        })
        it('renders the question step panel', () => {
            const { getByTestId } = render(<Session session={session} />)

            expect(getByTestId(`audio-step-${step.id}`)).toBeInTheDocument()
        })
    })

    describe('given the first step is selected', () => {
        beforeEach(() => {
            mockUseState.mockReturnValue(
                Mock<[unknown, Dispatch<unknown>]>([0]),
            )
        })

        it('should render disabled on previous button', () => {
            const { getByTestId } = render(<Session session={session} />)
            expect(getByTestId('session-previous-btn')).toBeDisabled()
        })

        it('should not render disabled on next button', () => {
            const { getByTestId } = render(<Session session={session} />)
            expect(getByTestId('session-next-btn')).not.toBeDisabled()
        })
    })

    describe('given neither the beginning or end steps are selected', () => {
        beforeEach(() => {
            mockUseState.mockReturnValue(
                Mock<[unknown, Dispatch<unknown>]>([1]),
            )
        })

        it('should not render disabled on previous button', () => {
            const { getByTestId } = render(<Session session={session} />)
            expect(getByTestId('session-previous-btn')).not.toBeDisabled()
        })

        it('should not render disabled on next button', () => {
            const { getByTestId } = render(<Session session={session} />)
            expect(getByTestId('session-next-btn')).not.toBeDisabled()
        })
    })

    describe('given the last step is selected', () => {
        beforeEach(() => {
            mockUseState.mockReturnValue(
                Mock<[unknown, Dispatch<unknown>]>([2]),
            )
        })

        it('should not render disabled on previous button', () => {
            const { getByTestId } = render(<Session session={session} />)
            expect(getByTestId('session-previous-btn')).not.toBeDisabled()
        })

        it('should render disabled on next button', () => {
            const { getByTestId } = render(<Session session={session} />)
            expect(getByTestId('session-next-btn')).toBeDisabled()
        })
    })
})
