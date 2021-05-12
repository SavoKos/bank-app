import React, { useContext, useState } from 'react';
import axios from '../../axios-instance';
import Router from 'next/router';
import AuthContext from '../../context/AuthContext';

const Login = props => {
  const [credentials, setCredentials] = useState({
    password: '',
    email: '',
  });
  const [inputError, setInputError] = useState([]);
  const [databaseError, setdatabaseError] = useState(undefined);
  const [auth, setAuth] = useContext(AuthContext);

  const updateInputValueHandler = event => {
    setCredentials(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const loginUser = () => {
    const data = {
      password: credentials.password,
      email: credentials.email,
      returnSecureToken: true,
    };

    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqXIuIWW_Yxys8Ed28Y1dfdsF9pmJLDMY',
        data
      )
      .then(response => {
        console.log(response);
        setAuth({ ...data, ...response.data });
        Router.push('/');
      })
      .catch(error =>
        setdatabaseError(
          "Account doesn't exist or you have entered wrong credentials. Try again!"
        )
      );
  };

  const checkErrors = e => {
    e.preventDefault();
    const isError = props.tryLogin(credentials);
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

  return (
    <>
      <div className="login-box-formbox">
        <div className="login-box-signup">
          Don't have an account?
          <a onClick={props.toggleSignupActive}> Sign Up</a>
        </div>
        <div className="login-box-login">
          <h1>Welcome back to quikCash</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            laudantium dolorem?
          </p>
          <form onSubmit={checkErrors}>
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
              <button className="btn">Login</button>
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

      {/* <input
        type="email"
        className="input"
        placeholder="Email"
        name="email"
        onChange={event => updateInputValueHandler(event)}
      />
      <input
        type="password"
        className="input"
        placeholder="Password"
        name="password"
        onChange={event => updateInputValueHandler(event)}
      />
      {error}
      <button className="submit-btn" onClick={checkErrors}>
        Log in
      </button>
      <button onClick={props.toggleSignupActive}>Toggle</button> */}
    </>
  );
};

export default Login;
