import React, { useContext, useEffect } from "react";
import { useMatch } from "react-location";
import { PortfolioContext } from './PortfolioContext';

export const About: React.FC = () => {
    const { setCurrentPathname, currentTheme, isMobile } = useContext(PortfolioContext)
    const pathName = useMatch()

    useEffect(() => {
        setCurrentPathname(pathName.id)
    }, [])

    return (
        <div style={{
            width: '80%',
            marginLeft: '10%',
            marginRight: '10%',
            paddingTop: isMobile ? 0 : '15vh'
        }}>
            <div style={{
                textAlign: 'center',
                fontFamily: `'Mandalore', sans-serif`,
                fontSize: 36,
                letterSpacing: '.2rem',
                
            }}>About</div>
            <div style={{
                fontFamily: "'Oxygen', sans-serif",
                fontWeight: 'bold',
                lineHeight: 1.5,
            }}>I am a self taught coder. I started learning from freecodecamp, and learned more from MDN, CS50, Stack Overflow (of course!), and various Youtube channels (as a visual aid tool for unfamiliar technologies).
                <br />
                I'm a huge gaming nerd.
                <br />
                Wu-Tang Forever...
            </div>
            {/* <ul>
                Future Directions?
                <li>Java for Mobile development</li>
                <li>GraphQL</li>
                <li>Social Engineering</li>
                <li>Next.js, MaterialUI</li>
                <li>Tailwind, styled components</li>
                <li>Formal CS training</li>
            </ul> */}
           
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="300" height="300" viewBox="0 0 24 24"
                    stroke="white"
                    fill="red"
                    style={{
                        marginLeft: isMobile ? 0 : '30%',
                        position: 'absolute',
                        zIndex:3
                    }}
                >
                    <path d="M24 16.971l-7.029 7.029h-9.942l-7.029-7.029v-9.942l7.029-7.029h9.942l7.029 7.029z" />
                    <svg
                        width="90" height="100" viewBox="-28 15 650 650"
                        fill={currentTheme.color}
                        stroke={currentTheme.color}
                    >
                        <path xmlns="http://www.w3.org/2000/svg" d="M56.72,0c6.88,0,12.46,5.58,12.46,12.46c0,6.88-5.58,12.46-12.46,12.46s-12.46-5.58-12.46-12.46 C44.26,5.58,49.84,0,56.72,0L56.72,0z M66.59,104.89c1.97-3.61,3.77-6.89,5.86-10.12c2.09-3.23,4.46-6.39,7.56-9.76l0.92-0.96 L47.29,69.17l8.42,13.33c0.69,1.09,0.98,2.31,0.92,3.51l-0.84,17.31c-0.16,3.34-2.99,5.91-6.32,5.76 c-3.34-0.16-5.91-2.99-5.76-6.32l0.75-15.42l-11.81-18.7l-8,34.79c-0.75,3.26-3.99,5.29-7.25,4.55c-3.26-0.75-5.29-3.99-4.55-7.25 l9.77-42.47L0,48.18l1.77-9.5l5.46,2.41l6.4-11.32c0.93-1.64,2.52-2.68,4.24-2.98l0-0.01L35.8,23.7c1.29-0.22,2.55-0.02,3.65,0.51 l22,9.37c1.88,0.8,3.14,2.44,3.54,4.29l0.01,0l6.6,30.32c0.1,0.48,0.15,0.96,0.14,1.43l16.15,7.14l11.18-11.7L99.18,65l0.18-0.05 c10.86-2.65,20.11,28.66,21.93,36.12l0.17,0.72c1.35,5.51,1.94,7.93,0.84,9.04c-0.86,0.87-2.67,0.81-5.89,0.72 c-1.49-0.04-3.29-0.1-5.44-0.07c-6.77,0.07-13.44,0.07-19.99-0.04c-6.55-0.1-12.97-0.3-19.23-0.6c-1.55-0.08-2.82-0.08-3.84-0.09 c-1.91-0.01-2.97-0.02-3.39-0.49c-0.55-0.62,0.08-1.75,1.48-4.29L66.59,104.89L66.59,104.89z M33.33,36.41L26.92,49.8L18.34,46 l4.39-7.77L33.33,36.41L33.33,36.41z M49.24,59.67l5.17-13.52l3.81,17.49L49.24,59.67L49.24,59.67z" />
                    </svg>
                </svg>
                <div style={{
                    textAlign: 'center',
                    fontFamily: "'Oxygen', sans-serif",
                    fontWeight: 'bold',
                    marginTop:300,
                }}>This site, like myself, is perpetually under construction, because you can always improve.
                </div>
            
        </div>
    )
}