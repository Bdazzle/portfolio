import React, { CSSProperties, useContext, useEffect, useReducer, useState } from "react";
import rpgsheet from './assets/RPGSheetCreator_sample.png'
import ffbesyncvid from './assets/ffbesync_preview.mp4'
import mtgvid from './assets/MTGCollector_preview.mp4'
import react_navigation_brand from './assets/react_navigation_brand.png'
import expo_logo from './assets/logo-wordmark.png'
import jQuery_logo from './assets/jQuery-Logo.png'
import helm from './assets/admin_helm.png'
import { PortfolioContext } from './PortfolioContext';
import { useMatch } from "react-location";
import styled, { keyframes } from "styled-components";

/*
declaration for mp4 module added to react-app-env.d.ts
*/

interface CardData {
    source: string;
    blurb: string;
    title: string;
    techLogos: {
        [key: string]: string
    }
    indepth: {
        blurb: string;
        steps: string[];
        learned: string[];
    }
}

interface BlurbCard extends Partial<CardData> {
    style: CSSProperties;
    borderStyle: CSSProperties;
    className: string;
}

interface MainCard extends Partial<CardData> {
    handleVis: () => void;
    constainerStyle?: CSSProperties;
}

interface MediaCardProps extends Partial<CardData> {
    style: CSSProperties
}

const assets = ['http://michaelcthulhu.com/', rpgsheet, ffbesyncvid, mtgvid]

const cardbackColor = '#303134';
const yellowish = '#ba9e00';

const inactiveBorderStyle: CSSProperties = {
    backgroundColor: 'transparent',
    position: 'absolute',
}

const activeBorderStyle: CSSProperties = {
    backgroundColor: yellowish,
    position: 'absolute',
}

const activeHeightBorder: CSSProperties = {
    ...activeBorderStyle,
    width: '2px',
    height: '98%',
    transition: 'height 3s ease-in-out, background-color 1s ease-in-out'
}

const activeWidthBorder: CSSProperties = {
    ...activeBorderStyle,
    width: '98%',
    height: '2px',
    transition: 'width 3s ease-in-out, background-color 1s ease-in-out'
}

const bigCardContainer: CSSProperties = {
    display: "flex",
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: `rgba(255, 255, 255, .3)`,
    zIndex: 300,
    position: 'absolute',
    backdropFilter: `blur(2px)`,
    overflowY: 'scroll'
}

const biganimation = keyframes`
    0%{
        transform: scale(0)
    }
    100%{
        transform: scale(1)
    }
`

interface BigBlurbProps {
    isMobile: boolean;
}

const BigBlurb = styled.div<BigBlurbProps>`
  border-radius: 5px;
  filter: drop-shadow(0px 0px 10px ${cardbackColor}});
  color: whitesmoke;
  background-color: ${cardbackColor};
  opacity: 1;
  width: ${props => props.isMobile ? `95%` : `75vw`};
  min-height: 75vh;
  right: ${props => props.isMobile ? `2.5%` : `12.5vw`};
  top: 7.5vw;
  z-Index: 999;
  position: absolute;
  animation: ${biganimation} .5s ease-in-out;
`




