import React from 'react'
import { render } from '@testing-library/react'

import NoSessionSteps from './NoSessionSteps'

describe('NoSessionSteps', () => {
    it('should render no steps available text', () => {
        const { getByTestId } = render(<NoSessionSteps />)

        expect(getByTestId('no-steps').textContent).toEqual('No steps available')
    })
})
