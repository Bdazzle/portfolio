import React, { CSSProperties, useContext, useEffect, useRef, useState } from "react";
import { useMatch } from "react-location";
import { PortfolioContext } from './PortfolioContext';
import emailjs from 'emailjs-com'
import ReCAPTCHA from 'react-google-recaptcha'
import styled, { keyframes } from "styled-components";

const emailjs_user_ID = process.env.REACT_APP_EMAIL_JS_USER_ID as string
const emailjs_service_ID = process.env.REACT_APP_EMAIL_JS_SERVICE_ID as string
const emailjs_template_ID = process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID as string

const recpatchaKey = process.env.REACT_APP_RECAPTCHA_KEY as string

const rose = '#b55b67';

const inputContainer: CSSProperties = {
    background: 'white',
    zIndex: 2,
    marginTop: 10,
}

const baseInputStyle: CSSProperties = {
    border: 'none',
    paddingTop: 10,
    padding: 0,
}

const inputInactiveStyle: CSSProperties = {
    ...baseInputStyle,
    height: 36,
    borderBottom: '1px solid grey',
}

const inputActiveStyle: CSSProperties = {
    ...baseInputStyle,
    borderBottom: '1px solid transparent',
    height: 36,
    backgroundColor: '#ebebeb'
}

const activeInputSpan: CSSProperties = {
    position: 'relative',
    display: 'block',
    width: '100%',
    height: 1,
    bottom: 0,
    left: 0,
    backgroundColor: rose,
    transform: `scaleX(1)`,
    transition: `transform 0.3s ease`,
    zIndex: 2,
}

const inactiveInputSpan: CSSProperties = {
    height: 1,
    bottom: 2,
    backgroundColor: 'transparent',
    transform: `scaleX(0)`,
    transition: `transform 0.3s ease`
}



interface FormData {
    "Name": string,
    "Email": string,
    "Company"?: string,
    "Message": string,
}

interface Modal {
    containerStyle: CSSProperties,
    textStyle: CSSProperties,
    text: string
}

interface ModalSpan {
    mobileMargin: string
}

const highspan = keyframes`
    0%{
        height:0%
    }
    100%{
        height: 98%
    }
    `
const widespan = keyframes`
    0%{
        width:0%
    }
    100%{
        width: 98%
    }
    `
const fillanimation = keyframes`
    100% {
        box-shadow: inset 0px 0px 0px 60px ${rose};
      }
    `
const strokeanimation = keyframes`
    100% {
        stroke-dashoffset: 0;
      }
    `
const scaleanimation = keyframes`
    0%, 100% {
        transform: none;
    }
    50% {
        transform: scale3d(1.1, 1.1, 1);
    }
`

const LeftSpan = styled.span`
    background-color: ${rose};
    position: absolute;
    height: 96%;
    width: 2px;
    left: 2%;
    top: 2%;
    animation: ${highspan} .5s ease-in-out;
`

const TopSpan = styled.span<ModalSpan>`
    background-color: ${rose};
    position: absolute;
    width: 96%;
    height: 2px;
    left: 2%;
    top: ${props => props.mobileMargin};
    animation: ${widespan} .5s ease-in-out;
`

const RightSpan = styled.span`
    background-color: ${rose};
    position: absolute;
    width: 2px;
    height: 96%;
    top: 2%;
    right 2%;
    animation: ${highspan} .5 ease-in-out
`

const BottomSpan = styled.span`
    background-color: ${rose};
    position: absolute;
    width: 96%;
    height: 2px;
    left: 2%;
    bottom: 2%;
    animation: ${widespan} .5s ease-in-out;
`
const CheckmarkSVG = styled.svg`
    border-radius : 50%;
    stroke-width: 2;
    stroke: #fff;
    margin: 10% auto;
    box-shadow: inset 0px 0px 0px ${rose};
    animation: ${fillanimation} .4s ease-in-out .4s forwards, ${scaleanimation} .3s ease-in-out .9s both;
`
const CheckmarkCircle = styled.circle`
    stroke-width: 2px;
    stroke-miter-limit: 10px;
    fill: none;
    animation: ${strokeanimation} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
`
const CheckmarkCheck = styled.path`
    transform-origin: 50% 50%;
    stroke-dasharray: 96;
    stroke-dashoffset: 96;
    animation : ${strokeanimation} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
`
const SentModal: React.FC<Modal> = ({ containerStyle, textStyle, text }) => {
    const { isMobile } = useContext(PortfolioContext)

    return (
        <div className="modal_container" style={containerStyle}>
            <LeftSpan id="modal_left" />
            <TopSpan id="modal_top"
                mobileMargin={!isMobile ? '2%' : '1%'}
            />
            <div style={textStyle}>{text}</div>

            <span style={{
                display: "flex"
            }}>
                {!isMobile &&
                    <svg id="mail_icon" height="175" width="225" viewBox="0 0 80 80" >
                        <path d="M 88.056 62.682 H 42.167 c -1.074 0 -1.944 -0.87 -1.944 -1.944 V 29.262 c 0 -1.074 0.87 -1.944 1.944 -1.944 h 45.888 c 1.074 0 1.944 0.87 1.944 1.944 v 31.477 C 90 61.812 89.13 62.682 88.056 62.682 z"
                            style={{
                                fill: `rgb(243,172,71)`,
                            }}
                        />
                        <path d="M 65.112 41.087 L 40.837 62.15 c 0.348 0.328 0.814 0.533 1.33 0.533 h 45.888 c 0.516 0 0.982 -0.205 1.33 -0.533 C 88.218 61.136 65.112 41.087 65.112 41.087 z"
                            style={{
                                fill: `rgb(241,154,61)`,
                            }}
                        />
                        <path d="M 40.642 28.069 l 24.469 20.843 L 89.386 27.85 c -0.348 -0.328 -0.814 -0.533 -1.33 -0.533 H 42.167 C 41.546 27.318 40.998 27.615 40.642 28.069 z"
                            style={{
                                fill: `rgb(255,209,92)`,
                            }}
                        />
                        <polygon points="24.11,56.96 26.79,59.95 35.48,59.95 35.48,56.96 " />
                        <polygon points="16.07,47.99 18.75,50.98 35.48,50.98 35.48,47.99 " />
                        <polygon points="8.04,39.02 10.71,42.01 35.48,42.01 35.48,39.02 " />
                        <polygon points="0,30.05 2.68,33.04 35.48,33.04 35.48,30.05 " />
                    </svg>
                }
                <CheckmarkSVG className="checkmark__circle"
                    cx="52" cy="52" r="50" fill="none"
                    width="112" height="112"
                >
                    <CheckmarkCircle className="checkmark__circle" cx="56" cy="56"
                        r="52" fill="none" />
                    <svg viewBox="0 0 54 54"
                        width="112" height="112">
                        <CheckmarkCheck className="checkmark__check" fill="none" d="M14.1 27.2 l7.1 7.2 16.7-16.8" />
                    </svg>
                </CheckmarkSVG>
            </span>
            <RightSpan id="modal_right" />
            <BottomSpan id="modal_bottom" />
        </div >
    )
}

