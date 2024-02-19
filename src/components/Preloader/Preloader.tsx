import React from 'react';
import RingLoader from 'react-spinners/RingLoader';

const Preloader = () => {
  const override: React.CSSProperties = {
    position: 'absolute',
    left: '50vw',
    top: '50vh',
  };
  return (
    <RingLoader
      color='#5550e4'
      size={100}
      aria-label='Loading Spinner'
      data-testid='loader'
      speedMultiplier={0.5}
      cssOverride={override}
    />
  );
};
export default Preloader;
