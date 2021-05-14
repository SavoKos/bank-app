import styled from 'styled-components';

const Spinner = () => {
  return <S.Spinner />;
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Spinner = styled.div`
  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 40px;
  min-height: 40px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-right: 5px solid ${({ theme }) => theme.colors.blue};
  border-radius: 50%;
  animation: spinner 1s linear infinite;
`;

export default Spinner;
