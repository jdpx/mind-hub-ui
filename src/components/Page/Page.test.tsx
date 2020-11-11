import React from 'react'
import { render } from '@testing-library/react'
import faker from 'faker'

import Page from './Page'

describe('Page', () => {
    describe('given page name is provided', () => {
        const testName = faker.lorem.word()
        const testChild = <div data-testid="testing">Test</div>

        const { getByTestId } = render(<Page name={testName}>{testChild}</Page>)

        it('renders the class with the page name in and children', () => {
            expect(getByTestId(`${testName}-page`)).toHaveClass(`${testName}-page`)
            expect(getByTestId(`testing`)).toBeInTheDocument()
        })
    })
})
