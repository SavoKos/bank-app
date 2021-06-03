import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import useAuth from '../../../context/AuthContext';
import { database } from '../../../firebase';
import S from '../../../styles/styledComponents';
import { v4 as uuid } from 'uuid';
import formatAmount from '../FormatNumber';
import Router from 'next/router';
import Spinner from '../../UI/Spinner';

const TransferForm = ({ recipient, selectedCard }) => {
  const [amount, setAmount] = useState(1);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const transactionID = uuid();

  console.log(recipient, currentUser);
  const transferHandler = () => {
    setError(null);
    setLoading(true);
    // 2 post request endpoints
    const UpdateCurrUserPromise = database
      .ref(`users/${currentUser.uid}/transactions/${transactionID}`)
      .set({
        type: 'outcome',
        amount: amount,
        name: 'Transfer',
        recipient: recipient.name,
        date: new Date().toISOString(),
        photoURL: recipient.photoURL || null,
      });

    const UpdateRecipientPromise = database
      .ref(`users/${recipient.id}/transactions/${transactionID}`)
      .set({
        type: 'income',
        amount: amount,
        name: 'Transfer',
        sender: currentUser.displayName,
        date: new Date().toISOString(),
        photoURL: currentUser.photoURL,
      });

    Promise.all([UpdateCurrUserPromise, UpdateRecipientPromise])
      .then(() => {
        setLoading(false);
        setSuccessMessage(true);
        setTimeout(() => {
          Router.push('/');
        }, 2000);
      })
      .catch(err => {
        setSuccessMessage(false);
        setError(err);
      });
  };

  const checkTransferValidity = e => {
    e.preventDefault();
    if (!selectedCard?.amount)
      return setError(
        'Something went wrong. Make sure you enter valid amount.'
      );

    if (selectedCard?.amount < amount)
      return setError(`You do not have ${formatAmount(amount)}. Request Loan.`);

    console.log(amount, selectedCard.amount);
    transferHandler();
  };

  let avatar = <h1>{recipient.name.slice(0, 1).toUpperCase()}</h1>;

  if (recipient.photoURL)
    avatar = (
      <Image
        height={100}
        width={100}
        src={recipient.photoURL}
        className="img"
      />
    );

  let errorMessage = '';
  if (error) errorMessage = <p className="error-message">{error}</p>;

  if (successMessage)
    return (
      <h1>Money has been successfully transfered. Redirecting in 2 seconds.</h1>
    );

  if (lodgin) return <Spinner absolute={false} />;

  return (
    <S.TransferForm>
      <S.Avatar>{avatar}</S.Avatar>
      <h2>{recipient.name || 'Stranger'}</h2>
      <h4>{recipient.email || 'Email unknown'}</h4>
      <S.Form onSubmit={checkTransferValidity}>
        <div className="amount">
          <label htmlFor="amount"> Amount</label>
          <input
            type="number"
            min="1"
            name="amount"
            className="input-amount"
            id="amount"
            onChange={e => setAmount(+e.target.value)}
            required
          />
        </div>
        {errorMessage}
        <S.BlueButton className="send">Send</S.BlueButton>
      </S.Form>
    </S.TransferForm>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
S.TransferForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 40px;

  .error-message {
    margin-bottom: 50px;
  }

  .amount {
    margin-top: 50px;
  }

  .send {
    margin-top: 0px;
  }

  h2 {
    margin: 10px 0 0 0 !important;
  }
`;

S.Avatar = styled.div`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  .img {
    border-radius: 50%;
  }

  h1 {
    color: #fff;
    margin: 0;
  }
`;

export default TransferForm;
