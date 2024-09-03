import React, { useContext, useReducer, useState } from "react";
import { PortfolioContext } from '../context/PortfolioContext';
import { cardReducer } from "../reducers/cardReducer";
import { BigCard, MediaCard, ProjectCard } from "../components/Cards";

type Projects = { [key: string]: string }[]

const projects: Projects = [{ 'soikelli': `https://soikkeli.com/` },
{ 'rpgsheet': '/assets/RPGSheetCreator_sample.png' },
{ 'ffbesynce': '/assets/ffbesync_preview.mp4' },
{ 'in-response': '/assets/in_response_sample.png' },
{ 'Trovestar': `https://www.trovestar.com/` },
{ 'ladyluck': `https://ladyluckmv.com/` }]

const projectTitle = (color: string) => `mt-[10px] text-2xl md:text-[32px] font-bold font-Roboto text-[${color}] transition-[font-size] duration-500 ease-in-out`

const hoveredProjectTitle = (color: string) => `mt-[10px] text-[28px] md:text-4xl font-bold font-Roboto text-[${color}] drop-shadow-[1px_1px_1px_${color}] cursor-pointer transition-[font-size] duration-500 ease-in-out`

const linkContainerStyle = `flex flex-col items-center`

const anchorClassStyle = `relative mb-0 w-max font-bold text-rose no-underline cursor-pointer text-xl 
after:content-none after:absolute after:block after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-rose after:scale-x-0 after:origin-top-left after:transition-transform after:duration-300 after:ease
hover:after:scale-x-100`