const BigCard: React.FC<MainCard> = ({ source, handleVis, indepth, constainerStyle, techLogos, title }) => {
    const { isMobile } = useContext(PortfolioContext)

    const handleHide = () => {
        handleVis()
    }

    return (
        <div id="big_card_container"
            style={constainerStyle}
        >
            <BigBlurb isMobile = {isMobile} >

                <div style={{
                    textAlign: 'center',
                    lineHeight: 1.5,
                    letterSpacing: '.2rem',
                    fontFamily: "'Mandalore', sans-serif",
                    fontSize: 36,
                    color: yellowish,
                }}>
                    {title}
                </div>

                <svg
                    onClick={() => handleHide()}
                    style={{
                        position: 'absolute',
                        top: `.5vh`,
                        right: `.5vw`,
                    }}
                    fill="#666666" viewBox="0 0 460.775 460.775" height="24" width="24">
                    <path xmlns="http://www.w3.org/2000/svg" d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                </svg>

                <div style={{
                    lineHeight: 1.5,
                    fontFamily: "'Oxygen', sans-serif",
                    padding: 20,
                }}>
                    {indepth?.blurb}
                </div>
                {title === "michaelcthulhu.com" && <img
                    alt="hand made, spined metal helmet with admin emblazoned on it."
                    style={{
                        position: 'relative',
                        height: '15vh',
                        marginLeft: '25vw'
                    }}
                    src={helm} />}
                <div style={{
                    textAlign: 'center',
                    fontFamily: `'Mandalore', sans-serif`,
                    fontSize: 24,
                    letterSpacing: '.2rem'
                }}>Steps:</div>
                <ul style={{
                    marginTop: 0,
                }}>
                    {indepth?.steps.map((point: string, i: number) =>
                        <li key={`${title}_point_${i}`}
                            style={{
                                fontFamily: "'Oxygen', sans-serif",
                                lineHeight: 1.5,
                            }}
                        >
                            {point}
                        </li>)}
                </ul>
                <div style={{
                    textAlign: 'center',
                    fontFamily: `'Mandalore', sans-serif`,
                    fontSize: 24,
                    letterSpacing: '.2rem'
                }}>Learned:</div>
                <ul style={{
                    marginTop: 0,
                }}>
                    {indepth?.learned.map((point: string, i: number) =>
                        <li key={`${title}_point_${i}`}
                            style={{
                                fontFamily: "'Oxygen', sans-serif",
                                lineHeight: 1.5,
                            }}
                        >
                            {point}
                        </li>)}
                </ul>

                <ul
                    style={{
                        display: "flex",
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'space-evenly',
                    }}
                >
                    {
                        Object.entries(techLogos as object).map((logo: [string, string], i: number) =>
                            <li key={`logo${i}li`}>
                                <img key={`logo${i}`} src={logo[1]}
                                    alt={logo[0]}
                                    style={{
                                        maxHeight: 28,
                                        verticalAlign: 'middle'
                                    }}
                                ></img>
                            </li>
                        )
                    }

                </ul>
                {isMobile &&
                    <MediaCard
                        title={title}
                        source={source}
                        style={mobileMediaCard} />
                }
                </BigBlurb>

        </div >

    )
}

const ProjectCard: React.FC<BlurbCard> = ({ style, blurb, borderStyle, className, techLogos, title }) => {
    return (
        <div id={`${title}blurb_border`}
            className="blub_border"
            style={{
                ...borderStyle,
            }}
        >
            <span id={`${title}left`} style={
                className === "hovered" ? {
                    ...activeHeightBorder,
                    left: '1%',
                    top: '1%'
                } : {
                    ...inactiveBorderStyle,
                    left: 0,
                    width: '2px',
                    height: '0%',
                }
            }></span>
            <span id={`${title}top`} style={
                className === "hovered" ? {
                    ...activeWidthBorder,
                    left: '1%',
                    marginTop: '1%'
                } : {
                    ...inactiveBorderStyle,
                    left: 0,
                    width: '0%',
                    height: '2px',
                }
            }></span>

            <div id={`${title}blurb`}
                className={className}
                style={style}>
                <div style={{
                    textAlign: 'center',
                    lineHeight: 1.5,
                    letterSpacing: '.2rem',
                    fontFamily: "'Mandalore', sans-serif",
                    color: yellowish,
                    paddingTop: '2%'
                }}>
                    {title}
                </div>
                <div style={{
                    fontFamily: "'Oxygen', sans-serif",
                    padding: '2%'
                }}>
                    {blurb}
                </div>
                <ul style={{
                    width: '220px',
                    height: '160px',
                }}>
                    {techLogos &&
                        Object.entries(techLogos as object).map((logo: [string, string], i: number) =>
                            <li key={`logo${i}li`}
                                style={{
                                    paddingBottom: 10
                                }}
                            >
                                <img key={`logo${i}`} src={logo[1]}
                                    alt={logo[0]}
                                    style={{
                                        maxHeight: 28,
                                        verticalAlign: 'middle'
                                    }}
                                ></img>
                            </li>
                        )
                    }
                </ul>
            </div>

            <span id={`${title}right`} style={
                className === "hovered" ? {
                    ...activeHeightBorder,
                    top: '1%',
                    right: '1%',
                } : {
                    ...inactiveBorderStyle,
                    top: 0,
                    right: 0,
                    width: '2px',
                    height: '0%',
                }
            }></span>
            <span id={`${title}bottom`} style={
                className === "hovered" ? {
                    ...activeWidthBorder,
                    left: '1%',
                    bottom: '1%'
                } : {
                    ...inactiveBorderStyle,
                    bottom: 0,
                    width: '0%',
                    height: '2px',
                }
            }></span>
        </div>
    )
}

