import styled from 'styled-components';
import Image from 'next/image';
import Icon from './UI/Icon';
import { useState } from 'react';
import Router from 'next/router';
import useAuth from '../context/AuthContext';
import Spinner from './UI/Spinner';
import S from '../styles/styledComponents';
import LogoutModal from './Auth/LogoutModal';

const Navigation = () => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const iconStyle = {
    color: '#7c8ea4',
    margin: '-20px 0',
  };

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
        type="icon-dashboard"
        style={iconStyle}
        clicked={() => Router.push('/')}
      />
      <Icon type="icon-ic24-transaction" style={iconStyle} />
      <Icon type="icon-wallet" style={iconStyle} />
      <Icon
        type="icon-user"
        style={iconStyle}
        clicked={() => Router.push('/profile')}
      />
      <Icon type="icon-settings" style={iconStyle} />
      <Icon
        type="icon-logout"
        clicked={() => setModalActive(true)}
        style={{
          fontSize: '25px',
          color: '#7c8ea4',
          margin: '50px 0',
        }}
      />
      <LogoutModal
        onLogout={logoutHandler}
        modalActive={modalActive}
        onSetModalActive={isActive => setModalActive(isActive)}
      />
    </S.Navigation>
  );
};

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
`;

export default Navigation;
