import React, { createContext, useEffect, useReducer, useState } from 'react';
import themeReducer, { ThemeProps } from '../reducers/themes';

interface PortfolioContextProps {
  currentTheme : ThemeProps,
  setTheme: React.Dispatch<string>
  pDensity: number,
  setpDensity : React.Dispatch<React.SetStateAction<number>>
  animationState: string,
  setAnimationState: React.Dispatch<React.SetStateAction<string>>
  pSize: number, 
  setpSize : React.Dispatch<React.SetStateAction<number>>
}

export const PortfolioContext = createContext({} as PortfolioContextProps)

export const PortfolioProvider: React.FC<{ children : React.ReactNode}> = ({ children }) => {
  const [theme, dispatchTheme] = useReducer(themeReducer, ({
    backgroundColor: `#000`,
    color: `#fff`,
    scheme: 'dark',
    mid: '#303134'
  }))
  const [pDensity, setpDensity] = useState<number>(35)
  const [animationState, setAnimationState] = useState<string>('running')
  const [pSize, setpSize] = useState<number>(3)

  useEffect(() => {
    document.body.style.setProperty("background-color", theme.backgroundColor);
    document.body.style.setProperty("color", theme.color);
  }, [theme])

  return <PortfolioContext.Provider value={{
    currentTheme: theme,
    setTheme: dispatchTheme,
    pDensity: pDensity,
    setpDensity: setpDensity,
    pSize : pSize,
    setpSize: setpSize,
    animationState: animationState,
    setAnimationState: setAnimationState
  }}>{children}</PortfolioContext.Provider>
}