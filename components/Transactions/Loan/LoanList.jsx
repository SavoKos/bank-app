import { useState } from 'react';
import styled from 'styled-components';
import Icon from '../../UI/Icon';
import LoanCard from './LoanCard';

const LoanList = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);

  if (selectedLoan)
    return (
      <LoanCard selectedLoan={selectedLoan} setSelectedLoan={setSelectedLoan} />
    );

  return (
    <S.LoanList>
      <h1 className="title">Loan</h1>
      <S.LoanType onClick={() => setSelectedLoan('Consumer Loan')}>
        <h2>Consumer loan</h2>
        <p>Manage your financial life</p>
        <h5>Up to $40.000</h5>
        <Icon type="icon-arrow-right" className="arrow-right" />
      </S.LoanType>
      <S.LoanType onClick={() => setSelectedLoan('Refinance')}>
        <h2>Refinance</h2>
        <p>Save your money by redicing overpayment</p>
        <h5>Up to $40.000</h5>
        <Icon type="icon-arrow-right" className="arrow-right" />
      </S.LoanType>
      <S.LoanType onClick={() => setSelectedLoan('Auto Loan')}>
        <h2>Auto loan</h2>
        <p>Special offers from the BMW and Volkswagen</p>
        <h5>Up to $40.000</h5>
        <Icon type="icon-arrow-right" className="arrow-right" />
      </S.LoanType>
      <S.LoanType onClick={() => setSelectedLoan('Mortgage')}>
        <h2>Mortgage</h2>
        <p>Make the dream of your own home come true</p>
        <h5>Up to $40.000</h5>
        <Icon type="icon-arrow-right" className="arrow-right" />
      </S.LoanType>
    </S.LoanList>
  );
};

export default LoanList;

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.LoanList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-bottom: 30px;
    align-self: flex-start;
  }
`;

S.LoanType = styled.div`
  width: 90%;
  border-radius: 10px;
  margin: 5px 0;
  padding: 20px 30px;
  box-shadow: 0px 0px 37px -6px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  position: relative;

  p {
    margin-bottom: 10px;
  }

  .arrow-right {
    position: absolute;
    right: 25px;
    top: 45px;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
