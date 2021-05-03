import faker from 'faker'

import { renderHook, act } from '@testing-library/react-hooks'
import useSteps from './useSteps'
import { MockGetStepByIDQuery } from './mocks/useStepMock'
import { StepBuilder } from '../builders/step'
import { GraphQLError } from 'graphql'
import { wrapHook } from '../helpers/testing/hookWrapper'

describe('useSteps', () => {
    describe('useGetByID', () => {
        const id = faker.lorem.slug()
        const mockStep = StepBuilder().WithID(id).Build()

        describe('given the api returns successfully', () => {
            it('returns the step', async () => {
                const stepMock = new MockGetStepByIDQuery().WithID(id).WithStep(mockStep).Build()
                const { result: hook } = renderHook(() => useSteps())

                const { result, waitFor, unmount } = wrapHook(hook.current.useGetByID, [stepMock])
                const { get, loading, step, error } = result.current

                expect(get).toBeTruthy()
                expect(loading).toEqual(true)
                expect(step).toBeUndefined()
                expect(error).toBeUndefined()

                act(() => {
                    get()
                })

                waitFor(
                    () => {
                        expect(loading).toEqual(false)
                        expect(step).toEqual(mockStep)
                        expect(error).toEqual(false)
                    },
                    { timeout: 100 },
                )

                unmount()
            })
        })

        describe('given the api returns an error', () => {
            it('returns the error', () => {
                const stepMock = new MockGetStepByIDQuery()
                    .WithID(id)
                    .WithError(new GraphQLError('something happened'))
                    .Build()

                const { result: hook } = renderHook(() => useSteps())

                const { result, waitFor, unmount } = wrapHook(hook.current.useGetByID, [stepMock])
                const { get, loading, step, error } = result.current

                expect(get).toBeTruthy()
                expect(loading).toEqual(true)
                expect(step).toBeUndefined()
                expect(error).toBeUndefined()

                act(() => {
                    get()
                })

                waitFor(
                    () => {
                        expect(loading).toEqual(false)
                        expect(step).toBeUndefined()
                        expect(error).toEqual(false)
                    },
                    { timeout: 100 },
                )
                unmount()
            })
        })
    })
})