export const Contact: React.FC = () => {
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
    const { setCurrentPathname, isMobile, currentTheme } = useContext(PortfolioContext)
    const pathName = useMatch()

    useEffect(() => {
        setCurrentPathname(pathName.id)
    }, [])

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
            ref={backgroundRef}
            style={{
                height: '100%',
                width: '100%',
            }}>
            {
                showModal &&
                <SentModal
                    containerStyle={{
                        minHeight: 220,
                        minWidth: isMobile ? '50vw' : 400,
                        width: '50vw',
                        height: isMobile ? '40vh' : '25vh',
                        backgroundColor: currentTheme.color,
                        position: 'absolute',
                        zIndex: 3,
                        left: '25vw',
                        borderRadius: 10,
                        transition: 'height .3s ease-in-out',
                        marginTop: '15vh',
                    }}
                    textStyle={{
                        marginTop: 10,
                        textAlign: "center",
                        lineHeight: 1.5,
                        fontFamily: "'Oxygen', sans-serif",
                        fontWeight: 'bold',
                        color: currentTheme.backgroundColor
                    }}
                    text={`Message Received! Thank you for your interest`} />
            }
            <div
                style={{
                    paddingTop: '15vh',
                    fontSize: 36,
                    fontWeight: 'bold',
                    fontFamily: "'Mandalore', sans-serif",
                    textAlign: 'center',
                    letterSpacing: '.2rem',
                }}
            >Contact</div>
            <div style={{
                textAlign: "center",
                lineHeight: 1.5,
                fontFamily: "'Oxygen', sans-serif",
                fontWeight: 'bold',
                padding: isMobile && 10
            }}> Brian Robinson
                <br />
                <a href="mailto:bprobins1013@gmail.com" target="_blank" rel="noreferrer">bprobins1013@gmail.com</a>
                <br />
                Leave a message at the click...
                <br />
                I'll get back to you the next time I look at my phone.
                <br />

            </div>

            <form
                ref={formRef}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: `100vw`
                }}>

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
                                    style={activeField === field ? {
                                        ...inputActiveStyle,
                                        width: isMobile ? `80vw` : '33vw'
                                    } : {
                                        ...inputInactiveStyle,
                                        width: isMobile ? `80vw` : '33vw'
                                    }
                                    }
                                ></input>
                                <span key={`${field}span`}
                                    style={activeField === field ? activeInputSpan : inactiveInputSpan} />
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
                                    style={activeField === "Message" ? {
                                        ...inputActiveStyle,
                                        marginBottom: -5,
                                        width: isMobile ? `80vw` : '33vw'
                                    } : {
                                        ...inputInactiveStyle,
                                        marginBottom: -5,
                                        width: isMobile ? `80vw` : '33vw'
                                    }}
                                >
                                </textarea>
                                <span key={"Messagespan"}
                                    style={
                                        activeField === "Message" ? activeInputSpan : inactiveInputSpan} />
                            </div>
                    )
                }
                {
                    recaptchaToken ?
                        <div>
                            <button
                                name="Submit"
                                style={{
                                    border: 'none',
                                    backgroundColor: rose,
                                    marginTop: 10,
                                    fontSize: 28,
                                    color: currentTheme.color,
                                    borderRadius: '5px',
                                    boxShadow: `0px 0px 0px 5px #b55b67`,
                                    zIndex: 2,
                                    position: 'relative'
                                }}
                                onClick={(e) => handleSubmit(e)}
                                onMouseOver={(e) => handleMouseOver(e)}
                                onTouchMove={(e) => handleMouseOver(e)}
                            >Send</button>
                        </div>
                        :
                        <div id="captcha_container"
                            style={{
                                marginTop: 10,
                                zIndex: 3
                            }}
                        >
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