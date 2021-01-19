import React, { useState, useEffect, useRef } from 'react'

import { fabric } from 'fabric'
import ActionButton from 'components/ActionButton/ActionButton'
import useTimemap from '../../hooks/useTimemap'

import './Canvas.scss'

export default function Canvas() {
    const canvasRef = useRef(null)
    const [canvas, setCanvas] = useState<any>()

    const { updateTimemap, useGetTimemaps } = useTimemap()

    const addCircle = () => {
        if (canvas) {
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
    }

    const saveCanvas = () => {
        console.log(canvas.toJSON())
        // updateTimemap(canvas.toJSON())

        useGetTimemaps()
    }

    useEffect(() => {
        if (canvasRef !== null) {
            const newCanvas = new fabric.Canvas(canvasRef.current)
            setCanvas(newCanvas)
        }
    }, [canvasRef])

    return (
        <section className="timeMap-canvas">
            <canvas ref={canvasRef} height={500} width={930} />

            <div className="timeMap-canvas__buttonWrapper">
                <ActionButton text="Add Circle" onClick={addCircle} />
                <ActionButton text="Save" onClick={saveCanvas} />
            </div>
        </section>
    )
}
