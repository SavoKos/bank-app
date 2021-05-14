import styled from 'styled-components';
import Navigation from '../components/Navigation';
import useAuth from '../context/AuthContext';
import withAuth from '../hoc/withAuth';
import S from '../styles/styledComponents';
import Image from 'next/image';
import Icon from '../components/UI/Icon';
import EditProfileForm from '../components/EditProfileForm';
import { useState } from 'react';

const settings = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  const [initialCredentials, setInitialCredentials] = useState('');
  const [dbError, setdbError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const updateProfileHandler = (type, data) => {
    currentUser[type](data)
      .then(res => {
        setSuccessMessage('Profile is successfully updated.');
      })
      .catch(error => setdbError(error.message));
  };

  const updateCredentialsHandler = updatedCredentials => {
    if (updatedCredentials.name !== initialCredentials.name)
      return updateProfileHandler('updateProfile', {
        displayName: updatedCredentials.name,
      });

    if (updatedCredentials.email !== initialCredentials.email)
      return updateProfileHandler('updateEmail', updatedCredentials.email);

    if (updatedCredentials.password !== initialCredentials.password)
      return updateProfileHandler(
        'updatePassword',
        updatedCredentials.password
      );

    setSuccessMessage('No changes were made on profile.');
  };

  let avatar = (
    <h1 className="first-letter">
      {currentUser.email.slice(0, 1).toUpperCase()}
    </h1>
  );
  if (currentUser.photoURL)
    avatar = (
      <Image
        height={100}
        width={100}
        src={currentUser.photoURL}
        style={{ borderRadius: '50%' }}
      />
    );

  let message = '';
  if (successMessage)
    message = (
      <S.Message>
        <h2>{successMessage}</h2>
      </S.Message>
    );

  return (
    <S.Container>
      <Navigation />
      <S.Settings>
        <h1 className="title">Edit profile</h1>
        <S.Avatar>
          {avatar}
          <Icon type="icon-edit" style={{ fontSize: '15px' }} />
        </S.Avatar>
        {message}
        <EditProfileForm
          currentUser={currentUser}
          initialCredentials={credentials => setInitialCredentials(credentials)}
          updateCredentials={credentials =>
            updateCredentialsHandler(credentials)
          }
          dbError={dbError}
        />
      </S.Settings>
    </S.Container>
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

  .first-letter {
    color: #fff;
    font-size: 40px;
  }

  .anticon {
    position: absolute;
    bottom: 5px;
    right: 8px;
    font-size: 8px;
    border-radius: 50%;
    color: #fff;
    padding: 7px;
    background-color: ${({ theme }) => theme.colors.blue};
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
