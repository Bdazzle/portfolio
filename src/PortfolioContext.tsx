import React, { CSSProperties, useReducer, useState } from 'react';

export const PortfolioContext = React.createContext<any>(null)

const themeReducer = (state: CSSProperties, action: string) => {
  switch (action) {
    case "dark":
      return {
        backgroundColor: `#000000`,
        color: `#ffffff`,
        scheme: 'dark',
        mid: '#303134',
      };
    case "light":
      return {
        backgroundColor: `#ffffff`,
        color: `#000000`,
        scheme: 'light',
        mid: '#303134'
      };
    default:
      return state;
  }
};

export const PortfolioProvider: React.FC = ({ children }) => {
  const [currentPathname, setCurrentPathname] = useState<string>()
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [theme, dispatchTheme] = useReducer(themeReducer, ({
    backgroundColor: `#000000`,
    color: `#ffffff`,
    scheme: 'dark',
    mid: '#303134'
  }))

  return <PortfolioContext.Provider value={{
    currentPathname: currentPathname,
    setCurrentPathname: setCurrentPathname,
    isMobile: isMobile,
    setIsMobile: setIsMobile,
    currentTheme: theme,
    setTheme: dispatchTheme
  }}>{children}</PortfolioContext.Provider>
}