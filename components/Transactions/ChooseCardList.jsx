import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAuth from '../../context/AuthContext';
import { database } from '../../firebase';
import S from '../../styles/styledComponents';
import Card from '../UI/Card';
import Spinner from '../UI/Spinner';
import LoanAmount from './Loan/LoanAmount';
import TransferForm from './Transfer/TransferForm';

const ChooseCardList = ({
  goBack,
  selectedLoan,
  recipient,
  transactionType = 'loan',
}) => {
  const [fetchedCards, setFetchedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  console.log(selectedCard);

  useEffect(() => {
    database
      .ref(`users/${currentUser.uid}/cards`)
      .get()
      .then(res => {
        const cardsList = [];
        const fetchedUser = res.val();
        setLoading(false);

        if (fetchedUser)
          for (const [key, value] of Object.entries(fetchedUser)) {
            cardsList.push(value);
          }

        setFetchedCards(cardsList !== [] ? cardsList : null);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (selectedCard?.length !== 0 && transactionType === 'loan')
    return (
      <LoanAmount
        selectedLoan={selectedLoan}
        setSelectedCard={setSelectedCard}
        selectedCard={selectedCard}
      />
    );

  if (selectedCard?.length !== 0 && transactionType === 'transfer')
    return (
      <>
        <div className="header">
          <h1>Transfer</h1>
          <p onClick={() => setSelectedCard('')}>Back to Cards</p>
        </div>
        <TransferForm recipient={recipient} selectedCard={selectedCard} />
      </>
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
        <h1>{'Choose Card'}</h1>
        <p onClick={() => goBack(null)}>Back</p>
      </div>
      <S.LoanOption>
        {fetchedCards.map(card => (
          <Card
            onClick={() => setSelectedCard(card)}
            isEditing={true}
            className="loan-card"
            key={card.number}
            amount={card.amount}
            provider={card.provider}
            number={card.number}
          />
        ))}
      </S.LoanOption>
    </S.Loan>
  );
};

export default ChooseCardList;

// -------------------------------------------------- styling ----------------------------------------------
S.Loan = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    width: 100%;

    h1 {
      padding-left: 25px;
    }

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

  .loan-card {
    margin-bottom: 20px;
    transition: 0.3s all ease;
    cursor: pointer;

    h2 {
      font-size: 20px;
    }

    &:hover {
      transition: 0.3s all ease;
      box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
    }
  }

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
