import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Notes from './Notes'
import { CourseNoteBuilder } from '../../builders/courseNotes'
import faker from 'faker'

describe('Notes', () => {
    describe('by default', () => {
        it('should render a text area', () => {
            const { getByTestId } = render(<Notes testid="note-text-text" />)

            expect(getByTestId('note-text-text')).toBeInTheDocument()
        })

        it('should have a default placeholder', () => {
            const { getByTestId } = render(<Notes testid="note-text-placeholder" />)

            expect(getByTestId('note-text-placeholder')).toHaveAttribute(
                'placeholder',
                'Enter notes here',
            )
        })

        describe('given the user edits the value of the textarea', () => {
            it('calls the onNoteSave prop', () => {
                const onBlur = jest.fn()
                const value = faker.lorem.words(2)

                const { getByTestId } = render(
                    <Notes testid="note-text-defaultvalue" onNoteSave={onBlur} />,
                )

                const input = getByTestId('note-text-defaultvalue')

                fireEvent.change(input, { target: { value: value } })
                fireEvent.blur(input)

                expect(onBlur).toHaveBeenCalledWith(value)
            })
        })
    })

    describe('given a note is passed in with a value', () => {
        it('should have the value of the note', () => {
            const note = CourseNoteBuilder().Build()

            const { getByTestId } = render(<Notes note={note} testid="note-text-defaultvalue" />)

            expect(getByTestId('note-text-defaultvalue')).toHaveValue(note.value)
        })

        describe('given the user edits the value of the textarea but it matches note value', () => {
            it('does not call the onNoteSave prop', () => {
                const note = CourseNoteBuilder().Build()
                const onBlur = jest.fn()

                const { getByTestId } = render(
                    <Notes testid="note-text-defaultvalue" note={note} onNoteSave={onBlur} />,
                )

                const input = getByTestId('note-text-defaultvalue')

                fireEvent.change(input, { target: { value: note.value } })
                fireEvent.blur(input)

                expect(onBlur).not.toHaveBeenCalled()
            })
        })
    })
})
