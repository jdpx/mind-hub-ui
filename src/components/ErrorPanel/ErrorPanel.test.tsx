import React from 'react'
import faker from 'faker'
import { render } from '@testing-library/react'

import ErrorPanel from './ErrorPanel'

describe('Error Panel', () => {
    describe('by default', () => {
        it('renders the error icon', () => {
            const { getByTestId } = render(<ErrorPanel />)
            const img = getByTestId('error-panel-img')
            expect(img).toBeInTheDocument()
            expect(img).toHaveAttribute('height', '200')
        })

        it('renders the default error message', () => {
            const { getByTestId } = render(<ErrorPanel />)
            const msg = getByTestId('error-panel-message')

            expect(msg).toBeInTheDocument()
            expect(msg).toHaveTextContent('Opps something went wrong. Please try again later')
        })
    })

    describe('given custom message is provided', () => {
        it('should display message', () => {
            const errorMessage = faker.lorem.sentences(2)
            const { getByTestId } = render(<ErrorPanel message={errorMessage} />)
            const msg = getByTestId('error-panel-message')

            expect(msg).toBeInTheDocument()
            expect(msg).toHaveTextContent(errorMessage)
        })
    })

    describe('given custom height is provided', () => {
        it('should set image height', () => {
            const height = faker.random.number()
            const { getByTestId } = render(<ErrorPanel height={height} />)
            const img = getByTestId('error-panel-img')

            expect(img).toBeInTheDocument()
            expect(img).toHaveAttribute('height', `${height}`)
        })
    })
})
