import { useState } from 'react';
import Router from 'next/router';
import S from '../styles/styledComponents';
import Icon from './UI/Icon';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { database } from '../firebase';
import useAuth from '../context/AuthContext';
import Spinner from './UI/Spinner';
import styled from 'styled-components';

const SavingsItem = ({ savingsData, type }) => {
  const { currentUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [sliderGoal, setSliderGoal] = useState(savingsData?.goal || 10000);
  const [message, setMessage] = useState(null);
  const [confirmation, setConfirmation] = useState(false);

  const capitalize = (string) => string[0].toUpperCase() + string.slice(1);
  const buttonHandler = () => {
    if (Router.pathname !== '/savings') return Router.push('/savings');
    if (!editing) return setEditing(true);
    if (!confirmation) return setConfirmation(true);

    const goalProgress = type === 'investment' ? 'invested' : 'deposited';
    database
      .ref(`users/${currentUser.uid}/${type}`)
      .set({
        goal: sliderGoal,
        [goalProgress]: 0,
      })
      .then((res) => {
        setConfirmation(false);
        setMessage(
          `Your ${capitalize(type)} goal has been set. Redirecting in 2 seconds`
        );
        setTimeout(() => {
          Router.push('/');
        }, 2000);
      })
      .catch(() =>
        setMessage('Oops, something went wrong. Please try again later!')
      );

    setEditing(false);
  };

  const discardChanges = () => {
    setEditing(false);
    setSliderGoal(savingsData?.goal || 10000);
    setMessage(null);
    setConfirmation(false);
  };

  let info = (
    <h2 className='add-goal' onClick={buttonHandler}>
      Add new {capitalize(type)} Goal
    </h2>
  );

  let goalMessage = savingsData?.invested
    ? `$${savingsData?.invested || 0} invested so far!`
    : `$${savingsData?.deposited || 0} deposited so far!`;

  if (savingsData || editing)
    info = (
      <>
        <div className='money'>
          <h4>
            {savingsData ? '$ 0' : `What is your ${capitalize(type)} goal?`}
          </h4>
          <h3>$ {editing ? sliderGoal : savingsData.goal}</h3>
        </div>

        <Slider
          handleStyle={{
            border: editing && (type === 'investment' ? '#af52de' : '#2196f3'),
          }}
          trackStyle={{
            backgroundColor:
              editing && (type === 'investment' ? '#af52de' : '#2196f3'),
          }}
          railStyle={{
            backgroundColor:
              editing && (type === 'investment' ? '#cdb8d8' : '#2196f357'),
          }}
          min={0}
          max={100000}
          defaultValue={savingsData?.goal || 10000}
          step={5000}
          disabled={!editing}
          onChange={(value) => setSliderGoal(value)}
        />

        <div className='goal'>
          {savingsData && goalMessage && <p>{goalMessage}</p>}

          <S.EditButton onClick={buttonHandler}>
            {editing ? 'Save' : 'Edit'}
          </S.EditButton>
        </div>
      </>
    );

  if (message) info = <h2 className='message'>{message}</h2>;

  if (confirmation)
    info = (
      <S.Confirmation>
        <h3 className='confirm-title'>
          If you already have {capitalize(type)} goal, it will be overwriten.
        </h3>
        <h3>Are you sure you want to continue?</h3>
        <div className='buttons'>
          <S.BlueConfirmBtn onClick={buttonHandler}>Continue</S.BlueConfirmBtn>
          <S.RedConfirmBtn onClick={discardChanges}>Cancel</S.RedConfirmBtn>
        </div>
      </S.Confirmation>
    );

  return (
    <S.SavingsCard>
      <div className={`icon ${type}`}>
        <Icon
          type={
            type === 'investment'
              ? 'icon-investment'
              : 'icon-luggage-deposit-fill'
          }
        />
      </div>
      <div className='info'>
        <h3 className='price'>{capitalize(type)}</h3>
        {info}
      </div>
    </S.SavingsCard>
  );
};

export default SavingsItem;

// -------------------------------------------------- styling ----------------------------------------------
S.BlueConfirmBtn = styled.button`
  font-size: 20px;
  padding: 8px 18px;
  outline: 0;
  border: 0;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  color: #fff;
  border-radius: 5px;
  margin: 0 10px;
  margin-top: 20px;
  cursor: pointer;
`;

S.RedConfirmBtn = styled(S.BlueConfirmBtn)`
  background-color: red;
`;

S.Confirmation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .confirm-title {
    margin-top: 10px;
  }
`;
