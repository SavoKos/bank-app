import styled from 'styled-components';
import S from '../../styles/styledComponents';
import Modal from '../UI/Modal';
import Image from 'next/image';

const LogoutModal = ({ onLogout, modalActive, onSetModalActive }) => {
  return (
    <Modal active={modalActive} closeModal={() => onSetModalActive(false)}>
      <Image src="/navigationLogo.png" height={70} width={50} />
      <h1 style={{ color: '#fff', margin: '20px 0 20px 0' }}>
        Are you sure you want to log out?
      </h1>
      <S.ButtonsContainer>
        <S.BlueButton onClick={onLogout} type="blue">
          Logout
        </S.BlueButton>
        <S.RedButton onClick={() => onSetModalActive(false)} type="red">
          Cancel
        </S.RedButton>
      </S.ButtonsContainer>
    </Modal>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
S.ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export default LogoutModal;
