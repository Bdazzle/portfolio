import React, { useEffect, useState } from 'react';
import "./AnimatedDot.css"

export type Coords = {
    x?: number,
    y?: number,
}

export interface AnimatedSpan<T> {
    mobile?: boolean
    name? : T;
    newCoords: Coords;
    defaultAnimationState?: { [key: string]: string };
    animationName? : string;
    particleSize: number | string;
    colors: string[];
    duration: number;
    clickHandler: (clicked: boolean, name:T)=> void;
}

function random(input: number): number {
    return Math.round(Math.random() * input)
}

export const AnimatedDot: React.FC<AnimatedSpan<number>> = ({mobile, name, newCoords, defaultAnimationState, animationName, particleSize, colors, duration,clickHandler }) => {
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
        <span className='dot'
            style={{
                width: particleSize,
                height: particleSize,
                borderRadius: particleSize,
                left: dotPos.x && dotPos.x as number - particleNumber,
                top: dotPos.y && dotPos.y as number - particleNumber,
                transformOrigin: `${originPos.x}vw ${originPos.y}vh`,
                transform: `translate(-50%, -50%)`,
                position:'fixed',
                backfaceVisibility: `hidden`,
                animationPlayState: animaPlay,
                animationName: animaName,
                animationTimingFunction: `linear`,
                animationIterationCount: `infinite`,
                animationDuration: `${animationBase as number * 1 + 10}s`,
                animationDelay: `${animationBase as number * -1}s`,
                filter: `blur${blurRadius}`,
                color: color,
                opacity: .5,
                boxShadow: `inset 0 0 ${particleNumber / 2}vmin 5px ${color}, 0 0 ${particleNumber}vmin 5px ${color}`
            }}
            onMouseDown={() => handleMouseDown()}
            onMouseUp={() => handleMouseUp()} 
            onPointerDown={() => handleMouseDown()}
            onPointerUp={() => handleMouseUp()}
            />
    )
}