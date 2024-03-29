import React from 'react'
import { ProgressBar } from 'react-bootstrap'

interface Props {
    totalCount?: number
    completed?: number
}

export default function CourseProgress({ totalCount = 1, completed = 0 }: Props) {
    const percentage = totalCount === 0 ? 0 : (completed / totalCount) * 100

    return <ProgressBar now={percentage} label={`${Math.round(percentage)}%`} />
}
