import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

export type Coords = {
    x?: number,
    y?: number,
}

export interface AnimatedSpan<T> {
    name? : T;
    newCoords: Coords;
    defaultAnimationState?: { [key: string]: string };
    animationName? : string;
    particleSize: number | string;
    colors: string[];
    duration: number;
    clickHandler: (clicked: boolean, name:T)=> void;
}

interface SpanCSSProps {
    particleSize: number | string;
    dotPos : Coords;
    particleNumber : number ;
    origin: Coords;
    animationPlayState: string;
    animationBase: number;
    blurRadius: number;
    color: string;
    name: string
}

function random(input: number): number {
    return Math.round(Math.random() * input)
}

const move = keyframes`
0% { 
    transform: translate3d(0, 0, 1px) rotate(0deg);  
  }
  100% {
    transform: translate3d(0, 0, 1px) rotate(360deg);
  }
`
//animation shorthand: name, duration, timing function, delay, iteration, direction, fill mode, play state
const DotSpan= styled.span<SpanCSSProps>`
    width : ${props => props.particleSize};
    height: ${props => props.particleSize};
    border-radius: ${props => props.particleSize};
    left: ${props => props.dotPos.x as number - props.particleNumber}px;
    top: ${props => props.dotPos.y as number - props.particleNumber}px;
    transform-origin : ${props => props.origin.x}vw ${props => props.origin.y}vh;
    transform: translate(-50%, -50%);
    position: fixed;
    backface-visibility: hidden;
    filter: blur(${props => props.blurRadius});
    color: ${props => props.color};
    opacity: .5;
    animation-name : ${move};
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: ${props => props.animationBase *1 +10}s;
    animation-delay: ${props => props.animationBase * -1}s;
    animation-play-state: ${props => props.animationPlayState};
    box-shadow: ${props => `inset 0 0 ${props.particleNumber / 2}vmin 5px ${props.color}, 0 0 ${props.particleNumber}vmin 5px ${props.color}`}
`

export const AnimatedDot: React.FC<AnimatedSpan<number>> = ({ name, newCoords, defaultAnimationState, animationName, particleSize, colors, duration,clickHandler }) => {
    const [dotPos, setDotPos] = useState<Coords>({ x: undefined, y: undefined })
    const [animaPlay, setAnimaPlay] = useState<string>('running')
    const [animaName, setAnimaName] = useState<string>('move')
    const [originPos, setOriginPos] = useState<Coords>({ x: undefined, y: undefined })
    const [color, setColor] = useState<string>()
    const [animationBase, setAnimationBase] = useState<number>()
    const [blurRadius, setBlurRadius] = useState<number>()
    const particleNumber = typeof particleSize === 'string' ? Number(particleSize.match(/\d+/)) : particleSize

    /*
    need to convert x/y px to vh/vw since that's what the origin point of animation is.
    */
    const handleMouseDown = (): void => {
        setAnimaPlay('paused')
        setAnimaName(animationName === 'none' ? 'move' : 'none')
        clickHandler(true, name!)
    }
   
    const handleMouseUp = (): void => {
        setAnimaPlay('running')
        setAnimaName('move')
        clickHandler(false, name!)
    }

    useEffect(() => {
        setDotPos({ x: Math.round(Math.random() * window.innerWidth), y: Math.round(Math.random() * window.innerHeight) })
        setOriginPos({ x: Math.round(Math.random() * 50) - 25, y: Math.round(Math.random() * 50) - 25 })
        setColor(colors[Math.round(Math.random() * colors.length)])
        setAnimationBase((random(duration * 10) / 10))
        setBlurRadius((random(10) + .5) * particleNumber * .3)
        
    }, [])

    /*
    window.innerWidth = 100vw
    px to viewport units conversion: 1px = 100vw / viewport's width (in px)
    100vw = 1px * viewport width
    1vw = (1px * viewport width)/100 = viewport/100
    */
    useEffect(() => {
        if (animaPlay === 'paused' && newCoords) {
            setDotPos(newCoords)
            const { x , y } = newCoords
            setOriginPos({ x : x!/100, y : y!/100})
            setAnimationBase((random(duration * 10) / 10))
            
        }
    }, [newCoords])

    useEffect(() => {
        setAnimaPlay(defaultAnimationState?.animationState as string)
    }, [defaultAnimationState])

    return (
        <DotSpan 
            className = "dot"
            onMouseDown={() => handleMouseDown()}
            onMouseUp={() => handleMouseUp()} 
            onPointerDown={() => handleMouseDown()}
            onPointerUp={() => handleMouseUp()}
            particleNumber={particleNumber}
            particleSize={particleSize}
            dotPos={dotPos}
            origin={originPos}
            animationPlayState = {animaPlay}
            animationBase={animationBase as number}
            blurRadius={blurRadius as number}
            color={color as string}
            name={animaName}
        />
    )
}