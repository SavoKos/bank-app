import { useState } from 'react';
import Router from 'next/router';
import S from '../../styles/styledComponents';
import Icon from '../UI/Icon';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { database } from '../../firebase';
import useAuth from '../../context/AuthContext';
import Spinner from '../UI/Spinner';

const SavingsItem = ({ savingsData, type }) => {
  console.log(savingsData);
  const { currentUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [sliderGoal, setSliderGoal] = useState(savingsData?.goal || 0);
  const [message, setMessage] = useState(null);

  const capitalize = string => string[0].toUpperCase() + string.slice(1);
  const buttonHandler = () => {
    Router.push('/savings');
    if (!editing) return setEditing(true);

    const goalProgress = type === 'investment' ? 'invested' : 'deposited';
    database
      .ref(`users/${currentUser.uid}/${type}`)
      .set({
        goal: sliderGoal,
        [goalProgress]: 0,
      })
      .then(() => {
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

  let info = (
    <h2 className="add-goal" onClick={buttonHandler}>
      Add new {capitalize(type)} Goal
    </h2>
  );

  let goalMessage = savingsData?.invested
    ? `$${savingsData?.invested || 0} invested so far!`
    : `$${savingsData?.deposited || 0} deposited so far!`;

  if (savingsData || editing)
    info = (
      <>
        <div className="money">
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
          onChange={value => setSliderGoal(value)}
        />

        <div className="goal">
          {savingsData && goalMessage && <p>{goalMessage}</p>}

          <S.EditButton onClick={buttonHandler}>
            {editing ? 'Save' : 'Edit'}
          </S.EditButton>
        </div>
      </>
    );

  if (message) info = <h2 className="message">{message}</h2>;

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
      <div className="info">
        <h3>{capitalize(type)}</h3>
        {info}
      </div>
    </S.SavingsCard>
  );
};

// -------------------------------------------------- styling ----------------------------------------------

export default SavingsItem;
