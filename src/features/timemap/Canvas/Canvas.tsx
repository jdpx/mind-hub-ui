import React, { useState, useEffect, useRef } from 'react'
import { fabric } from 'fabric'

import ActionButton from 'components/ActionButton/ActionButton'
import { Timemap } from '../../../types/timemap'
import { addCircle, revive } from './commands'

import './Canvas.scss'

interface Props {
    timemap?: Timemap
    onSaveClicked: (data: string) => void
}

export default function Canvas({ timemap, onSaveClicked }: Props) {
    const canvasRef = useRef(null)
    const [canvas, setCanvas] = useState<fabric.Canvas>()

    const saveCanvas = async () => {
        if (!canvas) return

        const data = JSON.stringify(canvas.toJSON())
        onSaveClicked(data)
    }

    useEffect(() => {
        if (!canvasRef) return

        setCanvas(new fabric.Canvas(canvasRef.current))
    }, [])

    useEffect(() => {
        if (!canvas) {
            return
        }

        canvas.loadFromJSON(
            timemap?.map || '{}',
            canvas.renderAll.bind(canvas),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            revive(canvas),
        )
    }, [canvas])

    const addCircleItem = () => {
        addCircle(canvas)
    }

    return (
        <section className="timemap-section">
            <div className="timemap-section-canvas-panel">
                <canvas
                    ref={canvasRef}
                    height={500}
                    width={930}
                    className="timemap-section-canvas"
                />
            </div>

            <div className="timemap-section__buttonWrapper">
                <ActionButton text="Add Circle" onClick={addCircleItem} />
                <ActionButton text="Save" onClick={saveCanvas} />
            </div>
        </section>
    )
}
