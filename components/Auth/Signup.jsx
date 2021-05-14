import React, { useState } from 'react';
import useAuth from '../../context/AuthContext';
import Router from 'next/router';
import Image from 'next/image';
import Spinner from '../UI/Spinner';
import S from '../../styles/styledComponents';

const Signup = props => {
  const [credentials, setCredentials] = useState({
    password: '',
    email: '',
    name: '',
  });
  const [inputError, setInputError] = useState([]);
  const [databaseError, setDatabaseError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  const updateInputValueHandler = event => {
    setCredentials(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const signupUser = () => {
    setLoading(true);
    signup(credentials.email, credentials.password)
      .then(user => {
        Router.push('/');
      })
      .catch(error => {
        console.log(error);
        setDatabaseError(error.message);
        setLoading(false);
      });
  };

  const checkErrors = e => {
    e.preventDefault();
    const isError = props.validateInput(credentials);
    if (isError.length === 0) return signupUser();
    return setInputError(isError);
  };

  let error = '';
  if (inputError !== [])
    error = inputError.map(errorMessage => (
      <p key={errorMessage} className="error-message">
        {errorMessage}
      </p>
    ));

  if (databaseError) error = <p>{databaseError}</p>;

  if (loading) return <Spinner />;

  return (
    <>
      <div className="login-box-formbox">
        <div className="login-box-signup">
          Login to existing account?
          <a onClick={props.toggleSignupActive}> Log in</a>
        </div>
        <div className="login-box-login">
          <h1>Welcome to Excellence Holdings</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            laudantium dolorem?
          </p>
          <form onSubmit={checkErrors}>
            <div>
              <label htmlFor="name"> Name</label>
              <input
                type="text"
                name="name"
                className="input-name"
                onChange={event => updateInputValueHandler(event)}
              />
            </div>
            <div>
              <label htmlFor="email"> E-Mail</label>
              <input
                type="email"
                name="email"
                className="input-email"
                onChange={event => updateInputValueHandler(event)}
              />
            </div>
            <div>
              <label htmlFor="password"> Password</label>
              <input
                type="password"
                name="password"
                className="input-password"
                onChange={event => updateInputValueHandler(event)}
              />
            </div>
            {error}
            <div>
              <S.BlueButton className="login-btn" onClick={checkErrors}>
                Sign Up
              </S.BlueButton>
            </div>
          </form>
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

export default Signup;
