import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import faker from 'faker'
import { MockedProvider } from '@apollo/client/testing'

import { CourseBuilder } from '../../builders/course'
import CourseInformation from './CourseInformation'
import { SessionBuilder } from '../../builders/session'
import { CourseProgressBuilder } from '../../builders/courseProgress'
import { MockGetSessionByCourseIDQuery } from '../../hooks/mocks/useSessionsMock'

describe('Course Information', () => {
    const session = SessionBuilder().WithRandomID().Build()
    const sessionTwo = SessionBuilder().WithRandomID().Build()
    const courseID = faker.lorem.slug()
    const course = CourseBuilder().WithID(courseID).WithSessions([session, sessionTwo]).Build()

    const onNoteSave = jest.fn()
    const onCourseStart = jest.fn()

    beforeEach(() => {
        onNoteSave.mockReset()
        onCourseStart.mockReset()
    })

    const props = {
        course,
        onNoteSave,
        onCourseStart,
    }

    const sessionMock = new MockGetSessionByCourseIDQuery()
        .WithCourseID(courseID)
        .WithSessions([session, sessionTwo])
        .Build()

    const mocks = [sessionMock]

    it('should render title', async () => {
        const { getByTestId } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CourseInformation {...props} />
            </MockedProvider>,
        )

        await waitFor(() => getByTestId('course-sessions'))
        expect(getByTestId('course-header').textContent).toEqual(course.title)
    })

    it('should description title', async () => {
        const { getByTestId } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CourseInformation {...props} />
            </MockedProvider>,
        )

        await waitFor(() => getByTestId('course-sessions'))
        expect(getByTestId('course-description').textContent).toEqual(course.description)
    })

    it('should render sessions', async () => {
        const { getByTestId } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CourseInformation {...props} />
            </MockedProvider>,
        )

        await waitFor(() => getByTestId('course-sessions'))

        const sessions = getByTestId('course-sessions').getElementsByClassName('course-session')
        expect(sessions).toHaveLength(2)
    })

    it('should show the start button', async () => {
        const newProps = {
            ...props,
            course,
        }

        const { queryByTestId, getByTestId } = render(
            <MockedProvider mocks={[sessionMock]} addTypename={false}>
                <CourseInformation {...newProps} />
            </MockedProvider>,
        )

        await waitFor(() => getByTestId('course-sessions'))

        expect(queryByTestId(`start-button`)).toBeInTheDocument()
    })

    describe('given there are no sessions', () => {
        it('renders no session available component', async () => {
            const sessionMock = new MockGetSessionByCourseIDQuery().WithCourseID(courseID).Build()

            const { getByTestId } = render(
                <MockedProvider mocks={[sessionMock]} addTypename={false}>
                    <CourseInformation {...props} />
                </MockedProvider>,
            )

            await waitFor(() => getByTestId('course-no-sessions'))

            expect(getByTestId('course-no-sessions')).toBeInTheDocument()
        })

        it('should not show the start button', async () => {
            const course = CourseBuilder().WithID(courseID).Build()
            const sessionMock = new MockGetSessionByCourseIDQuery().WithCourseID(courseID).Build()

            const newProps = {
                ...props,
                course,
            }

            const { queryByTestId, getByTestId } = render(
                <MockedProvider mocks={[sessionMock]} addTypename={false}>
                    <CourseInformation {...newProps} />
                </MockedProvider>,
            )

            await waitFor(() => getByTestId('course-no-sessions'))

            expect(queryByTestId(`start-button`)).not.toBeInTheDocument()
        })
    })

    describe('given the course has been started', () => {
        it('should render the start button with text being Continue', async () => {
            const progress = CourseProgressBuilder().Build()
            const course = CourseBuilder()
                .WithID(courseID)
                .WithSession(session)
                .WithProgress(progress)
                .Build()

            const newProps = {
                ...props,
                course,
            }

            const { getByTestId } = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <CourseInformation {...newProps} />
                </MockedProvider>,
            )

            await waitFor(() => getByTestId('course-sessions'))

            const btn = getByTestId('start-button')
            expect(btn).toHaveTextContent('Continue')
        })
    })

    describe('given the user clicks on the action button', () => {
        it('calls the onCourseStart prop', async () => {
            const { getByTestId } = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <CourseInformation {...props} />
                </MockedProvider>,
            )

            await waitFor(() => getByTestId('course-sessions'))

            const input = getByTestId('start-button-btn')
            fireEvent.click(input)

            expect(onCourseStart).toHaveBeenCalled()
        })
    })
})
