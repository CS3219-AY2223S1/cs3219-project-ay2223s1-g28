import CenterContainer from '../../components/layout/CenterContainer';
import ParticleBackground from '../../components/layout/ParticleBackground';
import PeerPrepGreenLogo from '../../assets/peerprep-logo-green.svg';

function LoadingPage() {
  return (
    <CenterContainer>
      <ParticleBackground />
      <img
        src={PeerPrepGreenLogo}
        width="25%"
        alt="Peerprep =green logo"
        style={{ zIndex: 1 }}
      />
    </CenterContainer>
  );
}

export default LoadingPage;
