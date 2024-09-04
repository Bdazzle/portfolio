import React, { CSSProperties, useContext, useRef, useState } from "react";
import emailjs from 'emailjs-com'
import ReCAPTCHA from 'react-google-recaptcha'
import { PortfolioContext } from "../context/PortfolioContext";

const emailjs_user_ID = process.env.NEXT_PUBLIC_EMAIL_JS_USER_ID as string
const emailjs_service_ID = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID as string
const emailjs_template_ID = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID as string

const recpatchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY as string

const inputContainer: CSSProperties = {
    background: 'white',
    zIndex: 2,
    marginTop: 10,
}

const baseInputStyle: string = `border-0 pt-[10px] p-0`
const inputInactiveStyle: string = `${baseInputStyle} h-9 border border-solid border-gray-500`
const inputActiveStyle: string = `${baseInputStyle} border border-solid border-transparent h-9 bg-[#ebebeb]`
const activeInputSpan: string = `relative block w-full h-[1px] bottom-0 left-0 bg-rose z-2 scale-x-100 transition-transform duration-300 ease`
const inactiveInputSpan: string = `h-[1px] bottom-[2px] bg-transparent scale-x-0 transition-transform duration-300 ease`

interface FormData {
    "Name": string,
    "Email": string,
    "Company"?: string,
    "Message": string,
}

interface ModalProps {
    containerStyle?: CSSProperties,
    textStyle?: CSSProperties,
    containerClass?: string,
    textClass?: string,
    text: string
}

const SentModal: React.FC<ModalProps> = ({ containerStyle, textStyle, containerClass, textClass, text }) => {
    const { currentTheme } = useContext(PortfolioContext)

    return (
        <div className={`modal_container ${containerClass ? containerClass : ''}`} style={containerStyle && containerStyle}>
            <span id="modal_left" className={`bg-rose absolute h-[96%] w-[2px] left-[2%] top-[2%] animate-highspan`}></span>
            <span id="modal_top" className={`bg-rose absolute w-[96%] h-[2px] left-[2%] top-[1%] md:top-[2%] animate-widespan`}></span>
            <div style={textStyle && textStyle}
                className={textClass}>
                {text}
            </div>
            <span className={`flex md:flex-row flex-col justify-center`}>
                <svg id="mail_icon" viewBox="0 0 80 80" className="h-44 w-56 md:visible hidden md:inline">
                    <path d="M 88.056 62.682 H 42.167 c -1.074 0 -1.944 -0.87 -1.944 -1.944 V 29.262 c 0 -1.074 0.87 -1.944 1.944 -1.944 h 45.888 c 1.074 0 1.944 0.87 1.944 1.944 v 31.477 C 90 61.812 89.13 62.682 88.056 62.682 z"
                        className="fill-[rgb(243,172,71)]"
                    />
                    <path d="M 65.112 41.087 L 40.837 62.15 c 0.348 0.328 0.814 0.533 1.33 0.533 h 45.888 c 0.516 0 0.982 -0.205 1.33 -0.533 C 88.218 61.136 65.112 41.087 65.112 41.087 z"
                        className="fill-[rgb(241,154,61)]"
                    />
                    <path d="M 40.642 28.069 l 24.469 20.843 L 89.386 27.85 c -0.348 -0.328 -0.814 -0.533 -1.33 -0.533 H 42.167 C 41.546 27.318 40.998 27.615 40.642 28.069 z"
                        className="fill-[rgb(255,209,92)]"
                    />
                    <polygon points="24.11,56.96 26.79,59.95 35.48,59.95 35.48,56.96 " />
                    <polygon points="16.07,47.99 18.75,50.98 35.48,50.98 35.48,47.99 " />
                    <polygon points="8.04,39.02 10.71,42.01 35.48,42.01 35.48,39.02 " />
                    <polygon points="0,30.05 2.68,33.04 35.48,33.04 35.48,30.05 " />
                </svg>
                <svg id="CheckmarkSVG" cx="52" cy="52" r="50" fill="none" width="112" height="112"
                    className={`checkmark_circle rounded-[50%] stroke-2 stroke-green-500 mt-[8%] mx-auto shadow-check animate-checkAnimation`}>
                    <circle id="CheckmarkCircle" cx="56" cy="56" r="52" fill={currentTheme.color}
                        className={`stroke-2 animate-strokeAnimation`}></circle>
                    <svg viewBox="0 0 54 54"
                        width="112" height="112">
                        <path id="CheckmarkCheck" fill="none" d="M14.1 27.2 l7.1 7.2 16.7-16.8" strokeDasharray={96} strokeDashoffset={96}
                            className="origin-[50%_50%] animate-strokeAnimation">
                        </path>
                    </svg>
                </svg>
            </span>
            <span id="modal_right" className={`bg-rose absolute w-[2px] h-[96%] top-[2%] right-[2%] animate-highspan`}></span>
            <span id="modal_bottom" className={`bg-rose absolute w-[96%] h-[2px] left-[2%] bottom-[2%] animate-widespan`}></span>
        </div >
    )
}

