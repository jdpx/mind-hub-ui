import React from 'react'
import { render } from '@testing-library/react'
import Section from './Section'
import { ExtraLarge, Large, Medium, Small } from '../../constants/sizes'

describe('Section Snapshots', () => {
    it('renders section with child', () => {
        const { asFragment } = render(
            <Section>
                <div>Testing</div>
            </Section>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it('renders section with title', () => {
        const { asFragment } = render(
            <Section title="Testing title">
                <div>Testing</div>
            </Section>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it('renders small section', () => {
        const { asFragment } = render(
            <Section size={Small}>
                <div>Testing</div>
            </Section>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it('renders Medium section', () => {
        const { asFragment } = render(
            <Section size={Medium}>
                <div>Testing</div>
            </Section>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it('renders Large section', () => {
        const { asFragment } = render(
            <Section size={Large}>
                <div>Testing</div>
            </Section>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it('renders ExtraLarge section', () => {
        const { asFragment } = render(
            <Section size={ExtraLarge}>
                <div>Testing</div>
            </Section>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it('renders disabled section', () => {
        const { asFragment } = render(
            <Section disabled>
                <div>Testing</div>
            </Section>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it('renders section with custom class', () => {
        const { asFragment } = render(
            <Section className="customClass">
                <div>Testing</div>
            </Section>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it('renders section with testid', () => {
        const { asFragment } = render(
            <Section testid="test-id">
                <div>Testing</div>
            </Section>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
