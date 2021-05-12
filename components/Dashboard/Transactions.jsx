import styled from 'styled-components';
import { createFromIconfontCN, SearchOutlined } from '@ant-design/icons';

const Icon = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_2539603_sr0jbo99sg.js'],
});

const Transactions = () => {
  return (
    <StyledTransactions>
      <StyledHeader>
        <h1>All Transactions</h1>
        <StyledIcons>
          <SearchOutlined />
          <Icon type="icon-sort" />
        </StyledIcons>
      </StyledHeader>
      <form>
        <StyledRadio>
          <input type="radio" id="option-one" name="selector" defaultChecked />
          <label htmlFor="option-one">One</label>
          <input type="radio" id="option-two" name="selector" />
          <label htmlFor="option-two">Two</label>
          <input type="radio" id="option-three" name="selector" />
          <label htmlFor="option-three">Three</label>
        </StyledRadio>
      </form>
      <StyledTransactionList></StyledTransactionList>
    </StyledTransactions>
  );
};

const StyledTransactions = styled.div`
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const StyledIcons = styled.div`
  & > * {
    font-size: 20px;
    margin: 0 10px;
    color: #000;
    cursor: pointer;
  }
`;

const StyledRadio = styled.div`
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

const StyledTransactionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default Transactions;
