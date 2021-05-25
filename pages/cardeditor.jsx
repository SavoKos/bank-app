import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/UI/Card';
import Icon from '../components/UI/Icon';
import useAuth from '../context/AuthContext';
import { database } from '../firebase';
import S from '../styles/styledComponents';

const cardeditor = ({ savo }) => {
  console.log(savo);
  const [isEditing, setIsEditing] = useState(true);
  const [provider, setProvider] = useState('Visa');
  const [number, setNumber] = useState('');
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    database
      .ref(`users/${currentUser.uid}/cards`)
      .get()
      .then(snap => {
        setSuccessMessage('');
        setError(null);
        console.log(snap.val());
        if (!snap.val()) return;
      })
      .catch(err => console.log(err));
  }, []);

  const saveChanges = e => {
    e.preventDefault();
    database
      .ref(`users/${currentUser.uid}/cards/${number}`)
      .set({
        amount: 10000,
        provider: provider,
        number: number,
        name: currentUser.displayName,
      })
      .then(() => {
        setSuccessMessage('Card changes have been applied');
      })
      .catch(err => console.log(err));
    setIsEditing(false);
    setError(null);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setSuccessMessage('');
    setError(null);
  };

  const errorMessage = error ? <p className="error">{error}</p> : null;

  console.log(provider);
  return (
    <S.EditorContainer>
      <Card
        isEditing={isEditing}
        className="card"
        number={number}
        provider={provider}
        enableEditing={enableEditing}
      />

      {successMessage ? (
        <h1 className="success">{successMessage}</h1>
      ) : (
        <S.Form className="editor" onSubmit={saveChanges}>
          <div>
            <label htmlFor="card-number"> Card Number</label>
            <input
              id="ccn"
              type="tel"
              inputMode="numeric"
              name="card-number"
              pattern="[0-9\s]{19}"
              autoComplete="cc-number"
              maxLength="19"
              placeholder="xxxx xxxx xxxx xxxx"
              className="input-number"
              onChange={e => setNumber(e.target.value)}
            />
          </div>
          <S.SelectContainer>
            <select
              name="card-number"
              onChange={e => setProvider(e.target.value)}
            >
              <option>Visa</option>
              <option>Master Card</option>
              <option>American Express</option>
            </select>
            <Icon type="icon-arrow-left-c-copy" className="arrow" />
          </S.SelectContainer>
          {errorMessage}
          <div>
            <S.BlueButton className="save-btn">Save</S.BlueButton>
          </div>
        </S.Form>
      )}
    </S.EditorContainer>
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

    .save-btn {
      margin-top: -10px;
    }
  }

  .card {
    margin: auto;
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
