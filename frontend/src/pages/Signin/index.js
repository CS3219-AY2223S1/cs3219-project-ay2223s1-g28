import SplitterContainer from '../../components/layout/SplitterContainer';
import SigninForm from '../../components/forms/SigninForm';

function SigninPage() {
  return (
    <SplitterContainer
      primaryChild={
        <img
          src={require('../../assets/signin.svg').default}
          alt="Signin"
          height="100%"
          width="100%"
        />
      }
      secondaryChild={<SigninForm />}
    />
  );
}

export default SigninPage;
