import React, { useEffect, useState } from 'react';
import { useDrag } from '@use-gesture/react'

export type Coords = {
    x?: number,
    y?: number,
}

export interface AnimatedSpan<T> {
    name?: T;
    newCoords: Coords;
    defaultAnimationState: string;
    duration: number,
    animationName?: string;
    particleSize: number | string;
    colors: string[];
    clickHandler: (clicked: boolean, name:T)=> void;
}

export const AnimatedDot: React.FC<AnimatedSpan<number>> = ({
   defaultAnimationState, particleSize, colors, duration
}) => {
    const [dotPos, setDotPos] = useState<Coords>({ x: 0, y: 0 })
    const [animationPlay, setAnimationPlay] = useState<string>('running')
    const [color, setColor] = useState<string>()
    const [animationBase, setAnimationBase] = useState<number>(0)
    const [blurRadius, setBlurRadius] = useState<number>()
    const particleNumber = typeof particleSize === 'string' ? Number(particleSize.match(/\d+/)) : particleSize
    const [originPos, setOriginPos] = useState<Coords>({ x: undefined, y: undefined })

    /*
   useDrag and it's bind reference all gestures of the element it's attached to.
   use it's functionality for onMouseDown etc. for starting and stopping animation if clicked?
   */
    const bindDot = useDrag((params: { down: any; xy: any; }) => {
        const { down, xy } = params
        setAnimationPlay(down ? 'paused' : defaultAnimationState)
        setDotPos({
            x: xy[0],
            y: xy[1]
        })
        setOriginPos({ x : xy[0]/100, y : xy[1]/100})
        setAnimationBase(Math.round(Math.random()* duration * 10)  / 10)
    })

    /*
    arc calculation Math.floor(Math.random() * (max arc - min arc))
    arc calculation may be an issue since particle size is passed as vmin unit.
    */
    useEffect(() => {
        setDotPos({ x: Math.round(Math.random() * window.innerWidth), y: Math.round(Math.random() * window.innerHeight) })
        setColor(colors[Math.round(Math.random() * colors.length)])
        setAnimationBase(Math.round(Math.random()* duration * 10)  / 10)
        setBlurRadius((Math.round(Math.random() * 10) + .5) * particleNumber * .3)
        setOriginPos({ x: Math.round(Math.random() * 50) - 25, y: Math.round(Math.random() * 50) - 25 })
    }, [])

    useEffect(() => {
        setAnimationPlay(defaultAnimationState)
    }, [defaultAnimationState])

    return (
        <div {...bindDot()}
            className={`${animationPlay === 'running' ? `animate-move` : ''} fixed touch-none row-start-1 col-start-1 opacity-50`}
            style={{
                filter: `blur(${blurRadius})`,
                animationDuration: `${animationBase * 1 + 20}s`,
                animationDelay: `${animationBase * -1}s`,
                animationPlayState: animationPlay,
                boxShadow: `inset 0 0 ${particleNumber / 2}vmin 5px ${color}, 0 0 ${particleNumber}vmin 5px ${color}`,
                width: particleSize,
                height: particleSize,
                borderRadius: particleSize,
                left: dotPos.x,
                top: dotPos.y,
                transformOrigin: `${originPos.x}vw ${originPos.y}vh`,
                // backfaceVisibility: 'hidden',
            }}
        >
        </div>
    )
}