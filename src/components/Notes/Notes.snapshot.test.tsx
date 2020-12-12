import React from 'react'
import { render } from '@testing-library/react'
import Notes from './Notes'
import { CourseNoteBuilder } from '../../builders/courseNotes'

describe('Notes Snapshots', () => {
    const props = {
        title: 'My notes',
        placeholder: 'Helloworld',
        testid: 'my-notes',
    }

    it('renders default note component', () => {
        const { asFragment } = render(<Notes {...props} />)

        expect(asFragment()).toMatchSnapshot()
    })

    it('renders note with custom class', () => {
        const { asFragment } = render(<Notes className="custom class" {...props} />)

        expect(asFragment()).toMatchSnapshot()
    })

    describe('given custom note', () => {
        it('renders note text', () => {
            const note = CourseNoteBuilder().Value('My notes value').Build()

            const { asFragment } = render(<Notes note={note} {...props} />)

            expect(asFragment()).toMatchSnapshot()
        })
    })
})
