import Image from "next/image"
import { MainCard, MediaCardProps, ProjectCardProps } from "../portfoliotypes"

export const MediaCard: React.FC<MediaCardProps> = ({ source, style, title, className }) => {
    return <>
        {
            String(source)?.match(/\.mp4$/) ?
                <video controls
                itemProp="video"
                    src={'/assets/ffbesync_preview.mp4'}
                    className={className ? `${className} max-w-[450px] w-screen md:w-[50vw] h-full` : ""}
                    style={style && {
                        ...style,
                    }}>
                </video>
                :
                String(source)?.match(/\.png$/) ?
                    <Image itemProp="image"
                        alt={`${title} preview`}
                        src={source as string}
                        className={className ? `${className} md:pl-0 mb-[2.5%] md:mb-0 ` : ""}
                        style={style && {
                            ...style,
                        }}
                    ></Image>
                    :
                    <iframe src={source as string}
                        title={`${title} preview`}
                        className={className ? `${className} h-full w-[95%] md:w-[40vw] pl-[2.5%] md:pl-0 mb-[2.5%] md:mb-0 bg-white ` : ""}//object-contain
                        style={style && {
                            ...style,
                        }}
                    />
        }
    </>
}

export const BigCard: React.FC<MainCard> = ({ source, handleVis, indepth, constainerStyle, techLogos, title, className }) => {

    const handleHide = (event: React.MouseEvent | React.TouchEvent) => {
        event.stopPropagation()
        handleVis()
    }

    return (
        <div id="big_card_container"
            style={constainerStyle && constainerStyle}
            className={className}
            onClick={(e) => handleHide(e)}
        >
            <div id="big_blurb"
                className={`px-5 drop-shadow-[1px_1px_1px_cardBack] rounded-[5px] text-whitesmoke bg-cardBack opacity-100 w-[95%] md:w-[75vw] min-h-[75vh] r-[2.5%] md:r-[12.5vw] top-[7.5vw] z-[999] absolute animate-big`}>
                <div id="card_title" className={`text-yellowish text-center leading-normal tracking-[.2rem] font-Mandalore text-4xl mt-10`}
                >
                    {title}
                </div>
                <svg
                    onClick={(e) => handleHide(e)}
                    className={`absolute top-[.5vh] right-[.5vw]`}
                    fill="#666666" viewBox="0 0 460.775 460.775" height="24" width="24">
                    <path xmlns="http://www.w3.org/2000/svg" d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                </svg>
                <div className={`leading-normal font-Oxygen`} itemProp="description">
                    {indepth?.blurb}
                </div>
                <div className="text-center font-Mandalore text-2xl tracking-[.2rem]">
                    Steps:
                </div>
                <ul className="mt-0">
                    {indepth?.steps?.map((point: string, i: number) =>
                        <li key={`${title}_point_${i}`}
                            className="font-Oxygen leading-normal"
                        >
                            {point}
                        </li>)}
                </ul>
                <div className="text-center font-Mandalore text-2xl tracking-[.2rem]">
                    Learned:
                </div>
                <ul className="mt-0">
                    {indepth?.learned.map((point: string, i: number) =>
                        <li key={`${title}_point_${i}`}
                            className="font-Oxygen leading-normal"
                        >
                            {point}
                        </li>)}
                </ul>
                <ul className="flex flex-col md:flex-row justify-evenly">
                    {
                        Object.entries(techLogos as object).map((logo: [string, string], i: number) =>
                            <li key={`logo${i}li`} className="py-1">
                                <Image key={`logo${i}`} src={logo[1]}
                                    alt={logo[0]}
                                    className="max-h-7 max-w-[110px] align-middle"
                                ></Image>
                            </li>
                        )
                    }

                </ul>
                    <MediaCard
                        title={title}
                        source={source}
                        className={`mt-[30px] opacity-100 mr-0 z-[3] transition-opacity duration-1000 ease-in-out md:invisible md:h-0 md:w-0`}
                    />
            </div>
        </div >

    )
}

const activeBorderStyle = `bg-yellowish absolute`
const activeHeightBorder = `${activeBorderStyle} w-[2px] h-[98%] [transition:height_3s,background-color_1s] ease-in-out`
const inactiveBorderStyle = `bg-transparent absolute`
const activeWidthBorder = `${activeBorderStyle} w-[96%] h-[2px] [transition:width_3s,background-color_1s]`

export const ProjectCard: React.FC<ProjectCardProps> = ({ titlestyle, blurb, borderStyle, hovered, borderClass, titleclass, techLogos, title }) => {
    return (
        <div id={`${title}blurb_border`}
            className={`blub-border ${borderClass}`}
            style={borderStyle && {
                ...borderStyle,
            }}
        >
            <div id={`${title}blurb`}
                className={titleclass ? titleclass : 'title'}
                style={titlestyle && titlestyle}>
                <span id={`${title}left`}
                    className={hovered === true ? `${activeHeightBorder} left-[1%] top-[1%] rounded` : `${inactiveBorderStyle} left-0 w-[2px] h-0`}
                ></span>
                <span id={`${title}top`}
                    className={hovered === true ? `${activeWidthBorder} left-[1%] mt-[1%] rounded` : `${inactiveBorderStyle} left-0 w-0 h-[2px]`}
                ></span>
                <div className="text-center leading-normal tracking-[.2rem] font-Mandalore text-yellowish pt-[2%]">
                    {title}
                </div>
                <div className="font-Oxygen p-[2%]">
                    {blurb}
                </div>
                <ul className="w-[220px] h-40">
                    {techLogos &&
                        Object.entries(techLogos as object).map((logo: [string, string], i: number) =>
                            <li key={`logo${i}li`}
                                className="pb-[10px]">
                                <Image key={`logo${i}`} src={logo[1]}
                                    alt={logo[0]}
                                    className="max-h-7 max-w-[110px] align-middle"
                                ></Image>
                            </li>
                        )
                    }
                </ul>
                <span id={`${title}right`}
                    className={hovered === true ? `${activeHeightBorder} right-[3%] top-[1%] rounded` : `${inactiveBorderStyle} top-0 right-0 w-[2px] h-0`}
                ></span>
                <span id={`${title}bottom`}
                    className={hovered === true ? `${activeWidthBorder} left-[1%] bottom-[0.5%] rounded-xl` : `${inactiveBorderStyle} bottom-0 w-0 h-[2px]`}
                ></span>
            </div>

        </div>
    )
}