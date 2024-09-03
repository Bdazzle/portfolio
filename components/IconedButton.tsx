import React, { CSSProperties, useState } from "react";

interface ButtonProps {
    id?: string;
    containerStyle?: CSSProperties;
    twcontainerStyle?: string;
    text?: string;
    path: string;
    viewBox: string;
    svgDimensions: {
        width: number,
        height: number,
    };
    fillColor: string;
    hoverFillColor?: string;
    hoverContainerStyle?: CSSProperties;
    onMouseOut?: () => void;
    onMouseMove?: () => void;
    onClick: () => void
}

export const IconedButton: React.FC<ButtonProps> = ({ twcontainerStyle,
    containerStyle, id, text, path, viewBox, svgDimensions, fillColor, hoverFillColor, hoverContainerStyle,
    onMouseMove, onMouseOut, onClick
}) => {
    const [hovering, setHovering] = useState<boolean>(false)

    return (
        <div
            id={id && `${id}`}
            onMouseDown={() => {
                setHovering(false);
                onClick()
            }}
            onMouseMove={() => {
                if (onMouseMove) {
                    onMouseMove()
                    setHovering(true);
                }
            }}
            onMouseOut={() => {
                setHovering(false)
                if (onMouseOut) onMouseOut()
            }}
            style={hovering ? hoverContainerStyle : containerStyle}
            className={`group ${twcontainerStyle}`}
        >
            {
                text && <div>{text}</div>
            }
            <svg viewBox={viewBox} height={svgDimensions.height} width={svgDimensions.width}>
                <path fill={hovering ? hoverFillColor : fillColor} d={path}></path>
            </svg>
        </div>
    )
}