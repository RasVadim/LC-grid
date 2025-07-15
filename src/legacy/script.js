/* eslint-disable */

// MARK: - Extensions

Array.prototype.after = function(element) {
    return this[(this.indexOf(element) + 1) % this.length]
}

Array.prototype.before = function(element) {
    return this[(this.indexOf(element) + this.length - 1) % this.length]
}

// MARK: - Utils

const easeOutCubic = t => 1 - Math.pow(1 - t, 3)

const makeDrawingProps = (rows, colls) => {
    return {
        rows: rows,
        colls: colls,
        cellSize: 0,
        contentWidth: 0,
        contentHeight: 0,
        leadingPadding: 0,
        topPadding: 0,
        scroll: 0
    }
}

const makeAnimation = (fromMode, toMode, fromCellIndex, toCellIndex, duration) => {
    return {
        fromMode: fromMode,
        toMode: toMode,
        fromCellIndex: fromCellIndex,
        toCellIndex:toCellIndex,
        start: Date.now(),
        end: Date.now() + duration,
        duration: duration,
        props: {
            leadingPaddingDiff: toMode.leadingPadding - fromMode.leadingPadding,
            topPaddingDiff: toMode.topPadding - fromMode.topPadding,
            cellSizeDiff: toMode.cellSize - fromMode.cellSize
        }
    }
}

// MARK: - Entry point

const main = () => {
    const canvas = document.getElementById("canvas")
    const context = canvas.getContext("2d")

    const years = 90
    const weeksPerYear = 52
    const weeks = years * weeksPerYear
    const weeksPerSeason = parseInt(weeksPerYear / 4)

    const drawingModes = [
        makeDrawingProps(years, weeksPerYear),
        makeDrawingProps(parseInt(weeks / weeksPerSeason), weeksPerSeason)
    ]

    let drawingMode = drawingModes[0]
    let animation = null

    const recalculateDrawingProps = () => {
        for (let mode of drawingModes) {
            with(mode) {
                if (mode == drawingModes[0]) {
                    let maxCellSize = parseInt(canvas.width / colls)
                    cellSize = Math.min(parseInt(canvas.height / rows), maxCellSize)
                } else {
                    cellSize = parseInt(drawingModes[0].contentWidth / colls)
                }
                contentWidth = cellSize * colls
                contentHeight = cellSize * rows
                leadingPadding = parseInt((canvas.width - contentWidth) / 2)
                topPadding = Math.max(parseInt((canvas.height - contentHeight) / 2), 0)
            }
        }
    }

    const render = () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.strokeStyle = "solid 1px black"

        if (animation) {
            const progress = easeOutCubic((Date.now() - animation.start) / animation.duration)
            const cellSize = animation.fromMode.cellSize + progress * animation.props.cellSizeDiff
            context.beginPath()
            for (let i = animation.fromCellIndex ; i <= animation.toCellIndex ; i++) {
                const fromOrigin = [
                    animation.fromMode.leadingPadding + animation.fromMode.cellSize * (i % animation.fromMode.colls), 
                    animation.fromMode.topPadding + animation.fromMode.cellSize * Math.floor(i / animation.fromMode.colls)
                ]
                const toRectOrigin = [
                    animation.toMode.leadingPadding + animation.toMode.cellSize * (i % animation.toMode.colls), 
                    animation.toMode.topPadding + animation.toMode.cellSize * Math.floor(i / animation.toMode.colls)
                ]
                const originDiff = [
                    toRectOrigin[0] - fromOrigin[0],
                    toRectOrigin[1] - fromOrigin[1]
                ]
                context.rect(
                    fromOrigin[0] + progress * originDiff[0],
                    fromOrigin[1] + progress * originDiff[1],
                    cellSize,
                    cellSize
                )
            }
            context.closePath()
            context.stroke()

            if (progress >= 1) {
                drawingMode = animation.toMode
                animation = null
            }
            console.log(progress)
            window.requestAnimationFrame(render)
            return
        }

        with(drawingMode) {
            context.beginPath()
            for (let rowIndex = 0 ; rowIndex < rows ; rowIndex++) {
                for(let cellIndex = 0 ; cellIndex < colls ; cellIndex++) {
                    context.rect(
                        leadingPadding + cellSize * cellIndex, 
                        topPadding + rowIndex *  cellSize, 
                        cellSize, 
                        cellSize
                    )
                }
            }
            context.closePath()
            context.stroke()
        }
    }

    const nextMode = () => {
        drawingMode = drawingModes.after(drawingMode)
        render()
    }

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        recalculateDrawingProps()
        render()
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    window.addEventListener('click', () => {
        animation = makeAnimation(drawingMode, drawingModes.after(drawingMode), 0, weeks, 800)
        render()
        // nextMode()
    })

}

window.addEventListener('load', main)