import { useState } from 'react';
import styled from 'styled-components';
import useAuth from '../../../context/AuthContext';
import { database } from '../../../firebase';
import S from '../../../styles/styledComponents';
import Icon from '../../UI/Icon';
import Modal from '../../UI/Modal';
import { v4 as uuid } from 'uuid';

const Loan = () => {
  const [loan, setLoan] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [loanAmount, setLoanAmount] = useState(false);
  const { currentUser } = useAuth();

  const loanHandler = amount => {
    setModalActive(true);
    setLoanAmount(amount);
  };

  const takeLoanHandler = () => {
    setModalActive(false);
    database
      .ref(`users/${currentUser.uid}/transactions/${uuid()}`)
      .set({
        type: 'income',
        amount: loanAmount,
        name: loan,
        date: new Date().toISOString(),
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  if (loan)
    return (
      <S.Loan>
        <div className="header">
          <h1>{loan || 'Loan'}</h1>
          <p onClick={() => setLoan(null)}>Back</p>
        </div>
        <S.LoanOption>
          <h1 onClick={() => loanHandler('$ 10.000')}>$ 10.000</h1>
          <h1 onClick={() => loanHandler('20.000')}>$ 20.000</h1>
          <h1 onClick={() => loanHandler('30.000')}>$ 30.000</h1>
          <h1 onClick={() => loanHandler('40.000')}>$ 40.000</h1>
        </S.LoanOption>
        <Modal active={modalActive} closeModal={() => setModalActive(false)}>
          <h1 style={{ color: '#fff' }}>
            Are you sure you want take {loanAmount} loan? <br />
          </h1>
          <S.ButtonsContainer>
            <S.BlueButton onClick={takeLoanHandler}>Yes</S.BlueButton>
            <S.RedButton onClick={() => setModalActive(false)}>
              Cancel
            </S.RedButton>
          </S.ButtonsContainer>
        </Modal>
      </S.Loan>
    );

  return (
    <S.Loan>
      <h1 className="title">Loan</h1>
      <S.LoanCard onClick={() => setLoan('Consumer Loan')}>
        <h2>Consumer loan</h2>
        <p>Manage your financial life</p>
        <h5>Up to $40.000</h5>
        <Icon type="icon-arrow-right" className="arrow-right" />
      </S.LoanCard>
      <S.LoanCard onClick={() => setLoan('Refinance')}>
        <h2>Refinance</h2>
        <p>Save your money by redicing overpayment</p>
        <h5>Up to $40.000</h5>
        <Icon type="icon-arrow-right" className="arrow-right" />
      </S.LoanCard>
      <S.LoanCard onClick={() => setLoan('Auto Loan')}>
        <h2>Auto loan</h2>
        <p>Special offers from the BMW and Volkswagen</p>
        <h5>Up to $40.000</h5>
        <Icon type="icon-arrow-right" className="arrow-right" />
      </S.LoanCard>
      <S.LoanCard onClick={() => setLoan('Mortgage')}>
        <h2>Mortgage</h2>
        <p>Make the dream of your own home come true</p>
        <h5>Up to $40.000</h5>
        <Icon type="icon-arrow-right" className="arrow-right" />
      </S.LoanCard>
    </S.Loan>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
S.Loan = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-bottom: 30px;
    align-self: flex-start;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    width: 100%;

    p {
      color: ${({ theme }) => theme.colors.lightBlue};
      margin-right: 20px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
S.LoanCard = styled.div`
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

S.LoanOption = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  h1 {
    width: 40%;
    border-radius: 10px;
    padding: 20px 30px;
    margin: 5px;
    border: 1px solid ${({ theme }) => theme.colors.lightBlue};
    text-align: center;
    transition: all ease 0.3s;
    cursor: pointer;
    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.lightBlue};
      background-color: ${({ theme }) => theme.colors.lightBlue};
      color: #fff;
    }
  }
`;
export default Loan;
