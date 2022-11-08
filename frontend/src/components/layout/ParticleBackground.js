import { useCallback } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

import PARTICLE_CONFIG from './particle-config';

function ParticleBackground() {
  // this customizes the component tsParticles installation
  const customInit = useCallback(async (engine) => {
    // this adds the bundle to tsParticles
    await loadFull(engine);
  }, []);

  return <Particles options={PARTICLE_CONFIG} init={customInit} style={{backgroundImage: 'linear-gradient(white, red)'}}/>;
}

export default ParticleBackground;
