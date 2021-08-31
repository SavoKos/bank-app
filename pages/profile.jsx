import styled from 'styled-components';
import Navigation from '../components/Navigation';
import useAuth from '../context/AuthContext';
import withAuth from '../hoc/withAuth';
import S from '../styles/styledComponents';
import Icon from '../components/UI/Icon';
import EditProfileForm from '../components/EditProfileForm';
import { useState } from 'react';
import { database } from '../firebase';
import Router from 'next/router';
import Head from '../components/Head';

const settings = () => {
  const { currentUser } = useAuth();
  const [initialCredentials, setInitialCredentials] = useState('');
  const [updatedCredentials, setUpdatedCredentials] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const updateProfile = (type, data) => {
    currentUser[type](data)
      .then((res) => {
        setIsRedirecting(true);

        setSuccessMessage(
          'Profile is successfully updated. Redirecting in 2 seconds.'
        );
        setTimeout(() => {
          Router.push('/');
        }, 2000);
      })
      .catch((error) => setError(error.message));
  };

  const updateDatabase = (url = currentUser.photoURL) => {
    database
      .ref('users/' + currentUser.uid)
      .update({
        email: updatedCredentials['email'],
        name: updatedCredentials['name'],
        photoURL: url,
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const filterChangedCredentials = () => {
    if (
      updatedCredentials.password !== initialCredentials.password &&
      updatedCredentials.password !== updatedCredentials.confirmPassword
    )
      return setError('Passwords do not match!');

    if (updatedCredentials.name !== initialCredentials.name)
      updateProfile('updateProfile', {
        displayName: updatedCredentials.name,
      });

    if (updatedCredentials.email !== initialCredentials.email)
      updateProfile('updateEmail', updatedCredentials.email);

    if (updatedCredentials.password !== initialCredentials.password)
      updateProfile('updatePassword', updatedCredentials.password);

    updateDatabase();
  };

  let avatar = (
    <h1 className='first-letter'>
      {currentUser.displayName.slice(0, 1).toUpperCase()}
    </h1>
  );

  let message = '';
  if (successMessage)
    message = (
      <S.Message>
        <h2>{successMessage}</h2>
      </S.Message>
    );

  const form = (
    <EditProfileForm
      currentUser={currentUser}
      initialCredentials={(credentials) => setInitialCredentials(credentials)}
      setUpdatedCredentials={(credentials) =>
        setUpdatedCredentials(credentials)
      }
      filterChangedCredentials={filterChangedCredentials}
      error={error}
      isRedirecting={isRedirecting}
    />
  );

  return (
    <>
      <Head title='Profile' />
      <S.Container>
        <Navigation />
        <S.Settings>
          <h1 className='title'>Edit profile</h1>
          <S.Avatar>
            {avatar}
            <Icon type='icon-edit' style={{ fontSize: '15px' }} />
          </S.Avatar>
          {message}
          {form}
        </S.Settings>
      </S.Container>
    </>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
S.Settings = styled(S.Container)`
  background-color: #fff;
  padding: 40px;
  flex-direction: column;
  align-items: center;

  .title {
    align-self: flex-start;
  }
`;

S.Avatar = styled.div`
  width: fit-content;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .avatar {
    border-radius: 50%;
  }

  .first-letter {
    color: #fff;
    font-size: 40px;
  }

  .anticon,
  input {
    position: absolute;
    bottom: 5px;
    right: 8px;
    font-size: 8px;
    border-radius: 50%;
    color: #fff;
    padding: 7px;
    background-color: ${({ theme }) => theme.colors.blue};
    cursor: pointer;
  }

  .anticon {
    pointer-events: none;
  }

  input {
    height: 30px;
    width: 30px;
    opacity: 0;
    padding-left: 23px;
    z-index: 5;
  }
`;

S.Name = styled.div`
  text-align: center;

  a {
    display: block;
    color: ${({ theme }) => theme.colors.blue};
    font-size: 20px;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

S.Message = styled.div`
  background-color: #8eb4f6;
  border: 1px solid #2c78fb;
  padding: 10px 40px;
  border-radius: 5px;
  margin: 70px 0 -50px 0;
`;

export default withAuth(settings);
