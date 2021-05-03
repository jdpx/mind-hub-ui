import React from 'react'
import faker from 'faker'
import { MockedProvider } from '@apollo/client/testing'
import { cleanup, render, waitFor } from '@testing-library/react'

import SessionList from './SessionList'

import { SessionBuilder } from '../../../builders/session'
import { GraphQLError } from 'graphql'
import { MockGetSessionByCourseIDQuery } from '../../../hooks/mocks/useSessionsMock'

describe('Course Session List', () => {
    const courseID = faker.lorem.slug()
    const session = SessionBuilder().WithRandomID().Build()
    const sessionTwo = SessionBuilder().WithRandomID().Build()

    afterEach(cleanup)

    const sessionMock = new MockGetSessionByCourseIDQuery()
        .WithCourseID(courseID)
        .WithSessions([session, sessionTwo])
        .Build()

    const mocks = [sessionMock]

    it('renders the loading panel', async () => {
        const { getByTestId } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <SessionList courseID={courseID} />
            </MockedProvider>,
        )

        expect(getByTestId('loading')).toBeInTheDocument()

        await waitFor(() => getByTestId('course-sessions'))

        expect(getByTestId('course-sessions')).toBeInTheDocument()
    })

    it('renders the course session list', async () => {
        const { getByTestId } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <SessionList courseID={courseID} />
            </MockedProvider>,
        )

        await waitFor(() => getByTestId('course-sessions'))
        const sessions = getByTestId('course-sessions').getElementsByClassName('course-session')
        expect(sessions).toHaveLength(2)
    })

    describe('given there are no sessions in the list', () => {
        const sessionMock = new MockGetSessionByCourseIDQuery().WithCourseID(courseID).Build()

        const mocks = [sessionMock]

        it('renders NoAvailableSessions', async () => {
            const { getByTestId } = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <SessionList courseID={courseID} />
                </MockedProvider>,
            )

            await waitFor(() => getByTestId('course-no-sessions'))
            expect(getByTestId('course-no-sessions')).toBeInTheDocument()
        })
    })

    describe('given an error occurs', () => {
        const sessionMock = new MockGetSessionByCourseIDQuery()
            .WithCourseID(courseID)
            .WithError(new GraphQLError('Error!'))
            .Build()

        const mocks = [sessionMock]

        it('render error panel', async () => {
            const { getByTestId } = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <SessionList courseID={courseID} />
                </MockedProvider>,
            )

            await waitFor(() => getByTestId('error-panel'))

            expect(getByTestId('error-panel')).toBeInTheDocument()
        })
    })
})
