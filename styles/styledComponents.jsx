import styled from 'styled-components';

const S = {};

S.Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
  display: flex;
  overflow: hidden;
`;

S.BlueButton = styled.button`
  background-color: #2028eb;
  border-color: #2028eb;
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
    background-color: #0f1396;
    border-color: #0f1396;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

S.RedButton = styled(S.BlueButton)`
  background-color: #ff1800;

  &:hover,
  &:focus {
    background-color: #990f00;
    border-color: #990f00;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

export default S;
