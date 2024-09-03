
import React from 'react';

const Hero: React.FC = () => {

  return (
    <div className={`h-4/5 flex flex-col items-center justify-center text-center`}
      itemScope itemType="http://schema.org/Person"
    >
      <span className='font-Mandalore text-4xl tracking-widest'>
        Hello! I'm
        <h1 className='animate-pulse text-5xl bg-name-gradient bg-clip-text text-transparent' itemProp='name'> BriAn Robinson</h1>
      </span>
      <div className='font-Oxygen text-2xl md:font-bold'>I make Front End web and React Native Apps.</div>
    </div>
  );
}

export default Hero