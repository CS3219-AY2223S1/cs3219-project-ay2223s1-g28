import SplitterContainer from '../../components/layout/SplitterContainer';
import SigninForm from '../../components/forms/SigninForm';
import GradientBackground from '../../components/layout/GradientBackground';

function SigninPage() {
  return (
    <GradientBackground>
      <SplitterContainer
        primaryChild={
          <img
            src={require('../../assets/signin.png')}
            alt="Signin"
            height="100%"
            width="100%"
          />
        }
        secondaryChild={<SigninForm />}
      />
    </GradientBackground>
  );
}

export default SigninPage;
