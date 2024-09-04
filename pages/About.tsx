import React, { useContext } from "react";
import { PortfolioContext } from '../context/PortfolioContext';
import Image from "next/image";

const About: React.FC = () => {
    const { currentTheme } = useContext(PortfolioContext)

    return (
        <div className="w-[80%] ml-[10%] mr-[10%] pt-0 md:pt-[15vh]"
            itemScope itemType="http://schema.org/AboutPage">
            <h1 className="text-center font-Mandalore text-4xl tracking-[.2rem]">
                About
            </h1>
            <div className="font-Oxygen font-bold leading-normal" itemProp="description">
                I am a self taught coder. I started learning from freecodecamp, and learned more from MDN, CS50, Stack Overflow (of course!), and various Youtube channels (as a visual aid tool for unfamiliar technologies).
                <br />
                I'm a huge gaming nerd.
                <br />
                Wu-Tang Forever...
            </div>
            <ul className="hidden">
                Future Directions?
                <li>Neural Networks</li>
                <li>Python</li>
                <li>Java for Mobile development</li>
                <li>Social Engineering</li>
                <li>Next.js</li>
            </ul>

            <svg xmlns="http://www.w3.org/2000/svg"
                width="300" height="300" viewBox="0 0 24 24"
                stroke="white"
                fill="red"
                className="absolute z-[3] ml-0 md:ml-[30%]"
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
            <div className="text-center font-Oxygen font-bold mt-[300px]">
                This site, like myself, is perpetually under construction, because you can always improve.
            </div>
            <br />
            <div className="flex flex-col content-center items-center font-Oxygen font-bold">
                Technologies I'm comfortable with:
                <ul className="mt-0 list-inside">
                    <li>Javascript
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            width="24" height="24"
                            viewBox="0 -5 48 48"
                        >
                            <path fill="#ffd600" d="M6,42V6h36v36H6z" />
                            <path fill="#000001" d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z" />
                        </svg>
                    </li>
                    <li>React <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="16" height="16"
                        viewBox="0 0 80 80"
                        fill="#000000">
                        <path fill="#8bb7f0" d="M46.5,40c0,3.593-2.907,6.5-6.5,6.5s-6.5-2.907-6.5-6.5s2.907-6.5,6.5-6.5S46.5,36.407,46.5,40z" />
                        <path fill="#4e7ab5" d="M40,47c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S43.859,47,40,47z M40,34c-3.309,0-6,2.691-6,6 s2.691,6,6,6s6-2.691,6-6S43.309,34,40,34z" />
                        <g>
                            <path fill="#8bb7f0" d="M24.474,75.503c-1.711,0-3.269-0.392-4.632-1.164c-2.28-1.293-3.856-3.521-4.686-6.62 c-0.965-3.607-0.85-8.398,0.332-13.878C5.956,50.562,0.5,45.531,0.5,40c0-5.532,5.455-10.562,14.987-13.84 c-1.182-5.481-1.298-10.272-0.333-13.879c0.83-3.1,2.406-5.328,4.685-6.62c1.362-0.772,2.921-1.164,4.632-1.164 c4.388,0,9.891,2.73,15.531,7.698c5.64-4.963,11.141-7.691,15.524-7.691c1.711,0,3.269,0.392,4.632,1.164 c2.277,1.291,3.854,3.515,4.684,6.611c0.966,3.606,0.85,8.398-0.333,13.88C74.043,29.437,79.5,34.468,79.5,40 s-5.457,10.563-14.991,13.842c1.182,5.481,1.298,10.272,0.332,13.878c-0.83,3.097-2.405,5.321-4.68,6.612 c-1.364,0.772-2.923,1.164-4.633,1.164c-4.386,0-9.889-2.728-15.527-7.689C34.361,72.774,28.859,75.503,24.474,75.503z 
                                M19.337,55.006c-0.991,4.717-1.102,8.747-0.316,11.679c0.542,2.026,1.481,3.431,2.794,4.175c0.753,0.427,1.648,0.644,2.659,0.644 c3.394,0,7.862-2.282,12.621-6.437c-2.385-2.402-4.713-5.121-6.928-8.091C26.336,56.56,22.696,55.898,19.337,55.006z M42.906,65.065c4.758,4.151,9.227,6.431,12.621,6.432c1.011,0,1.906-0.217,2.661-0.644c1.309-0.742,2.246-2.144,2.787-4.167 c0.786-2.934,0.676-6.963-0.315-11.679c-3.362,0.892-7.003,1.554-10.833,1.97C47.613,59.947,45.288,62.665,42.906,65.065z M35.566,57.393c1.452,1.776,2.938,3.433,4.434,4.94c1.492-1.506,2.979-3.163,4.43-4.94C42.939,57.464,41.454,57.5,40,57.5 C38.545,57.5,37.059,57.464,35.566,57.393z M32.349,53.179C34.844,53.392,37.417,53.5,40,53.5c2.585,0,5.155-0.108,7.646-0.32 c1.486-2.084,2.903-4.268,4.214-6.495c1.268-2.155,2.461-4.404,3.547-6.686c-1.083-2.276-2.275-4.524-3.546-6.684 c-1.308-2.222-2.725-4.406-4.215-6.495C45.157,26.608,42.587,26.5,40,26.5c-2.588,0-5.159,0.108-7.647,0.321 c-1.49,2.086-2.909,4.27-4.219,6.495c-1.27,2.159-2.462,4.407-3.546,6.686c1.082,2.274,2.274,4.522,3.545,6.684 C29.437,48.901,30.854,51.084,32.349,53.179z M57.491,44.779c-0.706,1.346-1.438,2.666-2.185,3.934 c-0.753,1.282-1.554,2.568-2.386,3.836c2.374-0.366,4.645-0.835,6.771-1.4C59.101,49.1,58.362,46.963,57.491,44.779z M20.304,51.148c2.127,0.564,4.397,1.034,6.768,1.4c-0.837-1.276-1.638-2.563-2.386-3.835c-0.745-1.267-1.478-2.585-2.183-3.931 C21.636,46.956,20.898,49.091,20.304,51.148z M59.816,40c1.528,3.391,2.773,6.743,3.708,9.977C70.926,47.373,75.5,43.574,75.5,40 s-4.574-7.373-11.976-9.977C62.591,33.257,61.345,36.609,59.816,40z M16.472,30.025C9.073,32.628,4.5,36.427,4.5,40 c0,3.574,4.573,7.373,11.974,9.976c0.934-3.235,2.179-6.587,3.705-9.974C18.652,36.614,17.407,33.262,16.472,30.025z M20.303,28.852c0.594,2.054,1.332,4.19,2.2,6.368c0.704-1.342,1.436-2.661,2.184-3.932c0.752-1.279,1.553-2.565,2.388-3.836 C24.701,27.817,22.431,28.287,20.303,28.852z 
                                M52.922,27.451c0.837,1.277,1.638,2.563,2.386,3.837 c0.746,1.267,1.479,2.586,2.185,3.932c0.869-2.177,1.607-4.313,2.201-6.369C57.564,28.286,55.294,27.816,52.922,27.451z M24.471,8.497c-1.011,0-1.905,0.216-2.657,0.644c-1.312,0.744-2.252,2.149-2.795,4.175c-0.785,2.935-0.675,6.964,0.317,11.679 c3.36-0.892,7.002-1.555,10.834-1.971c2.217-2.971,4.545-5.688,6.927-8.088C32.337,10.779,27.866,8.497,24.471,8.497z M49.828,23.023c3.83,0.416,7.471,1.078,10.833,1.97c0.992-4.716,1.103-8.746,0.316-11.68c-0.542-2.022-1.48-3.424-2.79-4.166 c-0.754-0.427-1.649-0.644-2.661-0.644c-3.393,0-7.86,2.281-12.619,6.433C45.287,17.335,47.613,20.053,49.828,23.023z M40,22.5 c1.454,0,2.939,0.036,4.431,0.107c-1.45-1.774-2.936-3.43-4.429-4.938c-1.497,1.51-2.982,3.166-4.432,4.938 C37.061,22.536,38.546,22.5,40,22.5z" />
                            <path fill="#4e7ab5" d="M24.471,4.997c4.494,0,9.996,2.91,15.532,7.867c5.535-4.953,11.034-7.86,15.524-7.86 c1.623,0,3.099,0.37,4.386,1.099c2.156,1.222,3.652,3.343,4.446,6.306c1.077,3.917,0.851,8.74-0.434,14.08 C73.147,29.57,79,34.431,79,40s-5.853,10.43-15.076,13.512c1.341,5.773,1.566,10.726,0.434,14.079 c-0.794,2.962-2.289,5.084-4.443,6.306C58.626,74.627,57.455,75,55.833,75c-0.001,0-0.416,0-0.417,0 c-4.492,0-9.882-2.91-15.416-7.861c-5.535,4.956-11.035,7.864-15.527,7.864c-1.623,0-3.099-0.37-4.386-1.099 c-2.158-1.225-3.655-3.349-4.448-6.314c-1.19-3.717-0.95-8.603,0.434-14.079C6.852,50.429,1,45.569,1,40 c0-5.568,5.852-10.429,15.072-13.511C15.385,23.43,14.946,20.59,14.931,18c-0.012-2.046,0.267-3.949,0.707-5.59 c0.794-2.966,2.29-5.09,4.448-6.314C21.372,5.366,22.848,4.997,24.471,4.997 M18.958,25.614c3.477-0.955,7.338-1.677,11.483-2.117 c2.382-3.21,4.875-6.096,7.386-8.584c-4.872-4.346-9.616-6.917-13.356-6.917c-1.099,0-2.075,0.238-2.904,0.709 c-1.433,0.813-2.452,2.32-3.031,4.481C17.678,16.388,17.873,20.716,18.958,25.614 M61.039,25.613 c1.085-4.898,1.28-9.227,0.422-12.429c-0.578-2.157-1.597-3.661-3.027-4.472c-0.83-0.471-1.809-0.709-2.907-0.709 c-3.737,0-8.478,2.568-13.349,6.91c2.51,2.488,5,5.374,7.38,8.583C53.701,23.936,57.562,24.658,61.039,25.613 M34.477,23.166 c1.802-0.107,3.609-0.2,5.488-0.2c1.879,0,3.755,0.094,5.557,0.2c-1.808-2.279-3.664-4.361-5.521-6.204 C38.144,18.805,36.287,20.887,34.477,23.166 M40,54c2.761,0,5.404-0.121,7.918-0.342c1.519-2.117,2.988-4.365,4.372-6.719 c1.353-2.299,2.577-4.626,3.67-6.939c-1.093-2.313-2.317-4.639-3.669-6.937c-1.385-2.355-2.853-4.602-4.373-6.719 C45.405,26.121,42.762,26,40,26s-5.406,0.121-7.92,0.343c-1.521,2.117-2.991,4.365-4.376,6.719 c-1.352,2.299-2.576,4.626-3.669,6.939c1.093,2.313,2.316,4.639,3.668,6.937c1.385,2.354,2.854,4.602,4.374,6.719 C34.592,53.879,37.237,54,40,54 M57.546,36.413c1.125-2.709,2.056-5.369,2.766-7.913c-2.553-0.702-5.373-1.282-8.428-1.707 c1.028,1.527,2.029,3.11,2.992,4.748C55.83,33.16,56.717,34.788,57.546,36.413 M22.449,36.414c0.828-1.625,1.716-3.253,2.668-4.873 c0.964-1.638,1.966-3.22,2.995-4.747c-3.055,0.424-5.875,1.005-8.428,1.707C20.394,31.045,21.325,33.704,22.449,36.414 
                                M63.188,50.622C71.264,47.886,76,43.866,76,40s-4.736-7.886-12.812-10.622c-0.953,3.405-2.269,6.983-3.92,10.621 C60.919,43.638,62.235,47.216,63.188,50.622 M16.81,50.621c0.952-3.404,2.267-6.982,3.918-10.619 c-1.651-3.638-2.967-7.217-3.919-10.622C8.734,32.116,4,36.135,4,40C4,43.866,8.735,47.885,16.81,50.621 M51.884,53.207 c3.055-0.424,5.875-1.004,8.428-1.707c-0.711-2.544-1.642-5.204-2.766-7.914c-0.829,1.625-1.717,3.253-2.67,4.873 C53.913,50.097,52.912,51.68,51.884,53.207 M28.109,53.206c-1.028-1.527-2.029-3.109-2.993-4.746 c-0.952-1.619-1.839-3.246-2.667-4.87c-1.124,2.708-2.054,5.367-2.764,7.91C22.237,52.201,25.056,52.781,28.109,53.206 M24.474,72.003c3.739,0,8.481-2.57,13.352-6.914c-2.513-2.489-5.005-5.376-7.388-8.587c-4.143-0.439-8.002-1.161-11.478-2.116 c-1.084,4.898-1.279,9.226-0.422,12.428c0.578,2.16,1.598,3.667,3.03,4.48C22.396,71.765,23.375,72.003,24.474,72.003 M55.527,71.997L55.527,71.997c1.099,0,2.076-0.238,2.907-0.709c1.43-0.811,2.447-2.315,3.024-4.473 c0.858-3.203,0.663-7.531-0.421-12.428c-3.477,0.955-7.337,1.677-11.481,2.116c-2.38,3.21-4.871,6.096-7.381,8.585 C47.046,69.428,51.788,71.996,55.527,71.997 M40,63.04c1.857-1.844,3.713-3.927,5.522-6.206c-1.801,0.107-3.559,0.333-5.439,0.333 c-1.881,0-3.807-0.226-5.609-0.333C36.284,59.114,38.142,61.197,40,63.04 M24.116,4.072c-1.799,0-3.085,0.338-4.523,1.153 c-2.399,1.361-4.055,3.691-4.921,6.926c-0.96,3.587-0.877,8.302,0.236,13.681C5.419,29.189,0,34.325,0,40 c0,5.676,5.42,10.811,14.909,14.168c-1.113,5.379-1.196,10.094-0.235,13.681c0.865,3.233,2.52,5.563,4.921,6.926 c1.44,0.816,3.17,1.163,4.968,1.163c4.487,0,9.753-2.535,15.438-7.466c5.684,4.926,11.039,7.524,15.525,7.525 c1.799,0,3.441-0.413,4.881-1.229c2.397-1.359,4.051-3.686,4.916-6.917c0.961-3.588,0.878-8.303-0.235-13.681 C74.579,50.812,80,45.676,80,40s-5.42-10.812-14.911-14.169c1.114-5.38,1.196-10.095,0.235-13.682 c-0.866-3.231-2.521-5.558-4.919-6.917c-1.439-0.815-3.081-1.229-4.879-1.229c-4.485,0-9.839,2.599-15.524,7.527 c-5.686-4.932-11.066-7.461-15.554-7.461L24.116,4.072z M19.72,24.377c-0.462-2.324-0.772-4.502-0.789-6.412 c-0.015-1.72,0.221-3.217,0.57-4.521c0.507-1.892,1.368-3.194,2.559-3.87c0.676-0.384,1.5-0.644,2.423-0.644 c3.181,0,7.367,2.178,11.883,6.034c-2.221,2.273-4.392,4.819-6.466,7.585C26.315,22.949,22.897,23.562,19.72,24.377L19.72,24.377z 
                                M43.638,14.966c4.515-3.853,8.711-5.963,11.888-5.963c0.924,0,1.737,0.195,2.414,0.579c1.189,0.674,2.049,1.973,2.555,3.861 c0.874,2.818,0.761,6.564-0.218,10.933c-3.177-0.814-6.594-1.428-10.178-1.826C48.026,19.785,45.857,17.239,43.638,14.966 L43.638,14.966z M36.673,22.06c1.096-1.3,2.209-2.53,3.328-3.678c1.119,1.148,2.231,2.378,3.326,3.678 C42.208,22.02,41.095,22,40,22S37.793,22.02,36.673,22.06L36.673,22.06z M32.625,27.3c2.405-0.199,4.883-0.341,7.375-0.341 c2.491,0,4.969,0.142,7.373,0.341c1.432,2.019,2.796,4.126,4.056,6.269c1.222,2.078,2.373,4.239,3.423,6.43 c-1.051,2.192-2.202,4.354-3.424,6.432c-1.261,2.144-2.624,4.25-4.056,6.269c-2.403,0.199-4.881,0.466-7.372,0.466 c-2.493,0-4.972-0.268-7.378-0.467c-1.433-2.018-2.797-4.125-4.058-6.269c-1.222-2.077-2.372-4.238-3.422-6.43 c1.05-2.192,2.201-4.354,3.423-6.432C29.827,31.425,31.192,29.318,32.625,27.3L32.625,27.3z M57.422,34.024 c-0.549-1.018-1.112-2.018-1.683-2.99c-0.57-0.969-1.167-1.942-1.785-2.909c1.774,0.302,3.485,0.663,5.114,1.08 C58.601,30.771,58.05,32.383,57.422,34.024L57.422,34.024z M20.928,29.205c1.629-0.417,3.34-0.778,5.114-1.08 c-0.619,0.967-1.216,1.94-1.786,2.908c-0.571,0.972-1.134,1.972-1.683,2.99C21.945,32.384,21.395,30.772,20.928,29.205 L20.928,29.205z M60.365,39.999c1.415-3.162,2.587-6.292,3.49-9.326C70.758,33.192,75,36.721,75,40s-4.242,6.808-11.145,9.327 C62.951,46.292,61.78,43.161,60.365,39.999L60.365,39.999z M16.142,49.326C9.241,46.807,5,43.278,5,40s4.241-6.807,11.141-9.326 c0.903,3.035,2.074,6.165,3.489,9.327C18.216,43.162,17.045,46.292,16.142,49.326L16.142,49.326z M53.953,51.876 c0.618-0.968,1.216-1.941,1.785-2.909c0.572-0.972,1.135-1.973,1.684-2.991c0.628,1.641,1.178,3.254,1.646,4.821 C57.438,51.212,55.727,51.574,53.953,51.876L53.953,51.876z 
                                M20.929,50.795c0.467-1.566,1.017-3.177,1.644-4.816 c0.548,1.017,1.111,2.017,1.682,2.988c0.569,0.968,1.166,1.94,1.785,2.908C24.267,51.572,22.557,51.211,20.929,50.795 L20.929,50.795z M24.474,71.003c-0.924,0-1.736-0.195-2.413-0.579c-1.19-0.676-2.051-1.977-2.557-3.869 c-0.831-2.845-0.737-6.592,0.218-10.933c3.176,0.814,6.592,1.428,10.175,1.826c2.075,2.766,4.246,5.313,6.468,7.588 C31.85,68.893,27.653,71.004,24.474,71.003L24.474,71.003L24.474,71.003z M50.098,57.45c3.584-0.399,7.001-1.012,10.178-1.826 c1.105,4.74,1.192,8.518,0.217,10.932c-0.505,1.889-1.364,3.188-2.552,3.861c-0.678,0.384-1.49,0.579-2.413,0.579v1l-0.001-1 c-3.18,0-7.377-2.11-11.891-5.961C45.856,62.762,48.025,60.216,50.098,57.45L50.098,57.45z M40,61.62 c-1.12-1.148-2.234-2.379-3.33-3.68C37.79,57.98,38.904,58,40,58c1.095,0,2.208-0.02,3.327-0.06 C42.232,59.241,41.119,60.472,40,61.62L40,61.62z" />
                        </g>
                    </svg>
                    </li>
                    <li>React Native
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            width="24" height="24"
                            viewBox="0 0 64 64"
                            fill="#000000">
                            <linearGradient id="9GkdZLxQa1XTDblOFwLcpa_t4YbEbA834uH_gr1" x1="32" x2="32" y1="25.213" y2="36.722" gradientUnits="userSpaceOnUse">
                                <stop offset="0" stopColor="#6dc7ff" />
                                <stop offset="1" stopColor="#e6abff" />
                            </linearGradient>
                            <circle cx="32" cy="32" r="6" fill="url(#9GkdZLxQa1XTDblOFwLcpa_t4YbEbA834uH_gr1)" />
                            <linearGradient id="9GkdZLxQa1XTDblOFwLcpb_t4YbEbA834uH_gr2" x1="32" x2="32" y1="7.426" y2="53.44" gradientUnits="userSpaceOnUse">
                                <stop offset="0" stopColor="#1a6dff" />
                                <stop offset="1" stopColor="#c822ff" />
                            </linearGradient>
                            <path fill="url(#9GkdZLxQa1XTDblOFwLcpb_t4YbEbA834uH_gr2)" d="M58,32c0-3.758-4.243-7.017-10.853-8.992c0.221-1.031,0.407-2.045,0.524-3.015	c0.657-5.483-0.483-9.323-3.211-10.813c-2.729-1.489-6.574-0.372-10.831,3.146c-0.544,0.449-1.087,0.938-1.629,1.45	c-0.542-0.513-1.085-1.001-1.629-1.45C26.114,8.808,22.267,7.692,19.54,9.18c-2.728,1.489-3.868,5.329-3.211,10.813	c0.116,0.971,0.303,1.984,0.524,3.015C10.243,24.983,6,28.242,6,32s4.243,7.017,10.853,8.992c-0.221,1.031-0.407,2.045-0.524,3.015	c-0.657,5.483,0.483,9.323,3.211,10.813c0.789,0.431,1.67,0.643,2.628,0.643c2.357,0,5.177-1.287,8.203-3.788	c0.544-0.449,1.087-0.938,1.629-1.45c0.542,0.513,1.085,1.001,1.629,1.45c3.026,2.501,5.846,3.788,8.203,3.788	c0.958,0,1.84-0.213,2.628-0.643c2.728-1.489,3.868-5.329,3.211-10.813c-0.116-0.971-0.303-1.984-0.524-3.015	C53.757,39.017,58,35.758,58,32z M34.902,13.866c3.53-2.917,6.665-3.987,8.599-2.931c1.934,1.055,2.729,4.27,2.184,8.818	
                                c-0.105,0.879-0.273,1.796-0.469,2.729c-2.117-0.519-4.43-0.915-6.892-1.166c-1.564-2.275-3.215-4.351-4.908-6.132	C33.91,14.718,34.406,14.276,34.902,13.866z M39.899,36.313c-0.853,1.562-1.76,3.055-2.702,4.474C35.546,40.925,33.811,41,32,41	s-3.546-0.075-5.198-0.213c-0.941-1.42-1.849-2.912-2.702-4.474c-0.784-1.435-1.499-2.878-2.142-4.313	c0.643-1.434,1.358-2.877,2.142-4.313c0.853-1.562,1.76-3.055,2.702-4.474C28.454,23.075,30.189,23,32,23s3.546,0.075,5.198,0.213	c0.941,1.42,1.849,2.912,2.702,4.474c0.784,1.435,1.499,2.878,2.142,4.313C41.399,33.434,40.683,34.877,39.899,36.313z M43.078,34.487c0.68,1.739,1.238,3.444,1.676,5.096c-1.544,0.376-3.21,0.694-5.009,0.929c0.657-1.05,1.3-2.124,1.909-3.241	C42.161,36.346,42.629,35.416,43.078,34.487z M32,47.403c-1.272-1.341-2.522-2.863-3.729-4.513C29.487,42.961,30.73,43,32,43	s2.513-0.039,3.729-0.11C34.522,44.54,33.272,46.062,32,47.403z M24.254,40.512c-1.799-0.235-3.465-0.553-5.009-0.929	c0.438-1.652,0.996-3.358,1.676-5.096c0.45,0.93,0.918,1.859,1.423,2.785C22.954,38.388,23.597,39.462,24.254,40.512z M20.922,29.513c-0.68-1.739-1.238-3.445-1.676-5.096c1.544-0.376,3.21-0.694,5.009-0.929c-0.657,1.05-1.3,2.124-1.909,3.241	
                                C21.839,27.654,21.371,28.584,20.922,29.513z M32,16.597c1.272,1.341,2.522,2.863,3.729,4.513C34.513,21.039,33.27,21,32,21	s-2.513,0.039-3.729,0.11C29.478,19.46,30.728,17.938,32,16.597z M41.655,26.729c-0.609-1.116-1.252-2.19-1.909-3.241	c1.799,0.235,3.465,0.553,5.009,0.929c-0.438,1.652-0.996,3.358-1.676,5.096C42.629,28.584,42.161,27.654,41.655,26.729z M18.315,19.754c-0.546-4.549,0.25-7.764,2.184-8.818c0.488-0.267,1.053-0.397,1.681-0.397c1.86,0,4.278,1.147,6.918,3.328	c0.496,0.41,0.993,0.852,1.488,1.319c-1.693,1.781-3.345,3.856-4.908,6.132c-2.463,0.251-4.776,0.648-6.892,1.166	C18.588,21.55,18.421,20.633,18.315,19.754z M8,32c0-2.6,3.47-5.303,9.317-7.06c0.606,2.279,1.437,4.654,2.471,7.06	c-1.034,2.407-1.865,4.782-2.471,7.06C11.47,37.303,8,34.6,8,32z M29.098,50.134c-3.53,2.917-6.662,3.989-8.599,2.931	c-1.934-1.055-2.729-4.27-2.184-8.818c0.105-0.879,0.273-1.796,0.469-2.729c2.117,0.519,4.43,0.915,6.892,1.166	c1.564,2.275,3.215,4.351,4.908,6.132C30.09,49.282,29.594,49.724,29.098,50.134z M45.685,44.246	c0.546,4.549-0.25,7.764-2.184,8.818c-1.934,1.059-5.068-0.014-8.599-2.931c-0.496-0.41-0.993-0.852-1.488-1.319	c1.693-1.781,3.345-3.856,4.908-6.132c2.463-0.251,4.776-0.648,6.892-1.166C45.412,42.45,45.579,43.367,45.685,44.246z 
                                M46.683,39.06c-0.606-2.279-1.437-4.654-2.471-7.06c1.034-2.407,1.865-4.782,2.471-7.06C52.53,26.697,56,29.4,56,32	S52.53,37.303,46.683,39.06z" />
                        </svg>
                    </li>
                    <li>HTML
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -5 48 48" width="24px" height="24px"
                        >
                            <path fill="#E65100" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z" />
                            <path fill="#FF6D00" d="M24 8L24 39.9 35.2 36.7 37.7 8z" />
                            <path fill={currentTheme.color} d="M24,25v-4h8.6l-0.7,11.5L24,35.1v-4.2l4.1-1.4l0.3-4.5H24z M32.9,17l0.3-4H24v4H32.9z" />
                            <path fill={currentTheme.color} d="M24,30.9v4.2l-7.9-2.6L15.7,27h4l0.2,2.5L24,30.9z M19.1,17H24v-4h-9.1l0.7,12H24v-4h-4.6L19.1,17z" />
                        </svg>
                    </li>
                    <li>Tailwind CSS
                        <Image className="m-w-[139px]" alt="Tailwind CSS logo" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"></Image>
                    </li>
                    <li >CSS/SASS
                        <div className="flex flex-row">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                width="24" height="24"
                                viewBox="0 0 48 48"
                            >
                                <path fill="#0277BD" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z" />
                                <path fill="#039BE5" d="M24 8L24 39.9 35.2 36.7 37.7 8z" />
                                <path fill={currentTheme.color} d="M33.1 13L24 13 24 17 28.9 17 28.6 21 24 21 24 25 28.4 25 28.1 29.5 24 30.9 24 35.1 31.9 32.5 32.6 21 32.6 21z" />
                                <path fill={currentTheme.color} d="M24,13v4h-8.9l-0.3-4H24z M19.4,21l0.2,4H24v-4H19.4z M19.8,27h-4l0.3,5.5l7.9,2.6v-4.2l-4.1-1.4L19.8,27z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24"
                                viewBox="0 -5 50 50"
                            >
                                <path fill="#f06292" fillRule="evenodd" d="M24.042,4.032C35.065,4.032,44,12.967,44,23.99	c0,11.022-8.935,19.958-19.958,19.958c-11.022,0-19.958-8.935-19.958-19.958C4.085,12.967,13.02,4.032,24.042,4.032L24.042,4.032z" clipRule="evenodd" />
                                <path fill={currentTheme.color} d="M36.561,12.574c-0.904-3.545-6.781-4.71-12.343-2.734c-3.31,1.176-6.894,3.022-9.471,5.432 c-3.064,2.866-3.552,5.36-3.351,6.402c0.71,3.677,5.749,6.081,7.82,7.865v0.011c-0.611,0.301-5.081,2.563-6.127,4.876 c-1.104,2.44,0.176,4.191,1.023,4.427c2.625,0.73,5.318-0.583,6.766-2.742c1.397-2.084,1.281-4.774,0.674-6.113 c0.837-0.221,1.814-0.32,3.054-0.175c3.501,0.409,4.188,2.595,4.056,3.51c-0.131,0.915-0.866,1.418-1.111,1.57 c-0.246,0.152-0.32,0.205-0.3,0.317c0.03,0.164,0.143,0.158,0.353,0.123c0.288-0.049,1.838-0.744,1.905-2.433 c0.084-2.144-1.97-4.542-5.608-4.48c-1.498,0.026-2.44,0.168-3.121,0.422c-0.05-0.057-0.102-0.114-0.154-0.171 c-2.249-2.4-6.407-4.097-6.231-7.323c0.064-1.173,0.472-4.261,7.989-8.007c6.158-3.069,11.088-2.224,11.94-0.353 c1.217,2.674-2.635,7.643-9.03,8.36c-2.437,0.273-3.72-0.671-4.039-1.023c-0.336-0.37-0.386-0.387-0.511-0.317 c-0.204,0.113-0.075,0.44,0,0.635c0.191,0.497,0.975,1.378,2.31,1.817c1.175,0.386,4.036,0.597,7.496-0.741 C34.424,20.229,37.45,16.059,36.561,12.574z M20.076,30.638c0.29,1.074,0.258,2.076-0.041,2.983c-0.033,0.101-0.07,0.2-0.11,0.299 c-0.04,0.098-0.083,0.196-0.129,0.292c-0.231,0.48-0.542,0.929-0.922,1.344c-1.16,1.265-2.78,1.743-3.474,1.34 c-0.75-0.435-0.374-2.218,0.97-3.64c1.446-1.529,3.527-2.512,3.527-2.512l-0.003-0.006C19.954,30.705,20.015,30.672,20.076,30.638z" />
                            </svg>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default About