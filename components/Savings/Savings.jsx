import styled from 'styled-components';
import SavingsItem from './SavingsItem';

const Savings = ({ depositData, investmentData }) => {
  return (
    <S.Savings>
      <h1>Savings</h1>
      <SavingsItem type="deposit" savingsData={depositData} />
      <SavingsItem type="investment" savingsData={investmentData} />
    </S.Savings>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Savings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 40px;
`;
export default Savings;
