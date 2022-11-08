import SplitterContainer from '../../components/layout/SplitterContainer';
import SignupForm from '../../components/forms/SignupForm';

function SignupPage() {
  return (
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
  );
}

export default SignupPage;
