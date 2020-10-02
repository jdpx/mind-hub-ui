import React from 'react'
import { render } from '@testing-library/react'
import Section from './Section'
import { ExtraLarge, Large, Medium } from '../../constants/sizes'

describe('Section', () => {
    it('renders a section with a default size of sm', () => {
        const { getByTestId } = render(<Section testid="section">Test</Section>)

        expect(getByTestId('section')).toHaveClass('content-wrapper sm')
    })

    it('renders a section with a custom class', () => {
        const { getByTestId } = render(
            <Section className="foo" testid="section">
                Test
            </Section>,
        )

        expect(getByTestId('section')).toHaveClass('content-wrapper sm foo')
    })

    describe('given md size', () => {
        it('renders a md size section', () => {
            const { getByTestId } = render(
                <Section size={Medium} testid="section">
                    Test
                </Section>,
            )

            expect(getByTestId('section')).toHaveClass('content-wrapper md')
        })
    })

    describe('given lg size', () => {
        it('renders a md size section', () => {
            const { getByTestId } = render(
                <Section size={Large} testid="section">
                    Test
                </Section>,
            )

            expect(getByTestId('section')).toHaveClass('content-wrapper lg')
        })
    })

    describe('given md size', () => {
        it('renders a md size section', () => {
            const { getByTestId } = render(
                <Section size={ExtraLarge} testid="section">
                    Test
                </Section>,
            )

            expect(getByTestId('section')).toHaveClass('content-wrapper xl')
        })
    })
})
