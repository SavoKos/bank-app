import { useState } from 'react';
import styled from 'styled-components';
import useAuth from '../../../context/AuthContext';
import { database } from '../../../firebase';
import S from '../../../styles/styledComponents';
import TransferForm from './TransferForm';
import UserCard from './UserCard';

const SendMoney = () => {
  const [users, setUsers] = useState({});
  const [chosenUser, setChosenUser] = useState('');
  const [name, setName] = useState('');
  const { currentUser } = useAuth();

  const updateInputValueHandler = e => {
    setName(e.target.value);
  };

  const selectUser = userData => {
    setChosenUser(userData);
    setUsers({});
  };

  const searchHandler = e => {
    e.preventDefault();
    database
      .ref('users')
      .get()
      .then(snapshot => {
        if (!snapshot.exists()) throw new Error('No data available');
        const data = snapshot.val();
        for (const prop in data) {
          const searchedUserName = data[prop].name.toLowerCase();
          if (
            searchedUserName.includes(name.toLowerCase()) &&
            data[prop].email != currentUser.email
          )
            setUsers(prevUsers => {
              return { ...prevUsers, [prop]: data[prop] };
            });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  let displayUsers = [];
  if (users) {
    for (const prop in users) {
      console.log(users[prop]);
      displayUsers.push(
        <UserCard
          userData={users[prop]}
          key={prop}
          clicked={userData => selectUser(userData)}
        />
      );
    }
  }

  if (chosenUser)
    return (
      <S.SendMoney>
        <div className="header">
          <h1>Send Money</h1>
          <p onClick={() => setChosenUser('')}>Back to Search</p>
        </div>
        <TransferForm user={chosenUser} />
      </S.SendMoney>
    );

  return (
    <S.SendMoney>
      <h1>Send Money</h1>
      <S.Form onSubmit={searchHandler}>
        <div>
          <input
            type="text"
            name="name"
            value={name}
            className="input-name"
            onChange={event => updateInputValueHandler(event)}
            placeholder="Enter name of user to transfer money"
            required
          />
        </div>
        <S.BlueButton className="search">Search</S.BlueButton>
      </S.Form>
      {displayUsers}
    </S.SendMoney>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
S.SendMoney = styled.div`
  margin: 0 40px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 60px;

    p {
      color: ${({ theme }) => theme.colors.lightBlue};
      margin-right: 20px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  h2 {
    margin: 50px 0 20px 0;
    text-align: center;
  }
`;

S.Form = styled(S.Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100% !important;

  div {
    width: 80%;
  }

  .search {
    margin: 0 0 50px 0;
  }
`;
export default SendMoney;
