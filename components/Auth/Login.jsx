import React, { useState } from 'react';
import Router from 'next/router';
import Image from 'next/image';
import useAuth from '../../context/AuthContext';
import Spinner from '../UI/Spinner';
import S from '../../styles/styledComponents';

const Login = props => {
  const [credentials, setCredentials] = useState({
    password: '',
    email: '',
  });
  const [inputError, setInputError] = useState([]);
  const [databaseError, setDatabaseError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const updateInputValueHandler = event => {
    setCredentials(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const loginUser = () => {
    setLoading(true);
    login(credentials.email, credentials.password)
      .then(user => {
        Router.push('/');
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        setDatabaseError(error.message);
      });
  };

  const checkErrors = e => {
    e.preventDefault();
    const isError = props.validateInput(credentials);
    if (isError.length === 0) return loginUser();
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
          Don't have an account?
          <a onClick={props.toggleSignupActive}> Sign Up</a>
        </div>
        <div className="login-box-login">
          <h1>Welcome back to Excellence Holdings</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            laudantium dolorem?
          </p>
          <S.Form onSubmit={checkErrors}>
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
                Login
              </S.BlueButton>
              <a className="forgot-password" onClick={props.resetPassword}>
                Forgot Password?
              </a>
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

export default Login;
