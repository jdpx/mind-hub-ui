import React from 'react'
import ActionButton from 'components/ActionButton/ActionButton'
import Section from '../../../components/Section/Section'
import { ProgressBar } from 'react-bootstrap'
import { Secondary } from '../../../constants/buttons'

interface Props {
    started?: boolean
}

export default function Course({ started }: Props) {
    return (
        <Section>
            <div className="course">
                <h3>Resilience</h3>
                <div className="course-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra, augue vitae
                    tortor etiam cursus fames risus ut.
                </div>
                {started && (
                    <div className="course-progress">
                        <ProgressBar now={60} />
                    </div>
                )}
                <ActionButton type={Secondary} text={started ? 'Continue' : 'Start'} />
            </div>
        </Section>
    )
}
