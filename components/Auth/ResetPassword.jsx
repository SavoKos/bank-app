import React, { useState } from 'react';
import Image from 'next/image';
import useAuth from '../../context/AuthContext';
import Spinner from '../UI/Spinner';
import styled from 'styled-components';
import S from '../../styles/styledComponents';
import Head from '../Head';

const ResetPassword = props => {
  const [email, setEmail] = useState('');
  const [inputError, setInputError] = useState([]);
  const [databaseError, setDatabaseError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { resetPassword } = useAuth();

  const resetPasswordHandler = () => {
    setLoading(true);
    resetPassword(email)
      .then(user => {
        setMessage('Check your email inbox for further instructions');
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        setDatabaseError(error.message);
      });
  };

  const checkErrors = e => {
    e.preventDefault();
    const isError = props.validateEmail({ email: email });
    if (isError.length === 0) return resetPasswordHandler();
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

  if (message)
    return (
      <S.Reset>
        <h1>{message}</h1>
        <S.BlueButton onClick={props.backToLogin}>Back to Login</S.BlueButton>
      </S.Reset>
    );

  return (
    <>
      <Head title="Reset Password" />
      <div className="login-box-formbox">
        <div className="login-box-signup">
          Log in to existing account?
          <a onClick={props.backToLogin}> Log in</a>
        </div>
        <div className="login-box-login">
          <h1>Reset your password at Excellence Holdings</h1>
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
                onChange={event => setEmail(event.target.value)}
              />
            </div>
            {error}
            <div>
              <S.BlueButton>Reset Password</S.BlueButton>
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
S.Reset = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default ResetPassword;
