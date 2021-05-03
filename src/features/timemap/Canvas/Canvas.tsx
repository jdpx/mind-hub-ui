import React, { useState, useEffect, useRef } from 'react'
import { fabric } from 'fabric'

import ActionButton from 'components/ActionButton/ActionButton'
import { Timemap } from '../../../types/timemap'

import './Canvas.scss'

interface Props {
    timemap?: Timemap
    onSaveClicked: (data: string) => void
}

export default function Canvas({ timemap, onSaveClicked }: Props) {
    const canvasRef = useRef(null)
    const [canvas, setCanvas] = useState<fabric.Canvas>()

    const addCircle = () => {
        if (!canvas) {
            console.log('no canvas')
            return
        }

        console.log('adding circle')

        const circle = new fabric.Circle({
            originX: 'center',
            originY: 'center',
            radius: 75,
            fill: '#003377',
            selectable: false,
        })
        const textBox = new fabric.IText('Enter Text', {
            fontSize: 16,
            fontFamily: 'StreetCorner',
            stroke: 'white',
            fill: 'white',
            originX: 'center',
            originY: 'center',
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true,
        })
        let group = new fabric.Group([circle, textBox], { top: 140, left: 230 })

        textBox.on('editing:exited', () => {
            const items = group._objects
            group = new fabric.Group(items)
            items.forEach((item) => {
                canvas.remove(item)
            })

            group.on('mousedblclick', () => {
                const items = group._objects
                // group._restoreObjectsState()
                canvas.remove(group)
                group.destroy()
                items.forEach((item) => {
                    canvas.add(item)
                })
                canvas.setActiveObject(textBox)
                textBox.enterEditing()
                canvas.renderAll()
            })
            canvas.add(group)

            canvas.renderAll()
        })

        group.on('mousedblclick', () => {
            const items = group._objects
            // group._restoreObjectsState()
            canvas.remove(group)
            group.destroy()
            items.forEach((item) => {
                canvas.add(item)
            })
            canvas.setActiveObject(textBox)
            textBox.enterEditing()
            canvas.renderAll()
        })
        canvas.add(group)
    }

    const saveCanvas = async () => {
        if (!canvas) return

        const data = JSON.stringify(canvas.toJSON())
        onSaveClicked(data)
    }

    useEffect(() => {
        if (!canvasRef) return

        const newCanvas = new fabric.Canvas(canvasRef.current)

        setCanvas(newCanvas)
    }, [])

    useEffect(() => {
        if (!canvas) {
            return
        }

        canvas.loadFromJSON(timemap?.map || '{}', canvas.renderAll.bind(canvas))
    }, [canvas])

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
                <ActionButton text="Add Circle" onClick={addCircle} />
                <ActionButton text="Save" onClick={saveCanvas} />
            </div>
        </section>
    )
}
