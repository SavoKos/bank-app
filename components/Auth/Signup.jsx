import React, { useState } from 'react';
import useAuth from '../../context/AuthContext';
import Router from 'next/router';
import Image from 'next/image';
import Spinner from '../UI/Spinner';
import S from '../../styles/styledComponents';
import { database, storage } from '../../firebase';
import styled from 'styled-components';

const Signup = props => {
  const [credentials, setCredentials] = useState({
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
  });
  const [error, setError] = useState(undefined);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const updateInputValueHandler = event => {
    setCredentials(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const storeDatabase = user => {
    const userData = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };

    database
      .ref('users/' + user.uid)
      .set(userData)
      .then(() => Router.replace('/cards'));
  };

  const updateProfileHandler = (userData, url = null) => {
    userData
      .updateProfile({
        displayName: credentials.name,
        photoURL: url,
      })
      .then(() => storeDatabase(userData));
  };

  const signupUser = () => {
    setLoading(true);
    signup(credentials.email, credentials.password)
      .then(user => {
        const userData = user.user;
        console.log(userData);
        if (!image) return updateProfileHandler(userData);

        const fileRef = storage.ref(`images/${image.name}`);
        fileRef.put(image).then(() =>
          fileRef.getDownloadURL().then(url => {
            updateProfileHandler(userData, url);
          })
        );
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  };

  const signupHandler = e => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword)
      return setError('Passwords do not match!');
    return signupUser();
  };

  const setImageHandler = e => {
    const image = e.target.files[0];
    if (image.size > 10000000)
      return setError('Image size must be less than 10MB');

    setError(undefined);
    setImage(image);
  };

  let errorMessage = '';
  if (error) errorMessage = <p className="error-message">{error}</p>;

  if (loading) return <Spinner />;

  return (
    <>
      <div className="login-box-formbox">
        <div className="login-box-signup">
          Log in to existing account?
          <a onClick={props.toggleSignupActive}> Log in</a>
        </div>
        <div className="login-box-login">
          <h1>Welcome to Excellence Holdings</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            laudantium dolorem?
          </p>
          <S.Form onSubmit={signupHandler}>
            <div>
              <label htmlFor="name"> Name</label>
              <input
                type="text"
                name="name"
                className="input-name"
                onChange={event => updateInputValueHandler(event)}
                required
              />
            </div>
            <div>
              <label htmlFor="email"> E-Mail</label>
              <input
                type="email"
                name="email"
                className="input-email"
                onChange={event => updateInputValueHandler(event)}
                required
              />
            </div>
            <div>
              <label htmlFor="password"> Password</label>
              <input
                type="password"
                name="password"
                className="input-password"
                onChange={event => updateInputValueHandler(event)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword"> Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="input-password"
                onChange={event => updateInputValueHandler(event)}
                required
              />
            </div>
            <S.InputImage>
              <input
                type="file"
                name="picture"
                className="input-file"
                onChange={setImageHandler}
              />
            </S.InputImage>
            {errorMessage}
            <div>
              <S.BlueButton className="login-btn">Sign Up</S.BlueButton>
            </div>
          </S.Form>
        </div>
      </div>
      <div className="login-box-quotebox">
        <Image src="/loginLogo.png" height={193} width={150} className="logo" />
        <h1>Excellence Holdings</h1>
        <h1 className="quote">Make it happen.</h1>
      </div>
    </>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
S.InputImage = styled.div`
  padding: 0 !important;
  margin: 0;
  border: 1px solid #bbb;
  border-radius: 5px;
  position: relative;
  background-color: #acb6bb;
  cursor: pointer;

  ::before {
    content: 'Add profile picture';
    position: absolute;
    font-size: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export default Signup;
