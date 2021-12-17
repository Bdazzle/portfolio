
import React, { useContext, useEffect } from 'react';
import { useMatch } from 'react-location';
import { PortfolioContext } from './PortfolioContext';

export const Hero: React.FC = () => {
  const { setCurrentPathname, isMobile } = useContext(PortfolioContext)
  const pathName = useMatch()

  useEffect(() => {
    setCurrentPathname(pathName.id)
  },[])

  return (
    <div style={{
      height:'80%',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      textAlign:'center'
    }}
    >
      <span style={{
        fontFamily: `'Mandalore', sans-serif`,
        letterSpacing: '.2rem',
        fontSize: 36
      }}>Hello! I'm <span style={{
        fontSize: 46
        
      }}>Brian </span></span>
      <div style={{
        fontFamily: "'Oxygen', sans-serif",
        fontWeight: isMobile ? 'normal' : 'bold',
        fontSize: 24
      }}>I make Front End web and React Native Apps.</div>
    </div>
  );
}