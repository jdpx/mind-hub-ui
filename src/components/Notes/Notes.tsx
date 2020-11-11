import React from 'react'
import { CourseNote } from '../../types/course'
import Section from '../Section/Section'

import './Notes.scss'

interface Props {
    title?: string
    placeholder?: string
    note?: CourseNote
    testid?: string
    handleSave?: (val: string) => void
}

export default function Notes({
    title = 'Notes',
    placeholder = 'Enter notes here',
    note,
    handleSave,
    testid,
}: Props) {
    const onTextAreaBlue = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const text = event.target.value

        if (text === note?.value) {
            return
        }

        if (handleSave) {
            handleSave(text)
        }
    }

    return (
        <Section title={title}>
            <div className="notes">
                <textarea
                    placeholder={placeholder}
                    defaultValue={note && note.value}
                    onBlur={onTextAreaBlue}
                    data-testid={testid}
                />
            </div>
        </Section>
    )
}
