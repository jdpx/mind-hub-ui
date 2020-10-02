import React from 'react'
import faker from 'faker'
import { render, screen } from '@testing-library/react'
import NavigationLink from './NavigationLink'

describe('NavigationLink', () => {
    xit('renders the link text', () => {
        render(<NavigationLink text={faker.lorem.sentence()} testid="action-button" />)

        expect(screen.queryByText(`foo`)).toBeInTheDocument()
    })
})
