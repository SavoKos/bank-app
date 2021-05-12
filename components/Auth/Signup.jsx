import React, { useContext, useState } from 'react';
import axios from '../../axios-instance';
import AuthContext from '../../context/AuthContext';
import Router from 'next/router';

const Signup = props => {
  const [credentials, setCredentials] = useState({
    password: '',
    email: '',
    name: '',
  });
  const [inputError, setInputError] = useState([]);
  const [databaseError, setDatabaseError] = useState(undefined);

  const [auth, setAuth] = useContext(AuthContext);

  const updateInputValueHandler = event => {
    setCredentials(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const signupUser = () => {
    const data = {
      password: credentials.password,
      email: credentials.email,
      returnSecureToken: true,
      displayName: credentials.name,
    };

    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqXIuIWW_Yxys8Ed28Y1dfdsF9pmJLDMY',
        data
      )
      .then(response => {
        console.log(response);
        setAuth({ ...data, ...response.data });
        Router.push('/');
      })
      .catch(error =>
        setDatabaseError('Account already exists. Try with another email.')
      );
  };

  const checkErrors = () => {
    const isError = props.trySignup(credentials);
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

  return (
    <>
      <div className="login-box-formbox">
        <div className="login-box-signup">
          Login to existing account?
          <a onClick={props.toggleSignupActive}> Log in</a>
        </div>
        <div className="login-box-login">
          <h1>Welcome to quikCash</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            laudantium dolorem?
          </p>
          <form action="#">
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
              <input
                type="button"
                value="Sign up"
                className="btn"
                onClick={checkErrors}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="login-box-quotebox">
        <div className="quote-container">
          <div className="quote">Make a Dream.</div>
          <div className="quote-small">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            repellendus cumque voluptatum animi, illum veniam?"
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
