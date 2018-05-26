import styled from 'styled-components';

const MainExchange = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100% - 80px);
  margin-bottom: -100px;
  background-color: #f2f3f5;
  &:after {
    content: '';
    display: block;
    height: 100px;
  }
`;

const MainExchangeWrapper = styled.div`
  width: 1200px;
  padding-top: 10px;
`;

const MainExchangeContainer = styled.article`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

const MainExchangeSectionOperations = styled.section`
  width: 450px;

  h2 {
    margin-bottom: 10px;
  }
`;

const WalletInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 298px;
`;

const WalletInput = styled.div`
  background-color: #414244;
  border: 1px solid #000;
  color: #ffffff;
  border-radius: 4px;
  padding: 6px 0;
  flex: 1 1 150px;
  margin: 5px 0;
`;

const WalletInputInteger = styled.span`
  width: 55%;
  display: inline-block;
  text-align: right;
`;

const WalletInputFloat = styled.span`
  color: #8a8a8a;
  max-width: 78px;
  display: inline-block;
  vertical-align: bottom;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const WalletCointSign = styled.p`
  flex: 1 1;
  text-align: left;
  margin: 15px 0 0 15px;
`;

export {
  MainExchange,
  MainExchangeContainer,
  MainExchangeSectionOperations,
  MainExchangeWrapper,
  WalletInput,
  WalletInputContainer,
  WalletInputFloat,
  WalletInputInteger,
  WalletCointSign,
};
