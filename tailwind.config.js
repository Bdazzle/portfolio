const { url } = require('inspector');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          '0%, 100%': { 'font-size': '46px' },
          '50%': { 'font-size': '52px' }
        },
        dotSpin: {
          '100%': {
            'transform': 'rotate(1turn) translate(90px) rotate(-1turn)'
          }
        },
        move: {
          '0%': {
            'transform': 'translate3d(0, 0, 1px) rotate(0deg)'
          },
          '100%': {
            'transform': 'translate3d(0, 0, 1px) rotate(360deg)'
          }
        },
        highspan: {
          '0%': {
            'height': '0'
          },
          '100%': {
            'height': '98%'
          }
        },
        big: {
          '0%': {
            'transform': 'scale(0)'
          },
          '100%': {
            'transform': 'scale(1)'
          }
        },
        widespan: {
          '0%': {
            'width': '0'
          },
          '100%': {
            'width': '98%'
          }
        },
        fillAnimation: {
          '100%': {
            'box-shadow': 'inset 0px 0px 0px 60px rose'
          }
        },
        strokeAnimation: {
          '100%': {
            'stroke-dashoffset': '0'
          }
        },
        scalepulse: {
          '0%': {
            'transform': 'none'
          },
          '50%': {
            'transform': 'scale3d(1.1, 1.1, 1)'
          },
          '100%': {
            'transform': 'none'
          }
        },
        fadein: {
          '0%': {
            'transform': 'translateX(100%)',
            'opacity': '0'
          },
          '100%': {
            'transform': 'translateX(0)',
            'opacity': '1'
          }
        },
        fadeout: {
          '0%': {
            'transform': 'translateX(0)',
            'opacity': '1'
          },
          '100%': {
            'transform': 'translateX(100%)',
            'opacity': '0'
          }
        }
      },
      /*
      animation shorthand: name, duration, timing function, delay, iteration, direction, fill mode, play state
      any variables left out are handled inline
      */
      animation: {
        'pulse': 'pulse 1s ease-in-out',
        'dotSpin': 'dotSpin 10.8s linear infinite',
        'move': 'move linear infinite',
        'big': 'big .5s ease-in-out',
        'highspan': 'highspan .5s ease-in-out',
        'widespan': 'widespan .5s ease-in-out',
        'fillAnimation': 'fillAnimation .4s ease-in-out .4s forwards',
        'scalepulse': 'scalepulse .3s ease-in-out .9s both',
        'strokeAnimation': 'strokeAnimation 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
        'cardfadein': 'fadein 1s ease-in-out',
        'fadein' : 'fadein .3s ease-in-out forwards',
        'fadeout': 'fadeout .3s ease-in-out forwards',
        'checkAnimation' : 'fillAnimation .4s ease-in-out .4s forwards, scalepulse .3s ease-in-out .9s both'
      },
      fontFamily: {
        'Mandalore': ['Mandalore'],
        'Oxygen': ['Oxygen', 'sans-serif'],
        'Roboto': ['Roboto', 'sans-serif']
      },
      backgroundImage: {
        'bgimage': "url('../public/assets/background.png')",
        'gold-gradient': "linear-gradient(#BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
        'name-gradient': 'linear-gradient(#2e4f43, #8fffd7)'
      },
      backgroundSize:{
        'fitWidth': '100% auto'
      },
      colors: {
        'rose': '#b55b67',
        'light-blue': '#2596be',
        'dark-blue': '#002d75',
        'lightest-blue': '#8aa5cf',
        'yellowish': '#ba9e00',
        'cardBack': '#7a6e6d',
        'whitesmoke': '#F5F5F5'
      },
      gridTemplateRows: {
        'socialsRows': '48px 48px',
        'mobileRows': '32px'
      },
      gridTemplateColumns: {
        'socialCols': '125px 125px',
        'mobileCols': '125px',
        '125repeat': '125px 125px 125px 125px'
      },
      dropShadow: {
        'cardShadow': '0px 0px 5px #7a6e6d',
      },
      boxShadow: {
        'check': 'inset 0px 0px 0px rose',
        'submitShadow': `0px 0px 0px 5px #b55b67`
      }
    },
  },
  plugins: [],
}