import Router from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from '../components/Head';
import Navigation from '../components/Navigation';
import Card from '../components/UI/Card';
import Icon from '../components/UI/Icon';
import Spinner from '../components/UI/Spinner';
import useAuth from '../context/AuthContext';
import { database } from '../firebase';
import S from '../styles/styledComponents';

const cardeditor = () => {
  const [provider, setProvider] = useState('Visa');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const [successMessage, setSuccessMessage] = useState('');
  const [editDisabled, setEditDisabled] = useState(false);
  const [fetchedCards, setFetchedCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    database
      .ref(`users/${currentUser?.uid}/cards`)
      .get()
      .then((snap) => {
        setLoading(false);

        if (!snap.val()) return;
        if (Object.keys(snap.val()).length > 4) {
          setEditDisabled(true);
          setError('You already have 5 credit cards!');
        }
        setSuccessMessage('');
        setFetchedCards(Object.keys(snap.val()));
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const saveChanges = (e) => {
    e.preventDefault();

    if (number.replaceAll(' ', '').length !== 16)
      return setError('Card Number must contain 16 digits!');

    setLoading(true);
    database
      .ref(`users/${currentUser?.uid}/cards/${number}`)
      .set({
        amount: 10000,
        provider: provider,
        number: number,
        name: currentUser?.displayName,
      })
      .then(() => {
        setLoading(false);
        setSuccessMessage('Card changes have been applied.');
        setTimeout(() => {
          Router.push('/');
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        setError(error);
      });
  };

  const removeCard = () => {
    const cardNumExists = fetchedCards?.find(
      (fetchedNum) => fetchedNum === number
    );

    if (!cardNumExists)
      return setError("Card with this card number doesn't exist");

    setLoading(true);
    database
      .ref(`users/${currentUser?.uid}/cards/${number}`)
      .remove()
      .then((res) => {
        setLoading(false);
        setSuccessMessage('Card is successfully removed.');
        setTimeout(() => {
          Router.push('/');
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  const errorMessage = error ? <p className='error'>{error}</p> : null;

  if (successMessage)
    return (
      <>
        <Head title='Card Editor' />
        <S.EditorContainer>
          <h1 className='success'>
            {successMessage + ' Redirecting in 2 seconds...'}
          </h1>
        </S.EditorContainer>
      </>
    );

  if (loading)
    return (
      <>
        <Head title='Card Editor' /> <Spinner />
      </>
    );

  return (
    <>
      <Head title='Card Editor' />

      <S.Container>
        <Navigation />
        <S.EditorContainer>
          <Card
            isEditing={true}
            className='card'
            number={number}
            provider={provider}
          />

          <h1 className='success'>{successMessage}</h1>
          <S.Form className='editor' onSubmit={saveChanges}>
            <div>
              <label htmlFor='card-number'>
                Card Number (must contain 16 numbers)
              </label>
              <input
                id='ccn'
                type='tel'
                inputMode='numeric'
                name='card-number'
                pattern='[0-9\s]{16}'
                autoComplete='cc-number'
                maxLength='16'
                placeholder='Number of card you want to edit or add (must contain 16 numbers)'
                className='input-number'
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
            <S.SelectContainer>
              <select
                name='card-number'
                onChange={(e) => setProvider(e.target.value)}
              >
                <option>Visa</option>
                <option>Master Card</option>
                <option>American Express</option>
              </select>
              <Icon type='icon-arrow-left-c-copy' className='arrow' />
            </S.SelectContainer>
            {errorMessage}
            <div className='buttons'>
              <S.BlueButton className='save-btn' disabled={editDisabled}>
                Save
              </S.BlueButton>
              <a onClick={removeCard}>Remove Card</a>
            </div>
          </S.Form>
        </S.EditorContainer>
      </S.Container>
    </>
  );
};

export default cardeditor;

// -------------------------------------------------- styling ----------------------------------------------
S.EditorContainer = styled.div`
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(90, 92, 106, 1) 0%,
    rgba(32, 45, 58, 1) 81.3%
  );
  width: 100%;
  border-radius: 30px 0 0 30px;
  height: 100vh;
  padding: 50px;

  .error {
    color: #ff4f4f;
    font-weight: 400;
  }

  .success {
    text-align: center;
    color: #fff;
    margin-top: 50px;
  }

  .editor {
    max-width: 50%;
    padding: 50px 0 20px 0;
    margin: auto;

    @media (max-width: 768px) {
      max-width: 100%;
    }

    .buttons {
      a {
        margin-left: 20px;
        color: ${({ theme }) => theme.colors.lightBlue};
        cursor: pointer;
        &:active,
        &:hover {
          text-decoration: underline;
        }
      }

      .save-btn {
        margin-top: -10px;

        &:disabled,
        &[disabled] {
          background-color: #989ea6;
          cursor: not-allowed;
        }
      }
    }
  }

  .card {
    margin: auto;
    width: 440px;
    cursor: default;

    @media (max-width: 576px) {
      width: unset;
    }
  }
`;

S.SelectContainer = styled.div`
  select {
    display: block;
    padding: 1.5em 2em;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 5px;
    appearance: none;
    font-weight: 600;
    border: none;
    outline: none;
    color: #fff;
    cursor: pointer;

    * {
      color: #fff;
      font-size: 16px;
    }
  }

  .arrow {
    pointer-events: none;
    touch-action: none;
    position: absolute;
    right: 25px;
    top: 40px;
    color: #fff;
  }
`;
