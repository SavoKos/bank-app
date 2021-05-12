import { useState } from 'react';
import styled from 'styled-components';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import { validation } from '../components/Auth/validation';

const auth = () => {
  const [signupActive, setSignupActive] = useState(false);

  const authHandler = info => {
    const error = validation(info);
    if (error !== []) return error;
  };

  const toggleSignupActiveHandler = () => {
    setSignupActive(prevActive => !prevActive);
  };

  return (
    <StyledContainer>
      <StyledAuth>
        {signupActive ? (
          <Signup
            toggleSignupActive={toggleSignupActiveHandler}
            trySignup={info => authHandler(info)}
          />
        ) : (
          <Login
            toggleSignupActive={toggleSignupActiveHandler}
            tryLogin={info => authHandler(info)}
          />
        )}
      </StyledAuth>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
`;

const StyledAuth = styled.div`
  display: flex;
  width: 75em;
  height: 100%;
  min-height: 60em;
  border-radius: 20px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.025);

  .login-box-formbox,
  .login-box-quotebox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 100%;
    //   width: 100%;
    padding: 4em 6em;
  }

  .login-box-quotebox {
    color: white;
    background-color: #2028eb;
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
  }

  .login-box-signup {
    a {
      color: #a0a4e3;
      font-weight: 600;
      text-decoration: inherit;
      cursor: pointer;

      &:hover,
      &:focus {
        color: #0f1396;
      }
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

  form {
    & > div {
      position: relative;
      padding: 1.5em 0;

      input {
        color: #bebebe;
        width: 100%;
        padding: 1.5em 2em;
        border: 1px solid #bebebe;
        border-radius: 5px;

        &.input-email,
        &.input-password {
          background-repeat: no-repeat;
          background-position: right 1em top 1.25em;
        }

        &.input-email {
          background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="lightgrey" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="12" cy="12" r="4"></circle><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28"></path></svg>');
        }

        &.input-password {
          background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="lightgrey" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><rect x="5" y="11" width="14" height="10" rx="2"></rect><circle cx="12" cy="16" r="1"></circle><path d="M8 11v-4a4 4 0 0 1 8 0v4"></path></svg>');
        }

        &.input-name {
          background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsOC41MjY1MTI4MjkxMjEyMDJlLTE0LDUuNjg0MzQxODg2MDgwODAyZS0xNCkiPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTQzNy4wMiwzMzAuOThjLTI3Ljg4My0yNy44ODItNjEuMDcxLTQ4LjUyMy05Ny4yODEtNjEuMDE4QzM3OC41MjEsMjQzLjI1MSw0MDQsMTk4LjU0OCw0MDQsMTQ4ICAgIEM0MDQsNjYuMzkzLDMzNy42MDcsMCwyNTYsMFMxMDgsNjYuMzkzLDEwOCwxNDhjMCw1MC41NDgsMjUuNDc5LDk1LjI1MSw2NC4yNjIsMTIxLjk2MiAgICBjLTM2LjIxLDEyLjQ5NS02OS4zOTgsMzMuMTM2LTk3LjI4MSw2MS4wMThDMjYuNjI5LDM3OS4zMzMsMCw0NDMuNjIsMCw1MTJoNDBjMC0xMTkuMTAzLDk2Ljg5Ny0yMTYsMjE2LTIxNnMyMTYsOTYuODk3LDIxNiwyMTYgICAgaDQwQzUxMiw0NDMuNjIsNDg1LjM3MSwzNzkuMzMzLDQzNy4wMiwzMzAuOTh6IE0yNTYsMjU2Yy01OS41NTEsMC0xMDgtNDguNDQ4LTEwOC0xMDhTMTk2LjQ0OSw0MCwyNTYsNDAgICAgYzU5LjU1MSwwLDEwOCw0OC40NDgsMTA4LDEwOFMzMTUuNTUxLDI1NiwyNTYsMjU2eiIgZmlsbD0iI2QzZDNkMyIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4=');
          background-repeat: no-repeat;
          background-position: 96%;
          background-size: 20px;
        }

        &:focus {
          outline-color: #2028eb;
          border-color: #2028eb;
          background-image: none;
        }
      }

      label {
        font-size: 0.85em;
        position: absolute;
        top: 1.25em;
        left: 1.5em;
        background: #fff;
        padding: 0 0.5em;
      }

      &:focus-within label {
        color: #2028eb;
        font-weight: 600;
      }

      .btn {
        background-color: #2028eb;
        border-color: #2028eb;
        outline: 0;
        border: 0;
        color: #fff;
        width: 100%;
        padding: 20px;
        font-size: 18px;
        font-weight: 600;
        border-radius: 5px;

        &:hover,
        &:focus {
          background-color: #0f1396;
          border-color: #0f1396;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
      }
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

  .quote-container {
    padding: 1em 0;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: -4.5em;
      left: -0.65em;
      width: 3.5em;
      height: 3.5em;
      background-color: #93f8e0;
      border-radius: 100%;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 15px;
      height: 100%;
      width: 2px;
      background-color: rgba(#fff, 0.25);
    }
  }

  .quote {
    color: #fff;
    font-size: 7em;
    font-weight: 600;
    line-height: 1;
  }

  .quote-small {
    color: #ebeef7;
    line-height: 180%;
    padding: 2em 0 0 6em;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 2.75em;
      left: 1.2em;
      width: 3em;
      height: 2px;
      background-color: rgba(#fff, 0.25);
    }
  }
`;

export default auth;
