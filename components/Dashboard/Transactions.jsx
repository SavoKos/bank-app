import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import Icon from '../UI/Icon';

const Transactions = () => {
  return (
    <S.Transactions>
      <S.Header>
        <h1>All Transactions</h1>
        <S.Icons>
          <SearchOutlined />
          <Icon type="icon-sort" style={{ fontsize: '18px' }} />
        </S.Icons>
      </S.Header>
      <form>
        <S.Radio>
          <input type="radio" id="all" name="transactions" defaultChecked />
          <label htmlFor="all">All</label>
          <input type="radio" id="income" name="transactions" />
          <label htmlFor="income">Income</label>
          <input type="radio" id="outcome" name="transactions" />
          <label htmlFor="outcome">Outcome</label>
        </S.Radio>
      </form>
      <S.TransactionsList></S.TransactionsList>
    </S.Transactions>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Transactions = styled.div`
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

S.Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
S.Icons = styled.div`
  & > * {
    font-size: 20px;
    margin: 0 10px;
    color: #000;
    cursor: pointer;
  }
`;

S.Radio = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 3px;
  margin: 20px;
  border-radius: 30px;
  overflow: hidden;

  input[type='radio'] {
    position: absolute;
    visibility: hidden;
    display: none;

    &:checked + label {
      background-color: #fff;
      color: #000;
      box-shadow: 0px 10px 13px -5px rgba(0, 0, 0, 0.18);
    }
  }

  label {
    background-color: ${({ theme }) => theme.colors.primary};
    display: inline-block;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: bold;
    padding: 10px 40px;
    border-radius: 30px;
  }
`;

S.TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default Transactions;
