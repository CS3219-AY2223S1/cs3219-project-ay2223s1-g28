import SplitterContainer from '../../components/layout/SplitterContainer';
import SignupForm from '../../components/forms/SignupForm';
import GradientBackground from '../../components/layout/GradientBackground';

function SignupPage() {
  return (
    <GradientBackground>
      <SplitterContainer
        primaryChild={
          <img
            src={require('../../assets/signup.svg').default}
            alt="Signup"
            width="100%"
            height="100%"
          />
        }
        secondaryChild={<SignupForm />}
      />
    </GradientBackground>
  );
}

export default SignupPage;
