/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { renderHook } from '@testing-library/react-hooks'

export function wrapHook(hook: any, mocks: any = []) {
    const wrapper = ({ children }: { children: React.ReactElement }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
            {children}
        </MockedProvider>
    )
    const { result, waitFor, waitForNextUpdate, unmount } = renderHook(() => hook(), {
        wrapper,
    })

    return { result, waitFor, waitForNextUpdate, unmount }
}
