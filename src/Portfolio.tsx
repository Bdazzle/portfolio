import React, { useState, useContext, CSSProperties, useEffect } from 'react';
import { Router, Route, Outlet, Link, ReactLocation, createBrowserHistory } from "react-location"
// import "./Portfolio.css"
import { Hero } from "./Hero"
import { Contact } from './Contact';
import { Projects } from './Projects';
import { About } from './About';
import { AnimatedDot, Coords } from './components/AnimatedDot';
import { IconedButton } from './components/IconedButton';
import { PortfolioContext } from './PortfolioContext';
import dotenv from 'dotenv'
import { useDebouncedCallback } from 'use-debounce/lib';
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import backgroundimg from './assets/background.png'

const history = createBrowserHistory()

dotenv.config()

const location = new ReactLocation()

const routes: Route[] = [
  {
    path: "/",
    element: <Hero />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/projects",
    element: <Projects />
  },
  {
    path: "/about",
    element: <About />
  }
]

const rose = '#b55b67'

type IconVals = {
  fillcolor: string,
  path: any
}

interface IconProps {
  [key: string]: IconVals
}

interface Toggle {
  toggleFunction: (themeName: string) => void;
  switchColor: string;
  backgroundColor: string;
  icons: IconProps
}

interface Burger {
  barstyle: CSSProperties,
  containerstyle: CSSProperties,
  onClick: () => void,
  defaultClickState: boolean,
}
const BurgerMenu: React.FC<Burger> = ({ barstyle, containerstyle, onClick, defaultClickState }) => {
  const [isClicked, setIsClicked] = useState<boolean>()

  const handleClick = (): void => {
    onClick()
  }

  useEffect(() =>{
    setIsClicked(defaultClickState)
  })

  return (
    <div id="menu" style={containerstyle} onClick={() => handleClick()}>
      <div id="bar1" style={
        isClicked ? {
          ...barstyle,
          transition: 'all .5s ease-in-out',
          transform: `rotate(45deg) translate(40%)`,
        } : barstyle
      }></div>
      <div id="bar2" style={
        isClicked ? {
          ...barstyle,
          transition: 'opacity .3s',
          opacity: 0,
        } : barstyle
      }></div>
      <div id="bar3" style={isClicked ? {
        ...barstyle,
        transition: 'all .5s ease-in-out',
        transform: `rotate(-45deg) translate(40%)`,
      } : barstyle}></div>
    </div>
  )
}

/*
pos references Object.keys(icons).length, which doesn't measure indexes,
referencing icons in render will be pos-1 (keys length to index)

math for n amount of icons/themes = pos > 1 ? (100/totalPositons) * pos : 0

ADD KEYFRAME ANIMATIONS WITH STYLED COMPONENTS
*/
const ToggleSwitch: React.FC<Toggle> = ({ toggleFunction, switchColor, backgroundColor, icons }) => {
  const [pos, setPos] = useState<number>(0)
  const [scheme, setScheme] = useState<string>()
  const totalPositons = Object.keys(icons).length

  const handleToggle = (): void => {
    if (pos + 1 > totalPositons) {
      setPos(1)
      toggleFunction(Object.keys(icons)[0])
      setScheme(Object.keys(icons)[0])
    } else {
      setPos(pos + 1)
      toggleFunction(Object.keys(icons)[pos])
      setScheme(Object.keys(icons)[pos])
    }
  }

  /*
  sets initial toggle position and scheme,
  1 = light, 2 = dark, etc..
  */
  useEffect(() => {
    setPos(2)
  }, [])

  return (
    <div className="toggle_container"
      style={{
        marginTop: 5,
        width: totalPositons * 20,
        height: 12,
        borderRadius: 10,
        backgroundColor: backgroundColor,
        marginRight: 5,
      }}
      onClick={() => handleToggle()}
    >
      <span
        className="toggle_switch"
        style={{
          borderRadius: `50%`,
          top: -8,
          height: 24,
          width: 24,
          backgroundColor: switchColor,
          left: `${pos > 1 ? ((100 / totalPositons) * pos) - 40 : 0}%`,
          position: 'relative',
          right: 25,
          transition: 'left .5s ease-in-out'
        }}
      >
        <svg
          fill={!scheme ? icons['dark'].fillcolor : icons[scheme as string].fillcolor}
          viewBox="-20 -43 130 130" height="20" width="20">
          {
            !scheme ? icons['dark'].path : icons[scheme as string].path
          }
        </svg>
      </span>
    </div>
  )
}

