import faker from 'faker'

import { renderHook, act } from '@testing-library/react-hooks'
import useSessions from './useSessions'
import { GraphQLError } from 'graphql'
import { wrapHook } from '../helpers/testing/hookWrapper'
import { SessionBuilder } from '../builders/session'
import { MockGetSessionByCourseIDQuery, MockGetSessionByIDQuery } from './mocks/useSessionsMock'

describe('useSessions', () => {
    describe('useGetByID', () => {
        const id = faker.lorem.slug()
        const mockSession = SessionBuilder().WithID(id).Build()

        describe('given the api returns successfully', () => {
            it('returns the session', async () => {
                const sessionMock = new MockGetSessionByIDQuery()
                    .WithID(id)
                    .WithSession(mockSession)
                    .Build()
                const { result: hook } = renderHook(() => useSessions())

                const { result, waitFor, unmount } = wrapHook(hook.current.useGetByID, [
                    sessionMock,
                ])
                const { get, loading, session, error } = result.current

                expect(get).toBeTruthy()
                expect(loading).toEqual(true)
                expect(session).toBeUndefined()
                expect(error).toBeUndefined()

                act(() => {
                    get()
                })

                waitFor(
                    () => {
                        expect(loading).toEqual(false)
                        expect(session).toEqual(mockSession)
                        expect(error).toEqual(false)
                    },
                    { timeout: 100 },
                )

                unmount()
            })
        })

        describe('given the api returns an error', () => {
            it('returns the error', () => {
                const sessionMock = new MockGetSessionByIDQuery()
                    .WithID(id)
                    .WithError(new GraphQLError('something happened'))
                    .Build()

                const { result: hook } = renderHook(() => useSessions())

                const { result, waitFor, unmount } = wrapHook(hook.current.useGetByID, [
                    sessionMock,
                ])
                const { get, loading, session, error } = result.current

                expect(get).toBeTruthy()
                expect(loading).toEqual(true)
                expect(session).toBeUndefined()
                expect(error).toBeUndefined()

                act(() => {
                    get()
                })

                waitFor(
                    () => {
                        expect(loading).toEqual(false)
                        expect(session).toBeUndefined()
                        expect(error).toEqual(false)
                    },
                    { timeout: 100 },
                )
                unmount()
            })
        })
    })

    describe('useGetByCourseID', () => {
        const courseId = faker.lorem.slug()
        const mockSession = SessionBuilder().Build()

        describe('given the api returns successfully', () => {
            it('returns the session', async () => {
                const sessionMock = new MockGetSessionByCourseIDQuery()
                    .WithCourseID(courseId)
                    .WithSessions([mockSession])
                    .Build()
                const { result: hook } = renderHook(() => useSessions())

                const { result, waitFor, unmount } = wrapHook(hook.current.useGetByCourseID, [
                    sessionMock,
                ])
                const { get, loading, sessions, error } = result.current

                expect(get).toBeTruthy()
                expect(loading).toEqual(true)
                expect(sessions).toEqual([])
                expect(error).toBeUndefined()

                act(() => {
                    get()
                })

                waitFor(
                    () => {
                        expect(loading).toEqual(false)
                        expect(sessions).toEqual([mockSession])
                        expect(error).toEqual(false)
                    },
                    { timeout: 100 },
                )

                unmount()
            })
        })

        describe('given the api returns an error', () => {
            it('returns the error', () => {
                const sessionMock = new MockGetSessionByCourseIDQuery()
                    .WithCourseID(courseId)
                    .WithError(new GraphQLError('something happened'))
                    .Build()

                const { result: hook } = renderHook(() => useSessions())

                const { result, waitFor, unmount } = wrapHook(hook.current.useGetByCourseID, [
                    sessionMock,
                ])
                const { get, loading, sessions, error } = result.current

                expect(get).toBeTruthy()
                expect(loading).toEqual(true)
                expect(sessions).toEqual([])
                expect(error).toBeUndefined()

                act(() => {
                    get()
                })

                waitFor(
                    () => {
                        expect(loading).toEqual(false)
                        expect(sessions).toEqual([])
                        expect(error).toEqual(new GraphQLError('something happened'))
                    },
                    { timeout: 100 },
                )
                unmount()
            })
        })
    })
})
