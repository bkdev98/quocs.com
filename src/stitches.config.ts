import { createStitches } from '@stitches/react'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      yellow: '#ffff80',
      pink: '#ff80bf',
      purple: '#9580ff',
      red: '#ff9580',
      orange: '#ffca80',
      green: '#8aff80',
      cyan: '#80ffea',
      primary: '#f2f2f2',
      secondary: '#8f9ba8',
      background: '#08070b',
      hover: '#212024',
      command: 'rgba(255, 255, 255, 0.05)',
    },
    fonts: {
      body: 'Manrope, sans-serif',
      code: 'Fira Code, monospace',
      heading: 'Manrope, sans-serif',
    },
    space: {
      navHeightDesktop: '60px',
      navHeightMobile: '110px',
    },
    transitions: {
      duration: '0.2s',
    },
    radii: {
      borderRadius: '8px',
    },
  },
  media: {
    bp1: '(min-width: 425px)',
    bp2: '(min-width: 760px)',
    bp3: '(max-width: 780px)',
    bp4: '(max-width: 1024px)',
  },
})

const globalStyles = globalCss({
  '*': {
    fontFamily: '$body',
  },
  'html, body': {
    margin: '0',
    padding: '0',
    WebkitFontSmoothing: 'antialiased',
    background: '$background',
  },
  kbd: {
    color: '$background',
    background: '$secondary',
    padding: '1px 5px',
    borderRadius: '4px',
    transition: 'background $duration ease-in-out',
    fontFamily: '$code',
    fontSize: '14px',
  },
  svg: {
    width: '32px',
    height: '32px',
    fill: 'white',
  },
  figure: {
    margin: 0,
  },
  twitterwidget: {
    margin: '0 auto',
  },
  code: {
    background: '#151417',
    borderRadius: '$borderRadius',
    color: '$primary',
    fontFamily: '$code',
    fontSize: '15px',
  },
  ':not(pre) > code': {
    padding: '4px',
  },
  h1: {
    fontFamily: '$heading',
    fontSize: '48px',
    lineHeight: '68px',
    margin: '0 0 20px',
    color: '$primary',
  },
  h2: {
    color: '$primary',
    margin: '60px 0 0',
    fontSize: '24px',
  },
  'h3, h3 a': {
    color: '$primary',
    fontSize: '18px',
    margin: '20px 0 0',
  },
  ul: {
    margin: 0,
  },
  img: {
    borderRadius: '8px',
    minWidth: '100%',
    maxWidth: '100%',
  },
  p: {
    margin: '20px 0',
    color: '$secondary',
  },
  strong: {
    color: '$primary',
    fontWeight: 500,
  },
  blockquote: {
    borderLeft: '4px solid $hover',
    color: '$secondary',
    fontStyle: 'italic',
    margin: '0',
    paddingLeft: '20px',
  },
  a: {
    borderBottom: '.5px solid $secondary',
    color: '$primary',
    textDecoration: 'none',
    transition: 'opacity $duration ease-in-out',
  },
  'a:hover, a:focus': {
    opacity: '0.8',
  },
  '@font-face': [
    {
      fontFamily: 'Neuzeit Grotesk Bold',
      src: `url("/static/fonts/NeuzeitGrotesk-Bold.woff2") format("woff2"),
        url("/static/fonts/NeuzeitGrotesk-Bold.woff") format("woff")`,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Fira Code',
      src: `url("/static/fonts/FiraCode-Regular.woff2") format("woff2"),
        url("/static/fonts/FiraCode-Regular.woff") format("woff")`,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Biotif',
      src: `url("/static/fonts/Biotif-Bold.woff2") format("woff2"),
        url("/static/fonts/Biotif-Bold.woff") format("woff")`,
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Biotif',
      src: `url("/static/fonts/Biotif-Book.woff2") format("woff2"),
        url("/static/fonts/Biotif-Book.woff") format("woff")`,
      fontWeight: 500,
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Biotif',
      src: `url("/static/fonts/Biotif-Regular.woff2") format("woff2"),
        url("/static/fonts/Biotif-Regular.woff") format("woff")`,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Biotif',
      src: `url("/static/fonts/Biotif-RegularItalic.woff2") format("woff2"),
        url("/static/fonts/Biotif-RegularItalic.woff") format("woff")`,
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
    {
      fontFamily: 'Manrope',
      src: `url("/static/fonts/Manrope-Bold.ttf") format("truetype")`,
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Manrope',
      src: `url("/static/fonts/Manrope-Regular.ttf") format("truetype")`,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Manrope',
      src: `url("/static/fonts/Manrope-Medium.ttf") format("truetype")`,
      fontWeight: '500',
      fontStyle: 'normal',
    }
  ],
})

export const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(12px)', filter: 'blur(10px)' },
  '100%': { opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' },
})

export const grain = keyframes({
  "0%, 100%": { transform: "translate(0, 0)" },
  "10%": { transform: "translate(-5%, -10%)" },
  "20%": { transform: "translate(-15%, 5%)" },
  "30%": { transform: "translate(7%, -25%)" },
  "40%": { transform: "translate(-5%, 25%)" },
  "50%": { transform: "translate(-15%, 10%)" },
  "60%": { transform: "translate(15%, 0%)" },
  "70%": { transform: "translate(0%, 15%)" },
  "80%": { transform: "translate(3%, 35%)" },
  "90%": { transform: "translate(-10%, 10%)" },
})

globalStyles()
