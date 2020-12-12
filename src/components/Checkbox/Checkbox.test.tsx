import React from 'react'
import { render } from '@testing-library/react'
import Checkbox from './Checkbox'

describe('Checkbox', () => {
    describe('given checked prop is true', () => {
        it('renders checked checkbox', () => {
            const { getByTestId } = render(<Checkbox checked testid="checkbox" />)

            expect(getByTestId('checkbox-checked')).toBeInTheDocument()
        })
    })

    describe('given checked prop is false', () => {
        it('renders checked checkbox', () => {
            const { getByTestId } = render(<Checkbox testid="checkbox" />)

            expect(getByTestId('checkbox-empty')).toBeInTheDocument()
        })
    })
})
