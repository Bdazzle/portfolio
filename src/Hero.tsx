
import React, { useContext, useEffect } from 'react';
import { useMatch } from 'react-location';
import { PortfolioContext } from './PortfolioContext';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    font-size : 46px;
  }
  50% {
    font-size : 52px;
  }
  100%{
    font-size : 46px;
  }
`
const AnimatedName = styled.span`
  font-size : 46px;
  background: linear-gradient(#2e4f43, #8fffd7);
  -webkit-background-clip : text;
  -webkit-text-fill-color : transparent;
  animation: 1s ${pulse} ease-in-out;
`

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
      }}>Hello! I'm 
      <AnimatedName> BriAn</AnimatedName>
      </span>
      <div style={{
        fontFamily: "'Oxygen', sans-serif",
        fontWeight: isMobile ? 'normal' : 'bold',
        fontSize: 24
      }}>I make Front End web and React Native Apps.</div>
    </div>
  );
}