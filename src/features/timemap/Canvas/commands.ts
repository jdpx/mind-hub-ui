import { fabric } from 'fabric'

export const addCircle = (canvas?: fabric.Canvas) => {
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
        console.log('22')
        const items = group._objects
        group = new fabric.Group(items)
        items.forEach((item) => {
            canvas.remove(item)
        })

        group.on('mousedblclick', () => {
            console.log('333')
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
        console.log('111')
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

export const revive = (canvas: fabric.Canvas) => (o: fabric.Object, obj: fabric.Object) => {
    if (o.type === 'group') {
        canvas.add(obj)

        obj.on('mousedblclick', () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore

            const items = obj._objects
            const textBox = items[1]

            canvas.remove(obj)

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            obj.destroy()

            items.forEach((item: fabric.Object) => {
                canvas.add(item)
            })
            canvas.setActiveObject(textBox)
            textBox.enterEditing()
            canvas.renderAll()
        })
    }
    // canvas.add(obj)
}
