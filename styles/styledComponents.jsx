import styled from 'styled-components';

const Styled = {};

Styled.Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 30px 0 0 30px;
  display: flex;
  overflow: hidden;
`;

Styled.EditButton = styled.button`
  border-radius: 5px;
  font-size: 14px;
  background-color: #fff;
  outline: 0;
  border: 0;
  padding: 7px 15px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.lightBlue};
`;

Styled.BlueButton = styled.button`
  background-color: ${({ theme }) => theme.colors.lightBlue};
  border-color: ${({ theme }) => theme.colors.lightBlue};
  outline: 0;
  border: 0;
  color: #fff;
  width: 100%;
  padding: 15px 50px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  margin-top: 40px;
  width: fit-content;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #09538e;
    border-color: #09538e;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

Styled.RedButton = styled(Styled.BlueButton)`
  background-color: #ff1800;

  &:hover,
  &:focus {
    background-color: #990f00;
    border-color: #990f00;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

Styled.Form = styled.form`
  .error-message {
    color: red;
    font-weight: 400;
  }

  & > div {
    position: relative;
    padding: 1.5em 0;

    input {
      color: #000;
      width: 100%;
      padding: 1.5em 2em;
      border: 1px solid #bebebe;
      border-radius: 5px;

      &.input-email,
      &.input-password,
      &.input-phone,
      &.input-name {
        background-size: 24px;
        background-repeat: no-repeat;
        background-position: right 1em top 1.25em;
      }

      &.input-file {
        opacity: 0;
        cursor: pointer;
        padding: 15px;
      }

      &.input-email {
        background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="lightgrey" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="12" cy="12" r="4"></circle><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28"></path></svg>');
      }

      &.input-password {
        background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="lightgrey" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><rect x="5" y="11" width="14" height="10" rx="2"></rect><circle cx="12" cy="16" r="1"></circle><path d="M8 11v-4a4 4 0 0 1 8 0v4"></path></svg>');
      }

      &.input-name {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsOC41MjY1MTI4MjkxMjEyMDJlLTE0LDUuNjg0MzQxODg2MDgwODAyZS0xNCkiPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTQzNy4wMiwzMzAuOThjLTI3Ljg4My0yNy44ODItNjEuMDcxLTQ4LjUyMy05Ny4yODEtNjEuMDE4QzM3OC41MjEsMjQzLjI1MSw0MDQsMTk4LjU0OCw0MDQsMTQ4ICAgIEM0MDQsNjYuMzkzLDMzNy42MDcsMCwyNTYsMFMxMDgsNjYuMzkzLDEwOCwxNDhjMCw1MC41NDgsMjUuNDc5LDk1LjI1MSw2NC4yNjIsMTIxLjk2MiAgICBjLTM2LjIxLDEyLjQ5NS02OS4zOTgsMzMuMTM2LTk3LjI4MSw2MS4wMThDMjYuNjI5LDM3OS4zMzMsMCw0NDMuNjIsMCw1MTJoNDBjMC0xMTkuMTAzLDk2Ljg5Ny0yMTYsMjE2LTIxNnMyMTYsOTYuODk3LDIxNiwyMTYgICAgaDQwQzUxMiw0NDMuNjIsNDg1LjM3MSwzNzkuMzMzLDQzNy4wMiwzMzAuOTh6IE0yNTYsMjU2Yy01OS41NTEsMC0xMDgtNDguNDQ4LTEwOC0xMDhTMTk2LjQ0OSw0MCwyNTYsNDAgICAgYzU5LjU1MSwwLDEwOCw0OC40NDgsMTA4LDEwOFMzMTUuNTUxLDI1NiwyNTYsMjU2eiIgZmlsbD0iI2QzZDNkMyIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4=');
      }

      &:focus {
        outline-color: ${({ theme }) => theme.colors.blue};
        border-color: ${({ theme }) => theme.colors.blue};
        background-image: none;
      }

      &:disabled {
        background-color: #dfdfdf;
        border: 1px solid #a7a7a7;
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
      color: ${({ theme }) => theme.colors.blue};
      font-weight: 600;
    }
  }
`;

Styled.SavingsCard = styled.div`
  margin-top: 20px;
  max-height: 250px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 30px;
  background: ${({ theme }) => theme.colors.primary};
  width: 100%;

  .add-goal {
    color: ${({ theme }) => theme.colors.lightBlue};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  .add-goal,
  .message {
    margin-top: 30px;
  }

  .icon {
    background-color: ${({ theme }) => theme.colors.lightBlue};
    min-height: 130px;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.investment {
      background-color: ${({ theme }) => theme.colors.purple};
    }
    .anticon {
      color: #fff;
      cursor: default !important;
    }
  }

  .info {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    width: 100%;
    .money {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 0 20px 0;
    }

    .goal {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    h4 {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

export default Styled;
