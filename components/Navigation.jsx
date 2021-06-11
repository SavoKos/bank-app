import styled from 'styled-components';
import Image from 'next/image';
import Icon from './UI/Icon';
import { memo, useState } from 'react';
import Router from 'next/router';
import useAuth from '../context/AuthContext';
import Spinner from './UI/Spinner';
import S from '../styles/styledComponents';
import LogoutModal from './Auth/LogoutModal';

const Navigation = memo(() => {
  console.log('Navigation render');
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const logoutHandler = () => {
    setLoading(true);
    logout()
      .then(res => {
        console.log(res);
        Router.push('/auth');
      })
      .catch(error => alert(error.message));
  };

  if (loading) return <Spinner />;
  return (
    <S.Navigation>
      <Image
        src="/navigationLogo.png"
        height={70}
        width={50}
        className="logo"
        onClick={() => Router.push('/')}
      />
      <Icon
        className={Router.pathname === '/' && 'active'}
        type="icon-dashboard1"
        clicked={() => Router.push('/')}
      />
      <Icon
        className={Router.pathname === '/transactions' && 'active'}
        type="icon-arrows-left-right"
        clicked={() => Router.push('/transactions')}
      />
      <Icon
        className={Router.pathname === '/cardeditor' && 'active'}
        type="icon-creditcard"
        clicked={() => Router.push('/cardeditor')}
      />
      <Icon
        type="icon-LC_icon_user_line_1"
        className={Router.pathname === '/profile' && 'active'}
        clicked={() => Router.push('/profile')}
      />
      <Icon
        type="icon-piggy-bank"
        clicked={() => Router.push('/savings')}
        className={Router.pathname === '/savings' && 'active'}
      />
      <Icon
        className="logout"
        type="icon-logout"
        clicked={() => setModalActive(true)}
      />
      <LogoutModal
        onLogout={logoutHandler}
        modalActive={modalActive}
        onSetModalActive={isActive => setModalActive(isActive)}
      />
    </S.Navigation>
  );
});

// -------------------------------------------------- styling ----------------------------------------------
S.Navigation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0 30px;

  .logo {
    cursor: pointer;
    margin-bottom: 50px !important;
    height: 70px !important;
    width: 50px !important;
    min-height: 0 !important;
    position: static !important;
  }

  .anticon {
    color: #7c8ea4;
    margin: -20px 0;
    padding: 10px;
    border-radius: 15px;

    &.logout {
      font-size: 25px;
      margin: 50px 0;
    }

    &.active {
      background-color: ${({ theme }) => theme.colors.lightBlue};
      color: #fff;
    }
  }

  @media (max-width: 1100px) {
    padding: 0 10px;
  }
`;

export default Navigation;