const MediaCard: React.FC<MediaCardProps> = ({ source, style, title }) => {
    const { isMobile } = useContext(PortfolioContext)

    return <>
        {
            source?.match(/\.mp4$/) ?
                <video controls
                    style={{
                        ...style,
                        maxWidth: 450,
                        width: isMobile ? '100vw' : '50vw',
                        height: '75vh'
                    }}>
                    <source
                        src={source}
                    ></source>
                </video>
                :
                source?.match(/\.png$/) ?
                    <img
                        alt={`${title} preview`}
                        src={source}
                        style={{
                            ...style,
                            width: isMobile ? '95%' : `40vw`,
                            height: `50vh`,
                            paddingLeft: isMobile && '2.5%',
                            marginBottom: isMobile && '2.5%',
                        }}
                    ></img>
                    :
                    <iframe src={source}
                        title={`${title} preview`}
                        style={{
                            ...style,
                            width: isMobile ? '95%' : `40vw`,
                            height: `50vh`,
                            marginLeft: isMobile && '2.5%',
                            marginBottom: isMobile && '2.5%',
                        }}
                    />
        }
    </>
}

const mobileMediaCard: CSSProperties = {
    marginTop: 30,
    opacity: 1,
    marginRight: '0%',
    transition: 'margin-left 1s ease-in-out , opacity 2s ease-in-out ',
    zIndex: 3,
}

const mediaActiveStyle: CSSProperties = {
    marginTop: 40,
    opacity: 1,
    top: 20,
    position: 'absolute',
    marginLeft: '0%',
    transition: 'margin-left 1s ease-in-out , opacity 2s ease-in-out ',
    zIndex: 3,
}

const mediaInactiveStyle: CSSProperties = {
    marginTop: 40,
    position: "absolute",
    top: 20,
    opacity: 0,
    marginLeft: '100%',
    transition: 'margin-left 1s ease-in-out , opacity 1s ease-in-out '
}

const blurbCardActiveBorder: CSSProperties = {
    marginTop: 40,
    marginLeft: 10,
    borderRadius: '5px',
    filter: `drop-shadow(0px 0px 5px ${cardbackColor})`,
    maxHeight: '50vh',
    minWidth: '230px',
    minHeight: '400px',
    width: '19vw',
    position: 'absolute',
    marginRight: '0%',
    opacity: 1,
    transition: 'margin-right 1s ease-in-out, opacity .5s ease-in-out',
}

//handles transitions to active card
const blurbCardInactiveBorder: CSSProperties = {
    border: '3px solid transparent',
    boxShadow: 'none',
    position: 'absolute',
    backgroundColor: 'transparent',
    opacity: 0,
    marginRight: '100%',
}

const blurbActiveStyle: CSSProperties = {
    borderRadius: '5px',
    paddingLeft: '.5vw',
    color: 'whitesmoke',
    backgroundColor: cardbackColor,
    opacity: 1,
    minWidth: '225px',
    minHeight: '400px',
    width: '18.5vw',
    height: '50vh',
    marginRight: '0%',
    transition: 'margin-right 1s ease-in-out 1s, opacity .5s ease-in-out, background-color .5s ease-in-out',
}

const blurbInactiveStyle: CSSProperties = {
    width: '19vw',
    backgroundColor: cardbackColor,
    top: 0,
    opacity: 0,
    marginRight: '100%',
    transition: 'margin-right .5s ease-in-out, opacity .5s ease-in-out'
}

