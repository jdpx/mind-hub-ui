import React from 'react'
import { render, screen } from '@testing-library/react'
import faker from 'faker'

import Section from './Section'
import { ExtraLarge, Large, Medium, Small } from '../../constants/sizes'

describe('Section', () => {
    it('renders a section with with no size class', () => {
        const content = faker.lorem.words(2)
        const { getByTestId } = render(<Section testid="section">{content}</Section>)

        expect(getByTestId('section')).toHaveClass('content-wrapper')
        expect(screen.queryByText(content)).toBeInTheDocument()
    })

    it('renders a section with a custom class', () => {
        const { getByTestId } = render(
            <Section className="foo" testid="section">
                Test
            </Section>,
        )

        expect(getByTestId('section')).toHaveClass('content-wrapper foo')
    })

    describe('given it is disabled', () => {
        it('renders a disabled section', () => {
            const { getByTestId } = render(
                <Section disabled testid="section">
                    Test
                </Section>,
            )

            expect(getByTestId('section')).toHaveClass('content-wrapper disabled')
        })
    })

    describe('given it has a title', () => {
        it('renders a section with a title', () => {
            const title = faker.lorem.words(2)
            render(
                <Section title={title} testid="section">
                    Test
                </Section>,
            )

            expect(screen.queryByText(title)).toBeInTheDocument()
        })
    })

    describe('given sm size', () => {
        it('renders a md size section', () => {
            const { getByTestId } = render(
                <Section size={Small} testid="section">
                    Test
                </Section>,
            )

            expect(getByTestId('section')).toHaveClass('content-wrapper sm')
        })
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

    describe('given xl size', () => {
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
