import { CardData } from '../portfoliotypes'

export function cardReducer(state: object, action: string): CardData {
    switch (action) {
        case 'ladyluck':
            return {
                source: `https://ladyluckmv.com/`,
                blurb: `Business site for Lady Luck MV.`,
                title: `Lady Luck`,
                techLogos: {
                    "Typescript badge": `https://badges.frapsoft.com/typescript/code/typescript.svg?v=101`,
                    "React Badge": `https://badges.aleen42.com/src/react.svg`,
                    "Tailwind CSS v3": "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"
                },
                indepth: {
                    blurb: `Site for local business startup. Mobile first design with thematic animations and socials integration. Started with only a color palette.`,
                    steps: [
                        `Started with site map and requested color scheme.`,
                        `Was given company logo, and changed site color scheme to match them.`,
                        `Light graphic design to edit images and svgs.`,
                        `Animations.`,
                        `Deployed to Github Pages.`
                    ],
                    learned: [`Tailwind CSS animations`, 'Github Pages', `React 18+`],
                },
            };
        case 'soikkeli':
            return {
                source: `https://soikkeli.com/`,
                blurb: `Business site for Soikkeli and Company design and construction.`,
                title: `Soikkeli and Company`,
                techLogos: {
                    "Typescript badge": `https://badges.frapsoft.com/typescript/code/typescript.svg?v=101`,
                    "React Badge": `https://badges.aleen42.com/src/react.svg`,
                    "Next.js": `https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg`,
                    "Tailwind CSS v3": "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"
                },
                indepth: {
                    blurb: `Redesigned business website migrated from Wordpress. 
                    The original design and theme did not have mobile first responsiveness, 
                    so I was requested to modernize it and add some features not provided by the Wordpress theme that had been used.`,
                    steps: [
                        `Clone aspects of the previous website that the client wanted to keep for the new design.`,
                        `Added an additional landing page.`,
                        `Created mobile navigation menu.`,
                        `Created swipable drawer menu for company's portfolio.`,
                        `Changed image albums to custom swipeable carousel components.`
                    ],
                    learned: [`Next.js`, `Tailwind CSS`, `Drag and swipe CSS animations`],
                },
            };
        case 'rpgsheet':
            return {
                source: '/assets/RPGSheetCreator_sample.png',
                blurb: `Uploads image as canvas element, or uses overlays (limited amount) for preexisting games, to track RPG character sheets. Custom character sheets can be edited, saved, shared, and downloaded as a jpg or pdf.`,
                title: `RPG sheet creator`,
                techLogos: {
                    "Typescript badge": `https://badges.frapsoft.com/typescript/code/typescript.svg?v=101`,
                    "React Badge": `https://badges.aleen42.com/src/react.svg`,
                    "React Router badge": `https://badges.aleen42.com/src/react-router.svg`,
                    "Google Firebase badge": `https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase`,
                    "GraphQL" :`https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white`
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
                    learned: [`Typescript`, `Firebase`, `Canvas API`, `GraphQL`, "SVGs"],
                },
            };
        case 'ffbesync':
            return {
                source: '/assets/ffbesync_preview.mp4',
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
        case 'in-response':
            return {
                source: '/assets/in_response_sample.png',
                blurb: `Magic: the Gathering game state tracker mobile App for Android.`,
                title: `In Response...`,
                techLogos: {
                    "Typescript badge": `https://badges.frapsoft.com/typescript/code/typescript.svg?v=101`,
                    "React Native badge": `https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB`,
                    "Expo logo": '/assets/logo-wordmark.png',
                    "React Navigation logo": '/assets/react_navigation_brand.png',
                },
                indepth: {
                    blurb: `Card game Magic: the Gathering game state tracker. Tracks data for up to 4 players. That data includes life totals, counters, opponent damage, and dungeon rooms. \n 
                    Icons can be pressed to show image screens of related cards. Dungeon rooms track positional data to be saved in app context. \n
                    Personalized themes and names are asynchronously stored between sessions. \n
                    Lots of animations.`,
                    steps: [
                        `Initialized with Expo.`,
                        `Found publicly available image resources for cards.`,
                        `Created Player component. Multiplied and transformed them for multiplayer.`,
                        `Added animations with React Native Reanimated and React Native Gesture Handler`,
                        `Originally released on GitHub so my friends could test it.`,
                        `Released to Google Play Store.`
                    ],
                    learned: [`React Native`, `React Native SVGs`, `React Native Reanimated`, `Animated API`, `Google Play Store release process`]
                },
            };
            case 'trovestar' :
                return {
                    source: `https://www.trovestar.com/`,
                    blurb: `Marketplace and database website for collectibles, mostly N-Scale Model Trains.`,
                    title: `TroveStar`,
                    techLogos: {
                        'PHP badge' : `https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white`,
                        'Bootstrap' :`https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white`
                    },
                    indepth :{
                        blurb: `Currently working with senior developers to redesign TroveStar, a marketplace and databasing tool for collectibles, focusing on model trains. \n
                        Implementing MVC and EAV frameworks that replace simple echo statements. \n
                        Tech stack includes PHP, SQL, jQuery, and Bootstrap. \n
                        I help with creating Models and Controllers.`,
                        learned: ['PHP', 'MVC framework', 'Bootstrap', 'database design principles']
                    }
                };
        default:
            return state as CardData
    }
}

