import styled from 'styled-components';
import Image from 'next/image';

const Transaction = () => {
  return (
    <S.Transaction>
      <div className="left">
        <Image
          src="/navigationLogo.png"
          height={35}
          width={35}
          layout="fixed"
          className="img"
        />
        <div className="info">
          <h4>Netflix</h4>
          <h5>23.08.2021</h5>
        </div>
      </div>
      <div className="right">
        <h4>$16.000</h4>
        <h5>Income</h5>
      </div>
    </S.Transaction>
  );
};

export default Transaction;

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Transaction = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0 30px;

  h5 {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.secondary};
  }

  .left {
    display: flex;
    align-items: center;
    .img {
      border-radius: 50%;
    }

    .info {
      margin-left: 25px;
    }
  }
`;
