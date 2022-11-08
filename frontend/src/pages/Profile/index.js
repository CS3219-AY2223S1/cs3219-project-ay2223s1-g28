import { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';

import UpdateProfileForm from '../../components/forms/UpdateProfileForm';
import CustomBackdrop from '../../components/ui/CustomBackdrop';

import AlertContext from '../../context/alert-context';
import UserContext from '../../context/user-context';
import { Typography } from '@mui/material';

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