const projectTitle = (textColor: string, mobile: boolean): CSSProperties => {
    return {
        marginTop: 10,
        minHeight: 55,
        maxHeight: 110,
        fontSize: mobile === true ? 24 : 32,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: textColor,
        transition: `font-size .5s ease-in-out`,
    }
}

const hoveredProjectTitle = (textColor: string, mobile: boolean): CSSProperties => {
    return {
        marginTop: 10,
        textShadow: `1px 1px 1px ${textColor}`,
        minHeight: 55,
        fontSize: mobile === true ? 28 : 36,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: textColor,
        transition: `font-size .5s ease-in-out`,
        cursor: 'pointer'
    }
}

const linkContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

interface ProjectAnchorProps {
    opacity: number;
    visibility: string;
    timing: string;
}
const ProjectAnchor = styled.a<ProjectAnchorProps>`
    & {
    position: relative;
    margin-bottom: 0;
    width: max-content;
    font-weight: bold;
    font-family: Roboto;
    color: #b55b67;
    text-decoration: none;
    cursor: pointer;
    font-size: 20px;
    opacity: ${(props) => props.opacity};
    visibility: ${(props) => props.visibility};
    transition: ${(props) => `margin-bottom ${props.timing} ease-in-out, opacity ${props.timing} ease-in-out, visibility ${props.timing} ease-in-out`}
    }   
    &::after {
              content: "";
              position: absolute;
              display: block;
              width: 100%;
              height: 2px;
              bottom: 0;
              left: 0;
              background-color: #b55b67;
              transform: scaleX(0);
              transform-origin: top left;
              transition: transform 0.3s ease;
            }
        
            &:hover::after {
              transform: scaleX(1);
            }
    `

