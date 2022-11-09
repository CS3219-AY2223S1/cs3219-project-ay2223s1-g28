import { useCallback } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

import DUST_CONFIG from './dust-config';

function DustBackground() {
  // this customizes the component tsParticles installation
  const customInit = useCallback(async (engine) => {
    // this adds the bundle to tsParticles
    await loadFull(engine);
  }, []);

  return <Particles options={DUST_CONFIG} init={customInit} />;
}

export default DustBackground;
