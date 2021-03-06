import * as React from 'react'
import ScrollBar, { IMouseScrollEvent } from './ScrollBar'
import styles from './Scrollable.module.css'

interface IScrollableProps {
    children: React.ReactNode,
    width: number,
    height: number,
    scrollableWidth: number,
    scrollableHeight: number,
    initialX?: number,
    initialY?: number
    onScroll?: (event: IMouseScrollEvent) => void
}

const defaultThumbThickness = 15
const minThumbSize = 48

function Scrollable(props: IScrollableProps) {
    return (
        <section className={styles.Container}>
            {props.children}
            { props.scrollableWidth > props.width &&
                <ScrollBar
                    axis="x"
                    initial={props.initialX ?? 0}
                    size={getThumbSize(props.width, props.scrollableWidth)}
                    onScroll={props.onScroll}
                />
            }
            { props.scrollableHeight > props.height &&
                <ScrollBar
                    axis="y"
                    initial={props.initialY ?? 0}
                    size={getThumbSize(props.height, props.scrollableHeight)}
                    onScroll={props.onScroll}
                />
            }
        </section>
    )
}

function getThumbSize(visiblePx: number, scrollablePx: number) {
    const requiredSize = (visiblePx - defaultThumbThickness) / scrollablePx * (visiblePx - defaultThumbThickness)
    return requiredSize > minThumbSize ? requiredSize : minThumbSize
}

export default Scrollable