function cardReducer(state: object, action: string): CardData {
    switch (action) {
        case 'mc':
            return {
                source: 'http://michaelcthulhu.com/',
                blurb: `First commissioned website. 
                Made for welder/content creator Michaelcthulhu who just wanted a website where his eyes followed you.`,
                title: `michaelcthulhu.com`,
                techLogos: {
                    "jQuery Logo": jQuery_logo
                },
                indepth: {
                    blurb: `First commissioned website. \n
                Made for welder/content creator Michaelcthulhu as his official website. \n 
                I was given only a black and white image to work with. \n
                He wanted a website where his eyes followed you, I added links to his various branded websites and SEO metatags.\n
                I was paid with:
                `,
                    steps: [
                        `I edited an image into parts that would need a corresponding html element while tracking their relative size.`,
                        `Overlayed each new image as html elements using proportional dimension measurements to allow flexible resizing.`,
                        `Implemented independent mouse tracking functions and mouse over animations.`
                    ],
                    learned: [`jQuery`, `CSS animations`, `Mouse tracking`, `Image editing`]
                }
            };
        case 'rpgsheet':
            return {
                source: rpgsheet,
                blurb: `Uploads image as canvas element, or uses overlays (limited amount) for preexisting games, to track RPG character sheets. Custom character sheets can be edited, saved, shared, and downloaded as a jpg or pdf.`,
                title: `RPG sheet creator`,
                techLogos: {
                    "Typescript badge": `https://badges.frapsoft.com/typescript/code/typescript.svg?v=101`,
                    "React Badge": `https://badges.aleen42.com/src/react.svg`,
                    "React Router badge": `https://badges.aleen42.com/src/react-router.svg`,
                    "Google Firebase basge": `https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase`
                },
                indepth: {
                    blurb: `Uploads image as canvas element, or uses overlays (limited amount) for preexisting games. \n 
                    Custom character sheets can be edited, saved, shared, and downloaded as a jpg or pdf. \n
                    This project was inspired by a friend of mine who makes their own games in addition to previous projects I had worked on that used Firebase, in an attempt to become more familiar with it.
                    `,
                    steps: [
                        `Built UI to display options depending on previously selected options`,
                        `Built templates and interactive overlays for existing games.`,
                        `Created scaling canvas element with image uploading to use as canvas background.`,
                        `Created tools that would draw on the canvas, simulating image editing tools, store selected coordinates, and dynamically generate inputs to customize the selection.`,
                        `Implement Google Oauth2 login and Firebase storage to save user's characters or character sheet they've made, and to allow sharing of custom sheets with other users.`,
                        `Build for mobile, a step that should have been done first, but I didn't know how image scaling would turn out or how canvases worked on mobile on the outset.`
                    ],
                    learned: [`Typescript`, `Firebase`, `Canvas API`, "SVGs"],
                },
            };
        case 'ffbesync':
            return {
                source: ffbesyncvid,
                blurb: `A mobile app to get your user data out of Final Fantasy Brave Exvius.
                Downloads your account's resources as JSON files to your mobile device.
                Adapted from the FFBE-Sync Chrome extension and used in conjunction with ffbeequip.com`,
                title: `FFBE Sync Mobile`,
                techLogos: {
                    "React Native badge": `https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB`,
                },
                indepth: {
                    blurb: `A mobile app to get your user data out of Final Fantasy Brave Exvius.
                Downloads your account's resources as JSON files to your mobile device. 
                Adapted from the FFBE-Sync browser extension and used in conjunction with ffbeequip.com.`,
                    steps: [
                        `I converted this JS/jQuery extension to a bare React Native project and updated the code to ECMAScript 2017, keeping the original cryptography and trying to maintain similar syntactic structure and front end aesthetics so anyone familiar with the project would understand it.`,
                        `Expo unimodules were installed for develpoment purposes.`,
                        `Implemented axios to replace ajax fetch requests.`,
                        `Implemented permissions (Google login, Facebook login, and device storage) to replace browser login flow and download links.`
                    ],
                    learned: [`React Native`, `Browser events`, `Mobile gesture handlers`, `Oauth2`, 'Device write permissions', `Android vs. iOS builds`],
                }
            };
        case 'mtg':
            return {
                source: mtgvid,
                blurb: `Searches for and catalogues client's Magic: the Gathering card collection. A simple application with a screen for search results, a screen showing user's collection, and a drawer with filtering options.`,
                title: `MTG Collector`,
                techLogos: {
                    "React Native badge": `https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB`,
                    "Amazon AWS badge": `https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white`,
                    "React Navigation logo": react_navigation_brand,
                    "Expo logo": expo_logo
                },
                indepth: {
                    blurb: `Searches for and catalogues client's Magic: the Gathering card collection. A simple application with a screen for search results, a screen showing user's collection, and a drawer with filtering options. \n
                    This project started as a 1 line search input when I first started learning how to code and use fetch requests. \n
                    I decided to build it into a personal use app while sitting on the floor, sorting my collection.
                    `,
                    steps: [
                        `Initialized with Expo.`,
                        `Found public APIs that had pertinent data I could collate to store in app, and later in a Cloud database.`,
                        `Built basic UI to implement draw and tab navigation`,
                        `Broke app down into separate sections based on functionality: Search, to manage API calls; Collection, to load and manage a user's existing data.`,
                        `Added AWS Amplify for login authentication and Graph database storage.`,
                        `Vaporwave.`
                    ],
                    learned: [`AWS Amplify`, `Introduction it GraphQL`, `Mobile app navigation`],
                },

            };
        default:
            return state as CardData
    }
}

