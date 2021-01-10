import faker from 'faker'

import { renderHook, act } from '@testing-library/react-hooks'
import useCourse from './useCourse'
import { GraphQLError } from 'graphql'
import { wrapHook } from '../helpers/testing/hookWrapper'
import { CourseBuilder } from '../builders/course'
import { MockGeAllQuery, MockGetCourseByIDQuery } from './mocks/useCourseMock'

describe('useCourse', () => {
    describe('useGetByID', () => {
        const id = faker.lorem.slug()
        const mockCourse = CourseBuilder().WithID(id).Build()

        describe('given the api returns successfully', () => {
            it('returns the course', async () => {
                const courseMock = new MockGetCourseByIDQuery()
                    .WithID(id)
                    .WithCourse(mockCourse)
                    .Build()
                const { result: hook } = renderHook(() => useCourse())

                const { result, waitFor, unmount } = wrapHook(hook.current.useGetByID, [courseMock])
                const { get, loading, course, error } = result.current

                expect(get).toBeTruthy()
                expect(loading).toEqual(true)
                expect(course).toBeUndefined()
                expect(error).toBeUndefined()

                act(() => {
                    get()
                })

                waitFor(
                    () => {
                        expect(loading).toEqual(false)
                        expect(course).toEqual(mockCourse)
                        expect(error).toEqual(false)
                    },
                    { timeout: 100 },
                )

                unmount()
            })
        })

        describe('given the api returns an error', () => {
            it('returns the error', () => {
                const courseMock = new MockGetCourseByIDQuery()
                    .WithID(id)
                    .WithError(new GraphQLError('something happened'))
                    .Build()

                const { result: hook } = renderHook(() => useCourse())

                const { result, waitFor, unmount } = wrapHook(hook.current.useGetByID, [courseMock])
                const { get, loading, course, error } = result.current

                expect(get).toBeTruthy()
                expect(loading).toEqual(true)
                expect(course).toBeUndefined()
                expect(error).toBeUndefined()

                act(() => {
                    get()
                })

                waitFor(
                    () => {
                        expect(loading).toEqual(false)
                        expect(course).toBeUndefined()
                        expect(error).toEqual(false)
                    },
                    { timeout: 100 },
                )
                unmount()
            })
        })
    })

    describe('useGetAll', () => {
        const courseId = faker.lorem.slug()
        const mockCourse = CourseBuilder().Build()

        describe('given the api returns successfully', () => {
            it('returns the course', async () => {
                const courseMock = new MockGeAllQuery().WithCourses([mockCourse]).Build()
                const { result: hook } = renderHook(() => useCourse())

                const { result, waitFor, unmount } = wrapHook(hook.current.useGetAll, [courseMock])
                const { get, loading, courses, error } = result.current

                expect(get).toBeTruthy()
                expect(loading).toEqual(true)
                expect(courses).toEqual([])
                expect(error).toBeUndefined()

                act(() => {
                    get()
                })

                waitFor(
                    () => {
                        expect(loading).toEqual(false)
                        expect(courses).toEqual([mockCourse])
                        expect(error).toEqual(false)
                    },
                    { timeout: 100 },
                )

                unmount()
            })
        })

        describe('given the api returns an error', () => {
            it('returns the error', () => {
                const courseMock = new MockGeAllQuery()
                    .WithError(new GraphQLError('something happened'))
                    .Build()

                const { result: hook } = renderHook(() => useCourse())

                const { result, waitFor, unmount } = wrapHook(hook.current.useGetAll, [courseMock])
                const { get, loading, courses, error } = result.current

                expect(get).toBeTruthy()
                expect(loading).toEqual(true)
                expect(courses).toEqual([])
                expect(error).toBeUndefined()

                act(() => {
                    get()
                })

                waitFor(
                    () => {
                        expect(loading).toEqual(false)
                        expect(courses).toEqual([])
                        expect(error).toEqual(new GraphQLError('something happened'))
                    },
                    { timeout: 100 },
                )
                unmount()
            })
        })
    })
})
