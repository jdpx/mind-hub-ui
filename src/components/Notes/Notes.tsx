import React from 'react'
import classNames from 'classnames'

import { CourseNote, StepNote } from '../../types/course'
import Section from '../Section/Section'

import './Notes.scss'

interface Props {
    title?: string
    placeholder?: string
    note?: CourseNote | StepNote
    className?: string
    testid?: string
    onNoteSave?: (val: string) => void
}

export default function Notes({
    title = 'Notes',
    placeholder = 'Enter notes here',
    note,
    onNoteSave,
    className,
    testid,
}: Props) {
    const onTextAreaBlue = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const text = event.target.value

        if (text === note?.value) {
            return
        }

        if (onNoteSave) {
            onNoteSave(text)
        }
    }

    const noteClass = classNames('notes', {
        [className || '']: !!className,
    })

    return (
        <Section title={title}>
            <div className={noteClass}>
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
