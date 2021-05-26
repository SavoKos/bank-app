import Modal from '../../UI/Modal';
import Image from 'next/image';
import formatAmount from '../FormatNumber';
import { database } from '../../../firebase';
import { v4 as uuid } from 'uuid';
import useAuth from '../../../context/AuthContext';
import styled from 'styled-components';
import { useState } from 'react';
import S from '../../../styles/styledComponents';
import Router from 'next/router';
import Spinner from '../../UI/Spinner';

const LoanAmount = ({ selectedLoan, setSelectedCard }) => {
  const [modalActive, setModalActive] = useState(false);
  const [loanAmount, setLoanAmount] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const loanHandler = amount => {
    setModalActive(true);
    setLoanAmount(amount);
  };

  const takeLoanHandler = () => {
    setModalActive(false);
    setLoading(true);
    database
      .ref(`users/${currentUser.uid}/transactions/${uuid()}`)
      .set({
        type: 'income',
        amount: loanAmount,
        name: selectedLoan,
        date: new Date().toISOString(),
      })
      .then(res => {
        setLoading(false);
        setSuccessMessage(
          'Your loan has been approved. Redirecing in 2 seconds.'
        );
        setTimeout(() => {
          Router.push('/');
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  if (successMessage)
    return (
      <S.Loan>
        <h1 className="success-message">{successMessage}</h1>
      </S.Loan>
    );

  if (loading)
    return (
      <S.Loan>
        <Spinner absolute={false} />
      </S.Loan>
    );

  return (
    <S.Loan>
      <div className="header">
        <h1>{selectedLoan || 'Loan'}</h1>
        <p onClick={() => setSelectedCard([])}>Back</p>
      </div>
      <S.LoanOption>
        <h1 onClick={() => loanHandler('10000')}>{formatAmount(10000)}</h1>
        <h1 onClick={() => loanHandler('20000')}>{formatAmount(20000)}</h1>
        <h1 onClick={() => loanHandler('30000')}>{formatAmount(30000)}</h1>
        <h1 onClick={() => loanHandler('40000')}>{formatAmount(40000)}</h1>
      </S.LoanOption>
      <Modal active={modalActive} closeModal={() => setModalActive(false)}>
        <Image src="/navigationLogo.png" height={70} width={50} />
        <h1 style={{ color: '#fff', marginTop: '40px' }}>
          Are you sure you want take {formatAmount(loanAmount)} loan? <br />
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
};

export default LoanAmount;

// -------------------------------------------------- styling ----------------------------------------------
S.Loan = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .success-message {
    margin-top: 20px;
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

S.LoanOption = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  h1 {
    width: 40%;
    border-radius: 10px;
    padding: 20px 0;
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
