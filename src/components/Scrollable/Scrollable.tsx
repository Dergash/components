import * as React from 'react'
import ScrollBar, { ScrollEvent, IMouseScrollEvent } from './ScrollBar'
import * as styles from './Scrollable.css'

interface IScrollableProps {
    children: React.ReactNode,
    width: number,
    scrollableWidth: number,
    height: number,
    scrollableHeight: number,
    onScroll?: (event: IMouseScrollEvent) => void
}

const defaultThumbThickness = 15

function Scrollable(props: IScrollableProps) {
    return (
        <section className={styles.Container}>
            {props.children}
            { props.scrollableWidth > props.width &&
                <ScrollBar
                    axis="x"
                    size={getThumbSize(props.width, props.scrollableWidth)}
                    onScroll={props.onScroll}
                />
            }
            { props.scrollableHeight > props.height &&
                <ScrollBar
                    axis="y"
                    size={getThumbSize(props.height, props.scrollableHeight)}
                    onScroll={props.onScroll}
                />
            }
        </section>
    )
}

function getThumbSize(visiblePx: number, scrollablePx: number) {
    return (visiblePx - defaultThumbThickness) / scrollablePx * (visiblePx - defaultThumbThickness)
}

export default Scrollable
