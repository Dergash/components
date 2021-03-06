import * as React from 'react'
import {EColors, shade, theme} from '../../utils/palette'
import cn from '../../utils/cn'
import styles from './Button.module.css'

enum ButtonTypes {
    text,
    outlined,
    contained
}

interface IButtonProps {
    children: React.ReactNode,
    primaryColor?: EColors | string,
    secondaryColor?: EColors | string,
    hoverColor?: EColors | string,
    type?: ButtonTypes,
    style?: React.CSSProperties,
    className?: string,
    onClick?: () => void
}

const Button = (props: IButtonProps) => {
    const primaryColor = props.primaryColor || theme.primaryColor
    const secondaryColor = props.secondaryColor || theme.secondaryColor
    const buttonType = props.type || ButtonTypes.contained
    const initialStyle = {
        backgroundColor: buttonType === ButtonTypes.contained ? primaryColor : 'transparent',
        color: buttonType !== ButtonTypes.contained ? primaryColor : secondaryColor,
        ...props.style
    }
    const [style, setStyle] = React.useState(initialStyle)
    const hoverColor = shade(primaryColor, secondaryColor, 0.08)

    // TODO: JSS support required for pseudo selectors inlining
    const handleMouseEnter = () => setStyle({ ...style, backgroundColor: hoverColor })
    const handleMouseLeave = () => setStyle(initialStyle)

    return <button
        className={cn(styles.Button, props.className ?? '')}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={props.onClick}
    >
        {props.children}
    </button>
}

export default Button