const StyledLink = styled(Link)`
  & {
    background-clip : text;
    -webkit-background-clip: text;
    color: transparent;
    background-color : ${(props) => props.color};
    font-size: 32px;
    font-family: 'Mandalore', sans-serif;
  }
  &:hover{
    background-position: right;
    background: linear-gradient(#BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
    transition: all 1s ease-in-out;
    background-clip : text;
    -webkit-background-clip: text;
    color: transparent;
  }
`


interface Socials {
  SVGfill: string;
  style: CSSProperties
}
const SocialsContainer: React.FC<Socials> = ({ SVGfill, style }) => {
  return (
    <span id="socials_container" style={style}>
      <a rel="noreferrer" target="_blank" href="https://codepen.io/Beedazzle/pens/public">
        <svg fill={SVGfill} viewBox="0 0 100 100" width="24" height="24">
          <path d="M100 34.2c-.4-2.6-3.3-4-5.3-5.3-3.6-2.4-7.1-4.7-10.7-7.1-8.5-5.7-17.1-11.4-25.6-17.1-2-1.3-4-2.7-6-4-1.4-1-3.3-1-4.8 0-5.7 3.8-11.5 7.7-17.2 11.5L5.2 29C3 30.4.1 31.8 0 34.8c-.1 3.3 0 6.7 0 10v16c0 2.9-.6 6.3 2.1 8.1 6.4 4.4 12.9 8.6 19.4 12.9 8 5.3 16 10.7 24 16 2.2 1.5 4.4 3.1 7.1 1.3 2.3-1.5 4.5-3 6.8-4.5 8.9-5.9 17.8-11.9 26.7-17.8l9.9-6.6c.6-.4 1.3-.8 1.9-1.3 1.4-1 2-2.4 2-4.1V37.3c.1-1.1.2-2.1.1-3.1 0-.1 0 .2 0 0zM54.3 12.3L88 34.8 73 44.9 54.3 32.4V12.3zm-8.6 0v20L27.1 44.8 12 34.8l33.7-22.5zM8.6 42.8L19.3 50 8.6 57.2V42.8zm37.1 44.9L12 65.2l15-10.1 18.6 12.5v20.1zM50 60.2L34.8 50 50 39.8 65.2 50 50 60.2zm4.3 27.5v-20l18.6-12.5 15 10.1-33.6 22.4zm37.1-30.5L80.7 50l10.8-7.2-.1 14.4z" />
        </svg>
      </a>
      <a rel="noreferrer" target="_blank" href="https://github.com/Bdazzle">
        <svg fill={SVGfill} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
      <a id="profile-link" target="_blank" rel="noreferrer"
        href="https://www.freecodecamp.org/bdazzle">
        <svg fill={SVGfill} viewBox="0 500 700 482" width="26" height="24">
          <path d="m 117.51293,1051.6318 c -12.14837,-2.9002 -29.728148,-18.1522 -49.221868,-42.7042 c -39.570999,-49.83893 -61.0574994,-105.73952 -67.38493937,-175.31253 c -1.21782,-13.3906 -1.20559,-47.2689 0.0216,-59.6663 c 5.78590997,-58.45296 26.23995037,-108.79162 63.77079937,-156.94389 c 11.49299,-14.74558 30.54062,-34.06267 39.663438,-40.22459 c 12.90812,-8.71862 21.03329,-9.42362 28.83032,-2.50149 c 3.18001,2.82319 3.91138,4.13656 4.31868,7.75537 c 0.7669,6.81375 -2.72585,12.13801 -18.96746,28.91356 c -22.696898,23.44307 -33.167868,36.49307 -44.766288,55.79234 c -26.338069,43.82543 -37.608569,89.91434 -35.992979,147.1875 c 0.86072,30.51293 4.12574,53.0042 11.32601,78.01991 c 6.48504,22.53075 14.26864,40.69688 25.924939,60.50619 c 11.70369,19.8898 21.53849,32.4739 41.204948,52.72393 c 17.25351,17.7655 21.53909,23.9358 21.53909,31.0118 c 0,7.0391 -4.96843,13.4053 -11.98224,15.3532 c -3.87451,1.0761 -4.13811,1.0789 -8.284,0.089 z m 455.44089,0.2665 c -3.6719,-0.7795 -10.2381,-7.8414 -10.9785,-11.8072 c -1.1931,-6.3904 2.6087,-12.0821 20.332,-30.4391 c 8.7214,-9.0333 19.4526,-20.90733 23.8469,-26.38683 c 32.1524,-40.09154 50.0156,-84.70127 54.7815,-136.80559 c 1.4691,-16.06232 0.7096,-57.4481 -1.3391,-72.96716 c -4.2915,-32.50699 -12.2125,-59.101 -25.932,-87.06485 c -13.128,-26.75819 -26.7099,-45.73656 -49.6485,-69.375 c -15.4037,-15.87371 -19.9446,-21.67017 -21.493,-27.43577 c -1.5177,-5.65161 -0.4267,-9.8484 3.8122,-14.66398 c 5.8143,-6.60538 12.4561,-7.1946 22.8501,-2.02712 c 12.5814,6.25493 28.8861,22.58937 47.8125,47.89962 c 38.0781,50.92197 57.7171,106.94211 62.4372,178.10225 c 4.0104,60.46144 -10.6568,121.66332 -41.3038,172.3482 c -21.1547,34.98623 -53.4295,70.83673 -70.6155,78.43883 c -4.4918,1.987 -10.9367,2.9534 -14.562,2.1837 z m -380.08337,-36.8677 c -10.28745,-3.1184 -16.25136,-13.4004 -13.77065,-23.74113 c 1.53405,-6.3947 7.95351,-12.9693 14.1986,-14.5418 c 6.29118,-1.5842 331.73282,-1.5842 338.02402,0 c 6.4375,1.6209 12.762,8.2164 14.1687,14.7756 c 1.8436,8.59633 -2.0197,17.39503 -9.5253,21.69413 l -3.9679,2.2727 l -168.28125,0.159 c -92.55469,0.088 -169.43548,-0.1909 -170.84622,-0.6185 z m 128.18997,-79.10931 c -31.25226,-11.36715 -57.25414,-33.51988 -70.56464,-60.11872 c -7.39978,-14.78724 -11.69506,-32.69699 -11.69168,-48.75 c 0.005,-21.70289 8.49132,-42.38356 34.34641,-83.69612 c 19.25748,-30.77058 22.53856,-36.37804 28.2009,-48.19613 c 7.53515,-15.72687 10.01962,-25.06764 10.17751,-38.264 c 0.15089,-12.61133 -1.7391,-20.09344 -7.5478,-29.88024 c -4.12329,-6.94714 -13.3994,-17.40446 -17.16656,-19.35253 c -6.13981,-3.17502 -7.41241,-7.48767 -3.05249,-10.3444 c 6.89544,-4.51807 25.73535,-1.65272 43.04416,6.54654 c 19.58504,9.27752 34.01993,22.59896 43.41986,40.07061 c 7.2448,13.46592 10.1658,23.78505 15.07964,53.27252 c 5.45287,32.72211 10.85838,43.10388 21.78902,41.84779 c 5.79215,-0.66561 9.40698,-2.86376 11.84605,-7.20349 c 3.88524,-6.91287 2.21986,-16.37519 -5.638,-32.03379 c -6.42005,-12.79345 -6.0227,-16.65931 1.50762,-14.66788 c 3.90047,1.03149 16.5567,11.36919 25.31937,20.68104 c 21.92392,23.29795 32.83524,44.46488 38.0824,73.87633 c 2.75216,15.42644 2.98126,41.00657 0.48698,54.375 c -3.14675,16.86545 -9.52427,32.78449 -18.58816,46.39825 c -10.10669,15.18002 -31.19068,34.38621 -46.51897,42.37585 c -6.92209,3.60805 -9.32469,3.82678 -12.71769,1.15785 c -4.22027,-3.31967 -3.32896,-5.62767 6.0003,-15.53749 c 14.01697,-14.88926 21.17338,-25.47392 25.32527,-37.45728 c 6.40578,-18.48865 3.21723,-44.26491 -7.50796,-60.69426 c -4.44225,-6.80483 -10.95335,-12.80542 -13.89487,-12.80542 c -1.6103,0 -1.34313,2.12472 1.64246,13.06159 c 1.04617,3.83232 1.90212,8.51603 1.90212,10.40824 c 0,10.00778 -14.12604,17.26255 -26.56914,13.64525 c -10.11201,-2.93965 -14.56941,-12.11029 -13.23012,-27.21961 c 0.41387,-4.66907 0.78411,-13.15351 0.82275,-18.8543 c 0.0682,-10.05201 -0.0289,-10.56052 -3.21099,-16.83594 c -6.2022,-12.2312 -20.54678,-24.83023 -28.27035,-24.83023 c -3.33075,0 -3.60465,0.20129 -3.60465,2.64908 c 0,1.64378 0.92404,3.51158 2.43498,4.92188 c 8.00106,7.46811 9.50696,22.7712 3.57025,36.28131 c -3.66922,8.35 -7.80677,13.07915 -21.93727,25.07385 c -18.59248,15.78227 -24.58362,23.29724 -28.29903,35.49682 c -1.71871,5.64339 -1.89614,7.93993 -1.4124,18.28125 c 0.81216,17.36174 4.35055,28.87034 12.62068,41.04864 c 6.34961,9.35021 13.78457,15.28248 23.88216,19.05527 c 4.85612,1.81441 5.39063,2.28304 5.39063,4.72627 c 0,2.83211 -2.15357,4.69364 -5.329,4.60634 c -0.93624,-0.026 -5.49913,-1.42784 -10.13975,-3.11574 z" />
        </svg>
      </a>
      <a id="profile-link" target="_blank" rel="noreferrer"
        href="https://www.linkedin.com/in/brian-robinson-7b2432a5/">
        <svg fill={SVGfill} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>
    </span>
  )
}

