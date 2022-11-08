import UpdateProfileForm from '../../components/forms/UpdateProfileForm';
import SplitterContainer from '../../components/layout/SplitterContainer';
import GradientBackground from '../../components/layout/GradientBackground';

function ProfilePage() {
  return (
    <GradientBackground>
      <SplitterContainer
        primaryChild={
          <img
            src={require('../../assets/signin.svg').default}
            alt="Signin"
            height="100%"
            width="100%"
          />
        }
        secondaryChild={<UpdateProfileForm />}
      />
    </GradientBackground>
  );
}

export default ProfilePage;
