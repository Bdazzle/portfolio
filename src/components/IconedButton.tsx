import React, { CSSProperties, useState } from "react";

interface ButtonProps {
    containerStyle: CSSProperties;
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

export const IconedButton: React.FC<ButtonProps> = ({
    containerStyle, text, path, viewBox, svgDimensions, fillColor, hoverFillColor, hoverContainerStyle,
    onMouseMove, onMouseOut, onClick
}) => {
    const [hovering, setHovering] = useState<boolean>(false)
    
    return (
        <div className="iconed_button"
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
                if(onMouseOut) onMouseOut()
            }}
            style={hovering ? hoverContainerStyle : containerStyle}
        >
            <div>{text}</div>
            <svg className="iconed_button_svg" viewBox={viewBox} height={svgDimensions.height} width={svgDimensions.width}>
                <path fill={hovering ? hoverFillColor : fillColor} d={path}></path>
            </svg>
        </div>
    )
}