const DensityInput = styled.input`
    ::-webkit-inner-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
    ::-webkit-outer-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
    width: 70%;
    margin-left:2%;    
`;

const circle = keyframes`
  0% {
    clip-path: circle(0%);
  }
  100% {
    clip-path: circle(100%);
  }
`

interface NestedBackgroundProps {
  backgroundColor: string;
  backgroundImage: string;
  pathname: string;
}

const NestedBackground = styled.div<NestedBackgroundProps>`
  width : 100%;
  height: 100%;
  background-color : ${props => props.backgroundColor};
  background-image : url(${props => props.backgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size : 100% auto;
  animation-name : ${props => props.pathname === '/' ? circle : 'none'};
  animation-timing-function: linear;
  animation-duration: 600ms;
`

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }
  #root {
    height: 100vh;
    width: 100vw;
  }
`

export const Portfolio: React.FC = () => {
  const [mouseCoords, setMouseCoords] = useState<Coords>({ x: undefined, y: undefined })
  //animation state as object and setting it w/spread triggers rerender. needed to reset animation outside of dots.
  const [defaultAnimationState, setDefaultAnimation] = React.useState({ animationState: 'running' })
  const [bubbleClicked, setBubbleClicked] = useState<[boolean, number | string]>([false, ''])
  const [showSocials, setShowSocials] = useState<boolean>(false)
  const [showNav, setShowNav] = useState<boolean>(false)
  const [showControls, setShowControls] = useState<boolean>(false)
  const [pDensity, setpDensity] = useState<number>(50)
  const [pSize, setpSize] = useState<number>(3)
  const { currentPathname, setIsMobile, currentTheme, setTheme, isMobile } = useContext(PortfolioContext)

  useEffect(() => {
    document.body.style.setProperty("background-color", currentTheme.backgroundColor);
    document.body.style.setProperty("color", currentTheme.color);
  }, [currentTheme])

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

  const handleMouseUp = (): void => {
    setDefaultAnimation({ ...defaultAnimationState })
    setBubbleClicked([false, ''])
  }

  const bubbleClickHandler = (clicked: boolean, index: number | string) => {
    setBubbleClicked([clicked, index])
  }

  const handleResize = useDebouncedCallback(() => setIsMobile(window.innerWidth as number <= 640), 200)
  const handleSizeChange = useDebouncedCallback((val: number) => setpSize(val), 200)

  useEffect(() => {
    setIsMobile(window.innerWidth as number <= 640)
    window.addEventListener("resize", handleResize);
    window.screen.orientation.addEventListener('change', () => {
      history.go(0)
    })
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <GlobalStyle />
      <div className="background"
        style={{
          width: `100%`,
          height: `100%`,
          backgroundColor: "black"
        }}
      >
        <NestedBackground className="nested_background"
          onMouseMove={(e) => handleMouseOver(e, 'mouse')}
          onTouchMove={(e) => handleMouseOver(e, 'touch')}
          onMouseUp={() => handleMouseUp()}
          onPointerUp={() => handleMouseUp()}
          backgroundColor={currentTheme.backgroundColor}
          backgroundImage={backgroundimg}
          pathname={currentPathname}
        >

          <Router routes={routes} location={location}>
            <nav id="navbar"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: 5,
              }}
            >
              {isMobile &&
                  <BurgerMenu
                    defaultClickState={showNav}
                    barstyle={{
                      width: 30,
                      height: 4,
                      backgroundColor: currentTheme.color,
                      margin: '0px 6px 4px 0px',
                    }}
                    containerstyle={{
                      display: 'inline-block',
                      cursor: 'pointer',
                      height: 17,
                      width: 30,
                      top: 20,
                      zIndex: 2,
                      marginLeft: 6,
                    }}
                    onClick={(): void => {
                      setShowNav(!showNav)
                    }} />
              }
              {!isMobile &&
                <SocialsContainer SVGfill={currentTheme.color}
                  style={{
                    visibility: (isMobile && showSocials) || !isMobile ? 'visible' : 'hidden',
                    width: isMobile ? 24 : '21vmin',
                    maxWidth: 190,
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    opacity: (isMobile && showSocials) || !isMobile ? 1 : 0,
                    transition: `all .5s ease-in-out`,
                    right: 0,
                    backgroundColor: currentTheme.backgroundColor,
                    top: 52,
                  }}
                />
              }
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
            {isMobile &&
              <div id="mobile_social_container" style={{
                display: 'flex',
                flexDirection: 'column',
                top: 30,
                right: 0,
                width: 26,
                position: 'fixed',
                zIndex: 3
              }}>
                <IconedButton
                  path={"M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"}
                  viewBox={"0 -3 24 27"}
                  svgDimensions={{
                    width: 24,
                    height: 24
                  }}
                  containerStyle={{
                    right: 0,
                    backgroundColor: rose,
                    width: 26,
                    borderRadius: showSocials ? '5px 0px 0px 0px' : '5px 0px 0px 5px',
                    zIndex: 301,
                  }}
                  fillColor={currentTheme.color}
                  onClick={(): void => setShowSocials(!showSocials)}
                />
                <SocialsContainer SVGfill={currentTheme.color}
                  style={{
                    visibility: showSocials ? 'visible' : 'hidden',
                    width: showSocials ? '100%' : 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    opacity: showSocials ? 1 : 0,
                    transition: 'margin-left .5s ease-in-out , opacity .5s ease-in-out ',
                    backgroundColor: rose,
                    borderRadius: '0px 0px 0px 5px',
                    height: '25vh',
                    marginLeft: showSocials ? '0%' : '100%',

                  }}
                />
              </div>
            }

            <Outlet />

            {Array.from(Array(pDensity).keys()).map((_, i) =>
              <AnimatedDot
                name={i}
                key={i}
                newCoords={(bubbleClicked[1] === i && mouseCoords) as Coords}
                defaultAnimationState={defaultAnimationState}
                particleSize={`${pSize}vmin`}
                colors={[`rgba(69, 142, 255, 1)`, `rgba(0, 45, 117, 1)`, `rgba(138, 165, 207, 1)`]}
                duration={6}
                clickHandler={bubbleClickHandler}
              />
            )}

            <div id="nav_links_container"
              style={{
                visibility: (isMobile && showNav) || !isMobile ? 'visible' : 'hidden',
                opacity: (isMobile && showNav) || !isMobile ? 1 : 0,
                position: 'fixed',
                width: (currentPathname === '/' && !isMobile) ? '50%'
                  : (isMobile && showNav) ? 125
                    : '60vw',
                top: (currentPathname === '/' && !isMobile) ? '25vh'
                  : (isMobile && showNav) ? 32
                    : 0,
                display: 'grid',
                left: isMobile ? '5vw' : '25vw',
                height: (currentPathname === '/' && !isMobile) ? 0
                  : (isMobile && showNav) ? 128
                    : 32,
                gridTemplateColumns: (currentPathname === '/' && !isMobile) ? '125px 125px'
                  : isMobile ? '125px'
                    : '125px 125px 125px 125px',
                gridTemplateRows: (currentPathname === '/' && !isMobile) ? '48px 48px' : '32px',
                rowGap: (currentPathname === '/' && !isMobile) ? '33vh' : 0,
                columnGap: (currentPathname === '/' && !isMobile) ? '33vw' : '5vw',
                backgroundColor: isMobile ? currentTheme.backgroundColor : 'transparent',
                transition: `all .5s ease-in-out`
              }}
            >
              <StyledLink className="nav_link"
                color={currentTheme.color}
                to="/"
                onClick={() => setShowNav(false)}
              >Home</StyledLink>
              <StyledLink className="nav_link"
                color={currentTheme.color}
                to="/contact"
                onClick={() => setShowNav(false)}
              >Contact</StyledLink>
              <StyledLink className="nav_link"
                color={currentTheme.color}
                to="/projects"
                onClick={() => setShowNav(false)}
              >Projects</StyledLink>
              <StyledLink className="nav_link"
                color={currentTheme.color}
                to="/about"
                onClick={() => setShowNav(false)}
              >about</StyledLink>
            </div>

            <div id="controls_container" style={{
              display: 'flex',
              flexDirection: 'column',
              right: 0,
              width: 34,
              bottom: 10,
              position: 'fixed',
              zIndex: 4,
            }}>

              <div id="controls_inputs" style={{
                visibility: showControls ? 'visible' : 'hidden',
                width: showControls ? '100%' : 0,
                display: 'flex',
                flexDirection: 'column',
                opacity: showControls ? 1 : 0,
                transition: 'margin-left .5s ease-in-out , opacity .5s ease-in-out ',
                backgroundColor: rose,
                borderRadius: '5px 0px 0px 5px',
                height: isMobile ? '35vh' : '25vh',
                marginLeft: showControls ? '0%' : '100%',
              }}>
                <IconedButton
                  containerStyle={{
                    right: 0,
                    backgroundColor: rose,
                    width: 34,
                    borderRadius: '5px 0px 0px 0px',
                    zIndex: 301,
                    textAlign: 'center'
                  }}
                  path={defaultAnimationState.animationState === 'running' ?
                    "M148.5,0C66.486,0,0,66.486,0,148.5S66.486,297,148.5,297S297,230.514,297,148.5S230.514,0,148.5,0z M213.292,190.121  c0,12.912-10.467,23.379-23.378,23.379H106.67c-12.911,0-23.378-10.467-23.378-23.379v-83.242c0-12.912,10.467-23.379,23.378-23.379  h83.244c12.911,0,23.378,10.467,23.378,23.379V190.121z"
                    : "M204.11,0C91.388,0,0,91.388,0,204.111c0,112.725,91.388,204.11,204.11,204.11c112.729,0,204.11-91.385,204.11-204.11    C408.221,91.388,316.839,0,204.11,0z M286.547,229.971l-126.368,72.471c-17.003,9.75-30.781,1.763-30.781-17.834V140.012    c0-19.602,13.777-27.575,30.781-17.827l126.368,72.466C303.551,204.403,303.551,220.217,286.547,229.971z"
                  }
                  viewBox={defaultAnimationState.animationState === 'running' ? "0 0 297 297" : "0 0 410 410"}
                  svgDimensions={{
                    width: 22,
                    height: 22
                  }}
                  text={defaultAnimationState.animationState === 'running' ? 'On' : 'Off'}
                  fillColor={currentTheme.color}
                  onClick={(): void => {
                    defaultAnimationState.animationState === 'running' ? setDefaultAnimation({ animationState: 'paused' })
                      : setDefaultAnimation({ animationState: 'running' })
                  }}
                />
                <label htmlFor="particle_density" style={{ textAlign: 'center' }} >N</label>
                <DensityInput type="number" id="particle_density"
                  onChange={(e) => setpDensity(Number((e.target as HTMLInputElement).value))}
                />
                <label htmlFor="particle_size" style={{ textAlign: 'center' }}>S</label>
                <input id="particle_size" type="range" min="0" max="100"
                  style={{
                    maxHeight: isMobile ? '10vh' : '8vh',
                    WebkitAppearance: `slider-vertical`,
                    MozOrient: "vertical"
                  }}
                  onInput={(e) => handleSizeChange(Number((e.target as HTMLInputElement).value))}
                />
              </div>

              <IconedButton
                containerStyle={{
                  right: 0,
                  bottom: 0,
                  backgroundColor: rose,
                  width: 34,
                  borderRadius: '0px 5px 5px 0px',
                  zIndex: 301,
                  transform: `rotate(180deg)`,
                  position: 'absolute'
                }}
                path={`M2485 8180 c-120 -14 -268 -39 -385 -66 -250 -58 -381 -122 -495 -242 -83 -88 -184 -343 -245 -622 -17 -79 -32 -146 -34 -147 -1 -1 -54 -40 -118 -85 -319 -228 -554 -446 -654 -608 -104 -170 -194 -394 -274 -686 -59 -216 -57 -203 -159 -1329 -93 -1019 -115 -1426 -116 -2130 0 -546 12 -879 40 -1106 35 -278 134 -493 312 -680 234 -245 476 -384 786 -451 144 -31 415 -31 529 0 163 44 323 137 501 291 243 210 429 488 714 1071 68 140 148 302 176 360 35 71 71 126 111 170 33 36 83 98 113 137 l54 73 102 -83 c231 -187 344 -242 609 -298 124 -26 369 -31 488 -10 273 48 509 137 710 269 172 114 276 246 413 524 l72 146 665 0 665 0 72 -146 c137 -278 241 -410 413 -524 198 -131 437 -221 710 -269 119 -21 364 -16 488 10 265 56 378 111 609 298 l102 83 54 -73 c29 -39 78 -99 109 -132 63 -69 80 -101 262 -475 303 -626 481 -900 726 -1117 178 -158 351 -260 517 -305 115 -31 385 -31 530 0 310 67 552 206 786 451 178 187 277 402 312 680 28 227 40 560 40 1106 -1 705 -23 1112 -116 2130 -100 1107 -104 1137 -175 1383 -87 301 -174 504 -288 675 -94 142 -343 367 -633 571 l-112 80 -11 55 c-6 31 -27 118 -46 194 -96 385 -204 558 -414 660 -137 67 -349 122 -610 158 -140 20 -434 17 -544 -5 -102 -20 -228 -64 -292 -101 -97 -57 -213 -183 -333 -362 -75 -113 -100 -168 -135 -299 -28 -108 -76 -378 -76 -430 l0 -31 -2610 0 -2610 0 0 31 c0 105 -82 482 -126 583 -33 77 -174 280 -252 364 -125 135 -240 198 -437 241 -105 22 -365 32 -490 18z m8135 -1386 c198 -55 331 -235 332 -449 0 -103 -21 -174 -79 -263 -129 -196 -410 -262 -613 -144 -240 139 -312 442 -159 671 49 74 104 120 190 160 109 51 206 58 329 25z m-7940 -523 l0 -279 -55 -69 c-91 -111 -234 -251 -281 -274 l-44 -21 -44 21 c-51 25 -162 131 -264 252 l-72 86 0 282 0 281 380 0 380 0 0 -279z m6833 -481 c127 -48 241 -168 282 -295 26 -79 26 -210 1 -285 -35 -103 -91 -179 -177 -240 -86 -60 -156 -82 -264 -84 -110 -1 -184 21 -270 79 -241 164 -273 511 -66 715 63 62 131 102 212 125 75 21 206 14 282 -15z m2209 19 c136 -29 262 -128 325 -257 35 -69 38 -83 41 -178 6 -150 -25 -237 -124 -343 -179 -194 -479 -197 -670 -7 -93 93 -133 194 -134 333 -1 290 275 512 562 452z m-9909 -79 c162 -130 287 -272 287 -325 0 -49 -114 -178 -279 -314 l-74 -61 -284 0 -283 0 0 373 c0 206 3 377 7 380 3 4 129 7 279 7 l273 0 74 -60z m1602 -320 l0 -375 -279 -3 -279 -2 -55 42 c-88 67 -242 219 -274 267 -15 25 -28 57 -28 72 0 54 137 204 309 337 l53 42 277 -2 276 -3 0 -375z m4242 54 c195 -64 351 -119 347 -124 -5 -4 -47 -19 -94 -34 -47 -14 -205 -66 -352 -115 l-268 -89 0 239 c0 131 3 239 6 239 3 0 166 -52 361 -116z m-2207 -119 l0 -225 -365 0 -365 0 0 225 0 225 365 0 365 0 0 -225z m-3095 -184 c55 -34 128 -105 227 -221 l98 -115 -2 -280 -3 -280 -375 0 -375 0 -3 281 -2 281 66 79 c99 118 162 181 228 230 64 49 95 54 141 25z m8326 -383 c177 -85 271 -231 271 -423 0 -138 -49 -254 -146 -343 -99 -91 -199 -126 -346 -120 -88 3 -104 7 -174 42 -383 189 -344 733 62 867 45 15 79 18 158 16 92 -3 109 -7 175 -39z m-6193 -794 c220 -45 429 -180 558 -360 58 -80 119 -211 145 -309 33 -120 33 -338 0 -455 -65 -231 -196 -412 -387 -537 -160 -104 -308 -147 -504 -147 -188 1 -343 46 -495 146 -351 230 -500 664 -365 1065 45 134 103 226 215 339 140 142 278 218 465 258 90 20 273 20 368 0z m4129 1 c302 -64 548 -262 664 -536 222 -521 -76 -1115 -628 -1251 -123 -30 -303 -30 -426 0 -216 53 -412 187 -535 365 -81 118 -125 221 -152 361 -17 83 -14 267 4 355 76 354 351 626 716 707 78 17 275 17 357 -1z`}
                viewBox={"0 0 12840 6552"}
                svgDimensions={{
                  width: 32,
                  height: 32
                }}
                fillColor={currentTheme.color}
                onClick={(): void => setShowControls(!showControls)}
              />
            </div>
          </Router>

        </NestedBackground>
      </div>
    </>
  );
}