const Contact: React.FC = () => {
    const [activeField, setActiveField] = useState<string>()
    const [recaptchaToken, setRecaptchaToken] = useState<string>();
    const [contactInfo, setContactInfo] = useState<FormData>({
        "Name": '',
        "Email": '',
        "Company": undefined,
        "Message": '',
    })
    const [showModal, setShowModal] = useState<boolean>()
    const formRef = useRef<HTMLFormElement>(null)
    const capRef = useRef<ReCAPTCHA>(null)
    const backgroundRef = useRef<HTMLDivElement>(null)
    const { currentTheme } = useContext(PortfolioContext)

    const handleMouseOver = (event: React.MouseEvent | React.TouchEvent) => {
        setActiveField((event.target as HTMLInputElement).name)
    }

    const handleSubmit = async (event: React.MouseEvent) => {
        event.preventDefault()
        emailjs.sendForm(emailjs_service_ID, emailjs_template_ID, formRef.current as HTMLFormElement, emailjs_user_ID)
        capRef.current?.reset()
        setRecaptchaToken(undefined)
        setShowModal(true)
        console.info('sent')
        backgroundRef.current?.addEventListener('click', () => {
            setShowModal(false)
        })
    }

    const handleInputChange = (e: React.ChangeEvent): void => {
        setContactInfo({ ...contactInfo, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value })
    }

    return (
        <div id="contact_background"
            itemScope itemType="http://schema.org/ContactPage"
            ref={backgroundRef}
            className="w-full h-full">
            {
                showModal &&
                <SentModal
                    containerClass={`min-h-[220px] min-w-[50vw] md:min-w-[400px] w-[40vw] h-[30vh] md:h-[25vh] absolute z-[3] left-[30vw] rounded-[10px] mt-[15vh] transition-[height] duration-300 ease-in-out`}
                    containerStyle={{
                        backgroundColor: currentTheme.color
                    }}
                    textClass={`mt-[10px] text-center leading-normal font-Oxygen font-bold `}
                    textStyle={{
                        color: currentTheme.backgroundColor
                    }}
                    text={`Message Received! Thank you for your interest`} />
            }
            <h1 className={`pt-[15vh] text-4xl font-bold font-Mandalore text-center tracking-[.2rem]`}>
                ContAct
            </h1>
            <div className={`text-center leading-normal font-Oxygen font-bold p-[10px] md:p-0`}>
                Brian Robinson
                <br />
                <a href="mailto:bprobins1013@gmail.com" target="_blank" rel="noreferrer" itemProp="email">bprobins1013@gmail.com</a>
                <br />
                Leave a message at the click...
                <br />
                I'll get back to you the next time I look at my phone.
                <br />
            </div>

            <form ref={formRef}
                className="flex flex-col items-center w-[100vw]">
                {
                    Object.keys(contactInfo).map(field =>
                        field !== "Message" ?
                            <div key={field}
                                style={inputContainer}
                            >
                                <input type="text"
                                    placeholder={field}
                                    name={field}
                                    onMouseOver={(e) => handleMouseOver(e)}
                                    onTouchMove={(e) => handleMouseOver(e)}
                                    onChange={(e) => handleInputChange(e)}
                                    className={`w-[80vw] md:w-[33vw] ${activeField === field ? inputActiveStyle : inputInactiveStyle}`}
                                ></input>
                                <span key={`${field}span`}
                                    className={activeField === field ? activeInputSpan : inactiveInputSpan}
                                />
                            </div>
                            :
                            <div key="Message"
                                style={inputContainer}>
                                <textarea
                                    placeholder="Message"
                                    key="Message"
                                    name="Message"
                                    onMouseOver={(e) => handleMouseOver(e)}
                                    onTouchMove={(e) => handleMouseOver(e)}
                                    onChange={(e) => handleInputChange(e)}
                                    className={`-mb-[5px] w-[80vw] md:w-[33vw] ${activeField === "Message" ? inputActiveStyle : inputInactiveStyle}`}
                                >
                                </textarea>
                                <span key={"Messagespan"}
                                    className={activeField === "Message" ? activeInputSpan : inactiveInputSpan}
                                />
                            </div>
                    )
                }
                {
                    recaptchaToken ?
                        <div>
                            <button
                                name="Submit"
                                className={`border-0 bg-rose mt-[10px] text-[28px] rounded-[5px] z-2 relative shadow-submitShadow`}
                                style={{
                                    color: currentTheme.color
                                }}
                                onClick={(e) => handleSubmit(e)}
                                onMouseOver={(e) => handleMouseOver(e)}
                                onTouchMove={(e) => handleMouseOver(e)}
                            >Send</button>
                        </div>
                        :
                        <div id="captcha_container"
                            className="mt-[10px] z-[3]">
                            <ReCAPTCHA
                                ref={capRef}
                                sitekey={recpatchaKey}
                                onChange={(e) => setRecaptchaToken(e as string)}
                            />
                        </div>
                }
            </form>
        </div>
    )
}

export default Contact