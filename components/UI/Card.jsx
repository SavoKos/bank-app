import styled from 'styled-components';
import Icon from './Icon';
import useAuth from '../../context/AuthContext';

const Card = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <S.Card>
      <h4>Excellence Holdings</h4>
      <div className="card-number">
        <Icon type="icon-chip" className="chip" />
        <h2>3402 2424 3262 5628</h2>
      </div>
      <div className="holdermoney">
        <h2>
          {currentUser.displayName ? currentUser.displayName : 'Stranger'}
        </h2>
        <h2>$ 150.000</h2>
      </div>

      <Icon type="icon-visa1" className="visa" />
    </S.Card>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Card = styled.div`
  border-radius: 30px;
  padding: 20px;
  position: relative;
  min-height: 250px;
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: rgb(222, 82, 221);
  background: linear-gradient(
    45deg,
    rgba(222, 82, 221, 1) 18%,
    rgba(33, 143, 243, 1) 56%,
    rgba(52, 84, 255, 1) 100%
  );

  h4 {
    letter-spacing: 1px;
  }

  h1 {
    color: #fff;
    letter-spacing: 3px;
  }

  .holdermoney {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .card-number {
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
    justify-content: space-between;

    .chip {
      font-size: 40px !important;
    }

    h2 {
      font-family: 'Big Shoulders Display';
      letter-spacing: 7px;
    }
  }

  .visa {
    font-size: 50px !important;
    position: absolute;
    top: 7px;
    right: 20px;
    color: #fff;
  }
`;

export default Card;
