import { useState } from 'react';
import styled from 'styled-components';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import ResetPassword from '../components/Auth/ResetPassword';
import Head from '../components/Head';

const auth = () => {
  const [signupActive, setSignupActive] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const toggleSignupActiveHandler = () => {
    setSignupActive(prevActive => !prevActive);
  };

  const backToLoginHandler = () => {
    setForgotPassword(false);
    setSignupActive(false);
  };

  if (forgotPassword)
    return (
      <>
        <Head title="Auth" />
        <S.Container>
          <S.Auth>
            <ResetPassword
              backToLogin={backToLoginHandler}
              validateEmail={info => authHandler(info)}
            />
          </S.Auth>
        </S.Container>
      </>
    );

  return (
    <>
      <Head title="Auth" />
      <S.Container>
        <S.Auth>
          {signupActive ? (
            <Signup toggleSignupActive={toggleSignupActiveHandler} />
          ) : (
            <Login
              resetPassword={() => setForgotPassword(true)}
              toggleSignupActive={toggleSignupActiveHandler}
            />
          )}
        </S.Auth>
      </S.Container>
    </>
  );
};
export default auth;

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
`;

S.Auth = styled.div`
  display: flex;
  width: 75em;
  height: 100%;
  min-height: 60em;
  border-radius: 20px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.025);

  .login-btn {
    display: block;
    width: 100%;
    margin: auto;
  }

  a {
    color: ${({ theme }) => theme.colors.blue};
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;

    &.forgot-password {
      text-align: center;
      margin-top: 20px;
      display: block;
    }

    &:hover,
    &:focus {
      text-decoration: underline;
      color: #0f1396;
    }
  }

  .login-box-formbox,
  .login-box-quotebox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 1 100%;
    //   width: 100%;
    padding: 4em 6em;
  }

  .login-box-quotebox {
    color: white;
    background-color: ${({ theme }) => theme.colors.blue};
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="%235257f0" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 17.6l-2 -1.1v-2.5"></path><path d="M4 10v-2.5l2 -1.1"></path><path d="M10 4.1l2 -1.1l2 1.1"></path><path d="M18 6.4l2 1.1v2.5"></path><path d="M20 14v2.5l-2 1.12"></path><path d="M14 19.9l-2 1.1l-2 -1.1"></path><line x1="12" y1="12" x2="14" y2="10.9"></line><line x1="18" y1="8.6" x2="20" y2="7.5"></line><line x1="12" y1="12" x2="12" y2="14.5"></line><line x1="12" y1="18.5" x2="12" y2="21"></line><path d="M12 12l-2 -1.12"></path><line x1="6" y1="8.6" x2="4" y2="7.5"></line></svg>'),
      linear-gradient(
        to right top,
        #0f1396,
        #202199,
        #2d2d9c,
        #38389f,
        #4243a1,
        #4243a1,
        #4142a0,
        #4142a0,
        #36379d,
        #2b2b99,
        #1d1e95,
        #0a0f90
      );
    background-size: 125%;
    background-repeat: no-repeat;
    background-position: center left;
    margin-top: -200px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    h1 {
      color: #fff;
    }
  }

  .login-box-login {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    flex-grow: 1;

    & > * {
      width: 100%;
      flex-shrink: 0;
    }
  }

  .alternate-text {
    display: flex;
    align-items: center;
    margin: 1.5em 0;
    text-align: center;

    &::before,
    &::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid #bebebe;
    }

    &::before {
      margin-right: 1em;
    }

    &::after {
      margin-left: 1em;
    }
  }

  .alternate-boxes {
    display: flex;
    justify-content: space-between;
    gap: 1em;
    margin-top: 1.5em;
  }

  .alternate-box {
    color: #131125;
    text-align: center;
    width: 100%;
    padding: 1em 1em;
    border: 1px solid rgba(#bebebe, 0.5);
    border-radius: 5px;
    cursor: pointer;
    transition: all 500ms ease;

    svg {
      transition: transform 500ms ease;
    }

    &:hover {
      border-color: #bebebe;
      background-color: rgba(#bebebe, 0.25);

      svg {
        transform: scale(1.25);
      }
    }
  }

  padding: 1em 0;
  position: relative;

  .logo {
    cursor: pointer;
    margin-bottom: 50px !important;
    height: 193px !important;
    width: 150px !important;
    min-height: 0 !important;
    position: static !important;
  }

  .quote {
    color: #fff;
    font-size: 7em;
    font-weight: 600;
    line-height: 1;
    justify-self: center;
    margin-top: 70px;
  }
`;
