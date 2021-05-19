import styled from 'styled-components';
import Deposit from './Deposit';
import Investment from './Investment';

const Savings = () => {
  return (
    <S.Savings>
      <h1>Savings</h1>
      <Deposit />
      <Investment />
    </S.Savings>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Savings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 40px;

  > div {
    margin-top: 20px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    padding: 30px;
    background: ${({ theme }) => theme.colors.primary};
    width: 100%;

    .icon {
      background-color: ${({ theme }) => theme.colors.lightBlue};
      min-height: 130px;
      border-radius: 10px;
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.investment {
        background-color: ${({ theme }) => theme.colors.purple};
      }
      .anticon {
        color: #fff;
      }
    }

    .info {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      align-self: flex-start;
      width: 100%;
      .money {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0 20px 0;
      }

      .progressbar {
        width: 100%;
        position: relative;
        background-color: #2196f357;
        height: 8px;
        transition: 0.3s all ease;
        border-radius: 50px;

        .fill {
          width: 50%;
          position: absolute;
          border-radius: 50px;
          top: 0;
          left: 0;
          height: 8px;
          transition: 0.3s all ease;
          background-color: ${({ theme }) => theme.colors.lightBlue};
        }

        &.investment {
          background-color: #af52de57;
          .fill {
            background-color: ${({ theme }) => theme.colors.purple};
          }
        }
      }

      .goal {
        margin-top: 20px;
      }

      h4 {
        color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
`;
export default Savings;