export const Projects: React.FC = () => {
    const [currentCard, dispatchCard] = useReducer(cardReducer, {
        source: '',
        blurb: '',
        title: '',
        techLogos: {},
        indepth: {
            blurb: ``,
            steps: [],
            learned: [],
        }
    })
    const [focusedProject, setFocusedProject] = useState<string>()
    const [clickedProject, setClickedProject] = useState<string>()
    const { setCurrentPathname, currentTheme, isMobile } = useContext(PortfolioContext)
    const pathName = useMatch()

    useEffect(() => {
        setCurrentPathname(pathName.id)
    }, [])

    const handleMouseOver = (source: React.MouseEvent | React.TouchEvent): void => {
        const identifier = (source.target as HTMLElement).className.split(' ').pop() as string
        dispatchCard(identifier)
        setFocusedProject(identifier)
    }

    const handleClickedCard = (source: React.MouseEvent | React.TouchEvent): void => {
        const identifier = (source.target as HTMLElement).className.split(' ').pop() as string
        dispatchCard(identifier)
        setClickedProject(identifier)
    }

    const handleCardClose = (): void => {
        setClickedProject(undefined)
    }

    return (
        <>
            {
                clickedProject && <BigCard
                    title={currentCard.title}
                    indepth={currentCard.indepth}
                    techLogos={currentCard.techLogos}
                    constainerStyle={clickedProject ? bigCardContainer : undefined}
                    handleVis={handleCardClose}
                    source={currentCard.source}
                />
            }
            <div
                id="projects_container"
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: isMobile ? 'center' : 'space-evenly',
                    lineHeight: 1.5,
                }}>
                {!isMobile &&
                    <div className="blurb_container"

                        style={{
                            width: '25vw',
                            height: '50vh',
                            zIndex: 3,
                            order: 0,
                        }}
                    >
                        {assets.map((path: string) => <ProjectCard
                            key={`blurb_${path}`}
                            className={currentCard.source === path ? 'hovered' : ''}
                            title={currentCard.source === path ? currentCard.title : ''}
                            blurb={currentCard.source === path ? currentCard.blurb : ' '}
                            techLogos={currentCard.source === path ? currentCard.techLogos : undefined}
                            borderStyle={currentCard.source === path ? blurbCardActiveBorder : blurbCardInactiveBorder}
                            style={currentCard.source === path ? blurbActiveStyle : blurbInactiveStyle}
                        />)}
                    </div>
                }
                <div className="project_links"
                    style={{
                        width: isMobile ? '100%' : '33vw',
                        minWidth: '330px',
                        textAlign: 'center',
                        height: '80vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        order: isMobile && -1
                    }}>
                    <div style={{
                        fontSize: 36,
                        fontFamily: `'Mandalore', sans-serif`,
                        letterSpacing: '.2rem',
                        fontWeight: 'bold',
                    }}>Projects</div>

                    <div
                        id="mc"
                        className="mc"
                        onMouseOver={(e) => handleMouseOver(e)}
                        onTouchMove={(e) => handleMouseOver(e)}
                    >
                        <div className='mc'
                            style={focusedProject === 'mc' ? hoveredProjectTitle(currentTheme.color, isMobile) : projectTitle(currentTheme.color, isMobile)}
                            onClick={(e) => handleClickedCard(e)}
                            onTouchStart={(e) => handleClickedCard(e)}
                            onMouseOver={(e) => handleMouseOver(e)}
                            onTouchMove={(e) => handleMouseOver(e)}
                        >michaelcthulhu.com</div>

                        <div className="link_container"
                            style={linkContainerStyle}
                        >
                            <ProjectAnchor className="mc" target="_blank" rel="noreferrer"
                                href="http://michaelcthulhu.com/"
                                opacity={focusedProject === 'mc' ? 1 : 0}
                                visibility={focusedProject === 'mc' ? 'visible' : 'hidden'}
                                timing=".5s"
                            >michaelcthulhu.com</ProjectAnchor>
                        </div>

                    </div>
                    <div
                        className='ffbesync'
                        onMouseOver={(e) => handleMouseOver(e)}
                        onTouchMove={(e) => handleMouseOver(e)}
                    >
                        <div className='ffbesync'
                            style={focusedProject === 'ffbesync' ? hoveredProjectTitle(currentTheme.color, isMobile) : projectTitle(currentTheme.color, isMobile)}
                            onClick={(e) => handleClickedCard(e)}
                            onMouseOver={(e) => handleMouseOver(e)}
                            onTouchMove={(e) => handleMouseOver(e)}
                        >FFBE-Sync Mobile</div>

                        <div className="link_container"
                            style={linkContainerStyle}
                        >
                            <ProjectAnchor
                                className='ffbesync' target="_blank" rel="noreferrer"
                                href="https://github.com/Bdazzle/ffbeDataExporterMobile"
                                opacity={focusedProject === 'ffbesync' ? 1 : 0}
                                visibility={focusedProject === 'ffbesync' ? 'visible' : 'hidden'}
                                timing=".5s"
                            >FFBE-Sync Mobile Repo</ProjectAnchor>
                            <ProjectAnchor
                                className='ffbesync' target="_blank" rel="noreferrer"
                                href="https://github.com/Bdazzle/ffbeDataExporterMobile/releases/tag/1"
                                opacity={focusedProject === 'ffbesync' ? 1 : 0}
                                visibility={focusedProject === 'ffbesync' ? 'visible' : 'hidden'}
                                timing="1s"
                            >FFBE-Sync Mobile apk release</ProjectAnchor>
                        </div>

                    </div>
                    <div
                        className='mtg'
                        onMouseOver={(e) => handleMouseOver(e)}
                        onTouchMove={(e) => handleMouseOver(e)}
                    >
                        <div className='mtg'
                            style={focusedProject === 'mtg' ? hoveredProjectTitle(currentTheme.color, isMobile) : projectTitle(currentTheme.color, isMobile)}
                            onClick={(e) => handleClickedCard(e)}
                            onMouseOver={(e) => handleMouseOver(e)}
                            onTouchMove={(e) => handleMouseOver(e)}
                        >MTG Collector</div>
                        <div className="link_container"
                            style={linkContainerStyle}
                        >
                            <ProjectAnchor className='mtg' target="_blank" rel="noreferrer"
                                href="https://github.com/Bdazzle/mtgsearchapp-react-native"
                                opacity={focusedProject === 'mtg' ? 1 : 0}
                                visibility={focusedProject === 'mtg' ? 'visible' : 'hidden'}
                                timing=".5s"
                            >MTG Collector Mobile Repo</ProjectAnchor>
                            <ProjectAnchor className='mtg' target="_blank" rel="noreferrer"
                                href="https://snack.expo.dev/@beedazzle/github.com-bdazzle-mtgsearchapp-react-native"
                                opacity={focusedProject === 'mtg' ? 1 : 0}
                                visibility={focusedProject === 'mtg' ? 'visible' : 'hidden'}
                                timing="1s"
                            >Snack (without AWS)</ProjectAnchor>
                        </div>
                    </div>
                    <div
                        className='rpgsheet'
                        onMouseOver={(e) => handleMouseOver(e)}
                        onTouchMove={(e) => handleMouseOver(e)}
                    >
                        <div className='rpgsheet'
                            onClick={(e) => handleClickedCard(e)}
                            style={focusedProject === 'rpgsheet' ? hoveredProjectTitle(currentTheme.color, isMobile) : projectTitle(currentTheme.color, isMobile)}
                            onMouseOver={(e) => handleMouseOver(e)}
                            onTouchMove={(e) => handleMouseOver(e)}
                        >Custom RPG Sheet editor</div>
                        <div className="link_container"
                            style={linkContainerStyle}
                        >
                            <ProjectAnchor
                                className='rpgsheet' target="_blank" rel="noreferrer"
                                href="https://rpgsheetgenerator.web.app/"
                                opacity={focusedProject === 'rpgsheet' ? 1 : 0}
                                visibility={focusedProject === 'rpgsheet' ? 'visible' : 'hidden'}
                                timing=".5s"
                            >Working App</ProjectAnchor>
                            <ProjectAnchor
                                className='rpgsheet' target="_blank" rel="noreferrer"
                                href="https://github.com/Bdazzle/RPG_sheet_generator"
                                opacity={focusedProject === 'rpgsheet' ? 1 : 0}
                                visibility={focusedProject === 'rpgsheet' ? 'visible' : 'hidden'}
                                timing="1s"
                            >RPG Sheet editor repo</ProjectAnchor>
                        </div>
                    </div>
                </div>
                {!isMobile &&
                    <div className="preview_container"
                        style={{
                            width: '33vw',
                            height: '50vh',
                            zIndex: currentCard.source ? 3 : 1,
                        }}>
                        {
                            assets.map((path: string) => <MediaCard
                                title={currentCard.title}
                                key={path}
                                source={path}
                                style={currentCard.source === path ? mediaActiveStyle : mediaInactiveStyle}
                            />)
                        }
                    </div>
                }
            </div>
        </>
    )
}