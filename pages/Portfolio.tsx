import React, { useState, useContext, useEffect } from 'react';
import { AnimatedDot, Coords } from '../components/AnimatedDot';
import { IconedButton } from '../components/IconedButton';
import { PortfolioContext } from '../context/PortfolioContext';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import Controls from '../components/Controls';
import { useRouter } from 'next/router';
import ToggleSwitch from '../components/ToggleSwitch';
import BurgerMenu from '../components/BurgerMenu';
import SocialsContainer from '../components/Socials';

type Props = {
  children?: React.ReactNode
  data?: any
};

export const Portfolio: React.FC<Props> = ({ children }) => {
  const [mouseCoords, setMouseCoords] = useState<Coords>({ x: undefined, y: undefined })
  const [showSocials, setShowSocials] = useState<boolean>(true)
  const [showNav, setShowNav] = useState<boolean>(false)
  const [bubbleClicked, setBubbleClicked] = useState<[boolean, number | string]>([false, ''])
  const { currentTheme, setTheme, pDensity, animationState, setAnimationState, pSize } = useContext(PortfolioContext)
  const router = useRouter()

  useEffect(() => {
    setShowNav(false)
  }, [router.asPath])

  useEffect(() => {
    window.screen.orientation.addEventListener('change', () => {
      history.go(0)
    })
  }, []);

  const handleMouseUp = (): void => {
    setAnimationState(animationState)
    setBubbleClicked([false, ''])
  }

  //add debouncing here?
  const handleMouseOver = (e: React.MouseEvent | React.TouchEvent, eventType: string): void => {
    if (bubbleClicked[0] === true) {
      if (eventType === 'mouse') {
        const { clientX, clientY } = e as React.MouseEvent
        setMouseCoords({ x: clientX, y: clientY })
      } else if (eventType === 'touch') {
        const clientX = (e as React.TouchEvent).touches[0].clientX;
        const clientY = (e as React.TouchEvent).touches[0].clientY;
        setMouseCoords({ x: clientX, y: clientY })
      }
    }
  }

  const bubbleClickHandler = (clicked: boolean, index: number | string) => {
    setBubbleClicked([clicked, index])
  }

  const debouncedMouseOver = useDebouncedCallback((e: React.MouseEvent | React.TouchEvent, eventType: string) => handleMouseOver(e, eventType), 10)

  return (
    <>
      <div id="main" className={`h-full w-full bg-bgimage bg-no-repeat bg-center md:bg-cover bg-fitWidth`}
        onMouseMove={(e) => debouncedMouseOver(e, 'mouse')}
        onTouchMove={(e) => debouncedMouseOver(e, 'touch')}
        onMouseUp={() => handleMouseUp()}
        onPointerUp={() => handleMouseUp()}
        itemScope itemType="http://schema.org/WebSite"
      >
        <nav id="navbar"
          className='flex justify-between pt-1'
        >
          <BurgerMenu
            defaultClickState={showNav}
            barColor={currentTheme.color}
            containerstyle={`ml-[6px] z-2 top-5 w-[30px] h-[17px] inline-block cursor-pointer md:hidden`}
            onClick={(): void => {
              setShowNav(!showNav)
            }} />
          <div id="mobile_social_container"
            className={`flex-col top-[30px] right-0 w-[26px] fixed md:static z-[3] md:top-0 md:left-0 md:w-[12vw] md:max-w-[190px]`}
          >
            <IconedButton
              path={"M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"}
              viewBox={"0 -1 24 27"}
              svgDimensions={{
                width: 24,
                height: 26
              }}
              twcontainerStyle={`md:hidden right-0 bg-rose w-8 z-[301px] rounded-t-[5px] ${showSocials ? `` : `rounded-l-[5px]`}`}
              fillColor={currentTheme.color}
              onClick={(): void => setShowSocials(!showSocials)}
            />
            <SocialsContainer SVGfill={currentTheme.color}
              twstyle={`${showSocials ? `animate-fadein` : `animate-fadeout`} md:w-full w-8
                md:bg-transparent md:opacity-100 md:visible flex flex-col md:flex-row justify-around md:justify-between bg-rose rounded-bl-[5px] md:h-auto h-[15vh] md:r-0 md:top-[52px] -mt-[1px] mt-0`}
            />
          </div>
          <ToggleSwitch
            toggleFunction={setTheme}
            switchColor={currentTheme.mid}
            backgroundColor={currentTheme.color}
            icons={{
              light: {
                path: <g xmlns="http://www.w3.org/2000/svg" >
                  <path d="M 45 68 c -12.682 0 -23 -10.317 -23 -23 c 0 -12.682 10.318 -23 23 -23 c 12.683 0 23 10.318 23 23 C 68 57.683 57.683 68 45 68 z" />
                  <path d="M 38.652 17.61 c -0.292 0 -0.573 -0.127 -0.765 -0.356 c -0.239 -0.284 -0.301 -0.677 -0.161 -1.021 l 6.348 -15.61 C 44.227 0.247 44.593 0 45 0 s 0.773 0.247 0.926 0.623 l 6.349 15.61 c 0.14 0.344 0.077 0.737 -0.162 1.021 c -0.238 0.284 -0.616 0.414 -0.978 0.333 c -4.045 -0.881 -8.228 -0.881 -12.271 0 C 38.794 17.603 38.723 17.61 38.652 17.61 z" />
                  <path d="M 45 90 c -0.407 0 -0.773 -0.246 -0.926 -0.623 l -6.348 -15.61 c -0.14 -0.344 -0.078 -0.737 0.161 -1.021 c 0.239 -0.284 0.615 -0.412 0.978 -0.333 c 4.043 0.882 8.226 0.882 12.271 0 c 0.363 -0.08 0.74 0.05 0.978 0.333 c 0.239 0.283 0.302 0.677 0.162 1.021 l -6.349 15.61 C 45.773 89.754 45.407 90 45 90 z" />
                  <path d="M 16.61 52.349 c -0.127 0 -0.255 -0.024 -0.377 -0.073 l -15.61 -6.349 C 0.247 45.773 0 45.407 0 45 s 0.247 -0.773 0.624 -0.926 l 15.61 -6.348 c 0.343 -0.14 0.737 -0.078 1.021 0.161 c 0.284 0.239 0.412 0.616 0.333 0.978 c -0.441 2.021 -0.665 4.086 -0.665 6.135 c 0 2.049 0.224 4.113 0.665 6.136 c 0.079 0.362 -0.049 0.739 -0.333 0.978 C 17.071 52.269 16.842 52.349 16.61 52.349 z" />
                  <path d="M 73.39 52.349 c -0.231 0 -0.461 -0.08 -0.644 -0.235 c -0.284 -0.238 -0.412 -0.615 -0.333 -0.978 c 0.44 -2.022 0.664 -4.087 0.664 -6.136 c 0 -2.049 -0.224 -4.114 -0.664 -6.135 c -0.079 -0.362 0.049 -0.739 0.333 -0.978 c 0.283 -0.239 0.676 -0.301 1.021 -0.161 l 15.61 6.348 C 89.754 44.227 90 44.593 90 45 s -0.246 0.773 -0.623 0.926 l -15.61 6.349 C 73.645 52.324 73.517 52.349 73.39 52.349 z" />
                  <path d="M 20.437 30.415 c -0.028 0 -0.057 -0.001 -0.085 -0.004 c -0.37 -0.032 -0.692 -0.266 -0.836 -0.607 l -6.549 -15.527 c -0.158 -0.375 -0.073 -0.808 0.214 -1.096 c 0.288 -0.288 0.722 -0.371 1.096 -0.214 l 15.527 6.549 c 0.342 0.144 0.576 0.466 0.607 0.835 c 0.032 0.37 -0.144 0.727 -0.456 0.927 c -1.743 1.119 -3.36 2.42 -4.809 3.868 c -1.448 1.449 -2.75 3.066 -3.868 4.809 C 21.093 30.243 20.775 30.415 20.437 30.415 z" />
                  <path d="M 76.112 77.112 c -0.131 0 -0.263 -0.025 -0.389 -0.078 l -15.526 -6.549 c -0.342 -0.145 -0.576 -0.467 -0.607 -0.836 c -0.032 -0.37 0.144 -0.727 0.456 -0.928 c 1.745 -1.121 3.363 -2.423 4.808 -3.868 l 0 0 c 1.445 -1.444 2.747 -3.063 3.868 -4.808 c 0.201 -0.312 0.553 -0.489 0.928 -0.456 c 0.369 0.031 0.691 0.266 0.836 0.607 l 6.549 15.526 c 0.157 0.375 0.073 0.809 -0.215 1.096 C 76.628 77.011 76.372 77.112 76.112 77.112 z" />
                  <path d="M 69.563 30.414 c -0.339 0 -0.656 -0.171 -0.842 -0.459 c -1.121 -1.746 -2.423 -3.363 -3.868 -4.809 l 0 0 c -1.447 -1.447 -3.065 -2.749 -4.808 -3.868 c -0.313 -0.2 -0.488 -0.557 -0.456 -0.927 c 0.031 -0.37 0.266 -0.691 0.607 -0.835 l 15.526 -6.549 c 0.373 -0.158 0.808 -0.074 1.096 0.214 c 0.288 0.288 0.372 0.721 0.215 1.096 l -6.549 15.527 c -0.145 0.342 -0.467 0.576 -0.836 0.607 C 69.62 30.413 69.592 30.414 69.563 30.414 z" />
                  <path d="M 13.887 77.112 c -0.26 0 -0.516 -0.102 -0.707 -0.293 c -0.288 -0.288 -0.373 -0.721 -0.214 -1.096 l 6.549 -15.526 c 0.144 -0.342 0.466 -0.576 0.835 -0.607 c 0.37 -0.043 0.727 0.144 0.927 0.456 c 1.119 1.742 2.421 3.36 3.868 4.808 l 0 0 c 1.446 1.446 3.063 2.747 4.809 3.868 c 0.312 0.201 0.488 0.558 0.456 0.928 c -0.032 0.369 -0.266 0.691 -0.607 0.836 l -15.527 6.549 C 14.15 77.087 14.019 77.112 13.887 77.112 z" />
                </g>,
                fillcolor: "#F7E401"
              },
              dark: {
                path: <path xmlns="http://www.w3.org/2000/svg" d="M 87.823 60.7 c -0.463 -0.423 -1.142 -0.506 -1.695 -0.214 c -15.834 8.398 -35.266 2.812 -44.232 -12.718 c -8.966 -15.53 -4.09 -35.149 11.101 -44.665 c 0.531 -0.332 0.796 -0.963 0.661 -1.574 c -0.134 -0.612 -0.638 -1.074 -1.259 -1.153 c -9.843 -1.265 -19.59 0.692 -28.193 5.66 C 13.8 12.041 6.356 21.743 3.246 33.35 S 1.732 57.08 7.741 67.487 c 6.008 10.407 15.709 17.851 27.316 20.961 C 38.933 89.486 42.866 90 46.774 90 c 7.795 0 15.489 -2.044 22.42 -6.046 c 8.601 -4.966 15.171 -12.43 18.997 -21.586 C 88.433 61.79 88.285 61.123 87.823 60.7 z" />,
                fillcolor: "#8CA3CB"
              }
            }}
          />
        </nav>

        {children}

        {
          Array.from(Array(pDensity).keys()).map((_, i) =>
            <AnimatedDot
              name={i}
              key={i}
              newCoords={(bubbleClicked[1] === i && mouseCoords) as Coords}
              defaultAnimationState={animationState}
              particleSize={`${pSize}vmin`}
              colors={[`rgba(69, 142, 255, 1)`, `rgba(0, 45, 117, 1)`, `rgba(138, 165, 207, 1)`]}
              duration={6}
              clickHandler={bubbleClickHandler}
            />
          )
        }

        <div id="nav_links_container"
          className={`fixed left-[10vw] md:left-[25vw]  md:bg-transparent ${currentTheme.scheme === 'dark' ? `bg-black` : `bg-white`}
            grid grid-cols-[125px] gap-y-0 gap-x-[5vw] 
            ${showNav === true ? `visible opacity-100 w-[125px] top-[32px]` : `hidden opacity-0 top-0 `} 
            md:visible md:opacity-100 transition-all duration-500 ease-in-out
            ${router.asPath === '/' ? `md:w-[50%] md:top-[25vh] md:grid-cols-[125px_125px] md:grid-rows-[48px_48px] md:gap-y-[33vh] md:gap-x-[33vw]` : `md:w-[60vw] md:top-0 md:grid-cols-[125px_125px_125px_125px] md:grid-rows-[32px] md:gap-y-0 gap-x-[5vw]`}`}
          style={{
            display: 'grid',
          }}
        >
          <Link href={'/Hero'} as="/" className={`group`}>
            <span className={`bg-clip-text group-hover:text-transparent text-[32px] font-Mandalore bg-[${currentTheme.scheme ? currentTheme.color : ``}]
              group-hover:transition-all group-hover:duration-150 group-hover:ease-in-out group-hover:bg-gold-gradient`}
            >
              Home
            </span>
          </Link>
          <Link href={'/Contact'} className={`group`}>
            <span className={`bg-clip-text group-hover:text-transparent text-[32px] font-Mandalore bg-[${currentTheme.scheme ? currentTheme.color : ``}]
              group-hover:transition-all group-hover:duration-150 group-hover:ease-in-out group-hover:bg-gold-gradient`}
            >
              ContAct
            </span>
          </Link>
          <Link href={'/Projects'} className={`group`}>
            <span className={`bg-clip-text group-hover:text-transparent text-[32px] font-Mandalore bg-[${currentTheme.scheme ? currentTheme.color : ``}]
              group-hover:transition-all group-hover:duration-150 group-hover:ease-in-out group-hover:bg-gold-gradient`}
            >
              Projects
            </span>
          </Link>
          <Link href={'/About'} className={`group`}>
            <span className={`bg-clip-text group-hover:text-transparent text-[32px] font-Mandalore bg-[${currentTheme.scheme ? currentTheme.color : ``}]
              group-hover:transition-all group-hover:duration-150 group-hover:ease-in-out group-hover:bg-gold-gradient`}
            >
              About
            </span>
          </Link>
        </div>
        <Controls />
      </div >
    </>
  );
}
