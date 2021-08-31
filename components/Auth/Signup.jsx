import React, { useState } from 'react';
import useAuth from '../../context/AuthContext';
import Router from 'next/router';
import Image from 'next/image';
import Spinner from '../UI/Spinner';
import S from '../../styles/styledComponents';
import { database } from '../../firebase';
import styled from 'styled-components';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
  });
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const updateInputValueHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const updateProfileHandler = (userData) => {
    const updateUser = userData.updateProfile({
      displayName: credentials.name,
      photoURL: credentials.photoURL || userData.photoURL || null,
    });
    const storeUserDatabase = database.ref('users/' + userData.uid).set({
      name: credentials.name,
      email: userData.email,
      photoURL: credentials.photoURL || userData.photoURL,
    });

    Promise.all([updateUser, storeUserDatabase])
      .then(() => Router.replace('/cardeditor'))
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const signupUser = () => {
    setLoading(true);
    signup(credentials.email, credentials.password)
      .then((user) => updateProfileHandler(user.user))
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const signupHandler = (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword)
      return setError('Passwords do not match!');
    return signupUser();
  };

  let errorMessage = '';
  if (error) errorMessage = <p className='error-message'>{error}</p>;

  if (loading) return <Spinner />;

  return (
    <>
      <div className='login-box-formbox'>
        <div className='login-box-signup'>
          Log in to existing account?
          <a onClick={props.toggleSignupActive}> Log in</a>
        </div>
        <div className='login-box-login'>
          <h1>Welcome to Excellence Holdings</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            laudantium dolorem?
          </p>
          <S.Form onSubmit={signupHandler}>
            <div>
              <label htmlFor='name'> Name</label>
              <input
                type='text'
                name='name'
                className='input-name'
                onChange={(event) => updateInputValueHandler(event)}
                required
              />
            </div>
            <div>
              <label htmlFor='email'> E-Mail</label>
              <input
                type='email'
                name='email'
                className='input-email'
                onChange={(event) => updateInputValueHandler(event)}
                required
              />
            </div>
            <div>
              <label htmlFor='password'> Password</label>
              <input
                type='password'
                name='password'
                className='input-password'
                onChange={(event) => updateInputValueHandler(event)}
                required
              />
            </div>
            <div>
              <label htmlFor='confirmPassword'> Confirm Password</label>
              <input
                type='password'
                name='confirmPassword'
                className='input-password'
                onChange={(event) => updateInputValueHandler(event)}
                required
              />
            </div>
            {errorMessage}
            <div>
              <S.BlueButton className='login-btn'>Sign Up</S.BlueButton>
            </div>
          </S.Form>
        </div>
      </div>
      <div className='login-box-quotebox'>
        <Image src='/loginLogo.png' height={193} width={150} className='logo' />
        <h1>Excellence Holdings</h1>
        <h1 className='quote'>Make it happen.</h1>
      </div>
    </>
  );
};
export default Signup;