const Projects: React.FC = () => {
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
    const { currentTheme } = useContext(PortfolioContext)

    const handleMouseOver = (source: React.MouseEvent | React.TouchEvent): void => {
        source.stopPropagation()
        const identifier = (source.currentTarget as HTMLElement).className.split(' ')[0] as string
        dispatchCard(identifier)
        setFocusedProject(identifier)
    }

    const handleClickedCard = (source: React.MouseEvent | React.TouchEvent): void => {
        const identifier = (source.target as HTMLElement).className.split(' ')[0] as string
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
                    className={clickedProject ? `flex justify-center items-center h-full w-full bg-white bg-opacity-30 z-10 absolute top-0 overflow-y-scroll backdrop-blur-[2px]`
                        : ''}
                    handleVis={handleCardClose}
                    source={currentCard.source}
                />
            }
            <div
                id="projects_container"
                className={`flex flex-col md:flex-row leading-normal mt-10`}>
                <div className="blurb_container w-[30vw] h-[50vh] z-[3] order-none hidden md:block">
                    {
                        projects.map((path) => {
                            const title = Object.keys(path)[0]
                            const source = path[title]
                            return <ProjectCard
                                key={`blurb_${title}`}
                                hovered={currentCard.source === source ? true : false}
                                title={currentCard.source === source ? title : ''}
                                blurb={currentCard.source === source ? currentCard.blurb : ' '}
                                techLogos={currentCard.source === source ? currentCard.techLogos : undefined}
                                borderClass={currentCard.source === source ? `mt-10 ml-[10px] rounded min-w-[230px] min-h-[400px] w-[19vw] absolute mr-0 opacity-100 drop-shadow-cardShadow [transition:opacity_.5s,margin-right_1s] ease-in-out`
                                    : `absolute mr-full opacity-0 shadow-none bg-transparent border-[3px] border-solid border-transparent`}
                                titleclass={currentCard.source === source ? ` rounded pl-[.5vw] text-whitesmoke bg-cardBack opacity-100 min-w-[225px] min-h-[400px] w-[18.5vw] mr-0 [transition:opacity_.5s,margin-right_1s_1s,background-color_.5s] ease-in-out`
                                    : `w-[19vw] bg-cardBack top-0 opacity-0 mr-[100%] transition-[opacity,margin-right] duration-500 ease-in-out`}
                            />
                        })
                    }
                </div>
                <div id="project_links" itemScope itemType="https://schema.org/CreativeWork"
                    className={`w-full md:w-[33vw] min-w-[330px] text-center h-[80vh] flex flex-col justify-between `}>
                    <h1 className={`text-4xl font-Mandalore font-bold tracking-[.2rem]`}>
                        Projects
                    </h1>
                    <div
                        className='in-response'
                        onMouseOver={(e) => handleMouseOver(e)}
                        onTouchMove={(e) => handleMouseOver(e)}
                    >
                        <div id='in-response'
                            className={`${focusedProject === 'in-response' ? hoveredProjectTitle(currentTheme.color) : projectTitle(currentTheme.color)}`}
                            onClick={(e) => handleClickedCard(e)}
                        >
                            In Response...
                        </div>
                        <div
                            className={`in-response link-container ${linkContainerStyle}`}
                        >
                            <a target="_blank" rel="noreferrer"
                                id="in_response_repo_link"
                                href="https://github.com/Bdazzle/mtg_counter"
                                className={`${anchorClassStyle} duration-500 ${focusedProject === 'in-response' ? `opacity-100 visible` : `opacity-0 invisible`}`}
                            >
                                In Response GitHub Repo
                            </a>
                            <a target="_blank" rel="noreferrer"
                                id="in_response_link"
                                href="https://play.google.com/store/apps/details?id=com.beedazzle.mtg_counter&pli=1"
                                className={`${anchorClassStyle} duration-1000 ${focusedProject === 'in-response' ? `opacity-100 visible` : `opacity-0 invisible`}`}
                            >
                                In Response Play Store
                            </a>
                        </div>
                    </div>
                    <div
                        className='trovestar'
                        onMouseOver={(e) => handleMouseOver(e)}
                        onTouchMove={(e) => handleMouseOver(e)}
                    >
                        <div
                            className={`trovestar ${focusedProject === 'trovestar' ? hoveredProjectTitle(currentTheme.color) : projectTitle(currentTheme.color)}`}
                            onClick={(e) => handleClickedCard(e)}
                        >
                            TroveStar
                        </div>
                        <div className={`trovestar link-container ${linkContainerStyle}`}
                        >
                            <a target="_blank" rel="noreferrer"
                                id="trovestar_link"
                                href="https://www.trovestar.com/"
                                className={`${anchorClassStyle} duration-500 ${focusedProject === 'trovestar' ? `opacity-100 visible` : `opacity-0 invisible`}`}
                            >
                                TroveStar.com
                            </a>
                        </div>
                    </div>
                    <div
                        id="ladyluck"
                        className="ladyluck"
                        onMouseOver={(e) => handleMouseOver(e)}
                        onTouchMove={(e) => handleMouseOver(e)}
                    >
                        <div
                            className={`ladyluck ${focusedProject === 'ladyluck' ? hoveredProjectTitle(currentTheme.color) : projectTitle(currentTheme.color)}`}
                            onClick={(e) => handleClickedCard(e)}
                        >Lady Luck MV</div>

                        <div className={`ladyluck link-container ${linkContainerStyle}`}
                        >
                            <a target="_blank" rel="noreferrer"
                                id="ladyluck_link"
                                href="https://ladyluckmv.com/"
                                className={`${anchorClassStyle} duration-500 ${focusedProject === 'ladyluck' ? `opacity-100 visible` : `opacity-0 invisible`}`}
                            >
                                Lady Luck MV
                            </a>
                        </div>
                    </div>
                    <div
                        id="soikkeli"
                        className="soikkeli"
                        onMouseOver={(e) => handleMouseOver(e)}
                        onTouchMove={(e) => handleMouseOver(e)}
                    >
                        <div
                            className={`soikkeli ${focusedProject === 'soikkeli' ? hoveredProjectTitle(currentTheme.color) : projectTitle(currentTheme.color)}`}
                            onClick={(e) => handleClickedCard(e)}
                        >
                            Soikkeli and Company
                        </div>

                        <div className={`soikkeli link-container ${linkContainerStyle}`}
                        >
                            <a target="_blank" rel="noreferrer"
                                id="soikkeli_link"
                                href="https://soikkeli.com/"
                                className={`${anchorClassStyle} duration-500 ${focusedProject === 'soikkeli' ? `opacity-100 visible` : `opacity-0 invisible`}`}
                            >
                                Soikkeli and Company
                            </a>
                        </div>
                    </div>
                    <div
                        className='rpgsheet'
                        onMouseOver={(e) => handleMouseOver(e)}
                        onTouchMove={(e) => handleMouseOver(e)}
                    >
                        <div
                            className={`rpgsheet ${focusedProject === 'rpgsheet' ? hoveredProjectTitle(currentTheme.color) : projectTitle(currentTheme.color)}`}
                            onClick={(e) => handleClickedCard(e)}
                        >
                            Custom RPG Sheet editor
                        </div>
                        <div className={`rpgsheet link-container ${linkContainerStyle}`}
                        >
                            <a target="_blank" rel="noreferrer"
                                id="rpgsheet_link"
                                href="https://rpgsheetgenerator.web.app/"
                                className={`${anchorClassStyle} duration-500 ${focusedProject === 'rpgsheet' ? `opacity-100 visible` : `opacity-0 invisible`}`}
                            >
                                Working App
                            </a>
                            <a target="_blank" rel="noreferrer"
                                id="rpgsheet_repo_link"
                                href="https://github.com/Bdazzle/RPG_sheet_generator"
                                className={`${anchorClassStyle} duration-1000 ${focusedProject === 'rpgsheet' ? `opacity-100 visible` : `opacity-0 invisible`}`}
                            >
                                RPG Sheet editor repo
                            </a>
                        </div>
                    </div>
                    <div
                        className='ffbesync'
                        onMouseOver={(e) => handleMouseOver(e)}
                        onTouchMove={(e) => handleMouseOver(e)}
                    >
                        <div
                            className={`ffbesync ${focusedProject === 'ffbesync' ? hoveredProjectTitle(currentTheme.color) : projectTitle(currentTheme.color)}`}
                            onClick={(e) => handleClickedCard(e)}
                        >
                            FFBE-Sync Mobile
                        </div>
                        <div className={`ffbesync link-container ${linkContainerStyle}`}
                        >
                            <a target="_blank" rel="noreferrer"
                                id="ffbesync_repo_link"
                                href="https://github.com/Bdazzle/ffbeDataExporterMobile"
                                className={`${anchorClassStyle} duration-500 ${focusedProject === 'ffbesync' ? `opacity-100 visible` : `opacity-0 invisible`}`}
                            >
                                FFBE-Sync Mobile Repo
                            </a>
                            <a target="_blank" rel="noreferrer"
                                id="ffbesync_link"
                                href="https://github.com/Bdazzle/ffbeDataExporterMobile/releases/tag/1"
                                className={`${anchorClassStyle} duration-1000 ${focusedProject === 'ffbesync' ? `opacity-100 visible` : `opacity-0 invisible`}`}
                            >
                                FFBE-Sync Mobile apk release
                            </a>

                        </div>
                    </div>
                </div>
                <div className="preview_container relative overflow-hidden w-[33vw] h-[75vh] hidden md:block"
                    style={{
                        zIndex: currentCard.source ? 3 : 1,
                    }}
                >
                    {
                        projects.map((path) => {
                            const title = Object.keys(path)[0]
                            const source = path[title]
                            return (<MediaCard
                                title={title}
                                key={title as string}
                                source={source}
                                style={{
                                    transition: currentCard.source === source ? `transform 1s ease-in-out, opacity 1.5s ease-in-out` : ``,
                                    transform: currentCard.source === source ? `translateX(0)` : `translateX(100%)`,
                                    opacity: currentCard.source === source ? 1 : 0
                                }}
                                className={`${title === 'rpgsheet' ? `h-auto` : `h-[95%]`} ${currentCard.source === source ? ` absolute top-5 z-[3] ` : `top-5 absolute animate-cardfadeout`}`}
                            />
                            )
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default Projects