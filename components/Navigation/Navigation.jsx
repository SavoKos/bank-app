import styled from 'styled-components';
import Image from 'next/image';
import Icon from '../UI/Icon';
import { useState } from 'react';
import Router from 'next/router';
import Modal from '../UI/Modal';
import useAuth from '../../context/AuthContext';
import Spinner from '../UI/Spinner';
import S from '../../styles/styledComponents';

const Navigation = () => {
  const { logout } = useAuth();
  const [modalActive, setModalActive] = useState(false);
  const [loading, setLoading] = useState(false);
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
    <StyledNavigation>
      <Image
        src="/navigationLogo.png"
        height={70}
        width={50}
        className="logo"
      />
      <Icon type="icon-dashboard" style={iconStyle} />
      <Icon type="icon-ic24-transaction" style={iconStyle} />
      <Icon type="icon-wallet" style={iconStyle} />
      <Icon type="icon-user" style={iconStyle} />
      <Icon
        type="icon-settings"
        style={iconStyle}
        clicked={() => Router.push('/settings')}
      />
      <Icon
        type="icon-logout"
        clicked={() => setModalActive(true)}
        style={{
          fontSize: '25px',
          color: '#7c8ea4',
          margin: '50px 0',
        }}
      />
      <Modal active={modalActive} closeModal={() => setModalActive(false)}>
        <h1 style={{ color: '#fff' }}>Are you sure you want to log out?</h1>
        <ButtonsContainer>
          <S.BlueButton onClick={logoutHandler} type="blue">
            Logout
          </S.BlueButton>
          <S.RedButton onClick={() => setModalActive(false)} type="red">
            Cancel
          </S.RedButton>
        </ButtonsContainer>
      </Modal>
    </StyledNavigation>
  );
};

const StyledNavigation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default Navigation;
