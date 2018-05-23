import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { selectBtc, selectEth } from 'ducks/currency';
import TradeOperations from '../TradeOperations';
import { selectWalletFrom } from 'ducks/wallet';
import TradeChart from '../TradeChart';
import TransactionsHistory from '../TransactionsHistory';
import {
  MainExchange,
  MainExchangeContainer,
  MainExchangeSectionOperations,
  MainExchangeWrapper,
  WalletInput,
  WalletInputContainer,
  WalletInputFloat,
  WalletInputInteger,
  WalletCointSign,
} from './Exchange.styles';

const COIN_SIGN_MAP = { usd: '$', btc: 'BTC', eth: 'ETH' };

class Exchange extends PureComponent {
  componentDidMount() {
    const { currency, selectBtc, selectEth } = this.props;
    currency === 'btc' ? selectBtc() : selectEth();
  }

  componentDidUpdate(prevProps) {
    const prevCurrency = prevProps.currency;
    const currency = this.props.currency;

    if (currency !== prevCurrency) {
      currency === 'btc' ? this.props.selectBtc() : this.props.selectEth();
    }
  }

  render() {
    const { wallet } = this.props;

    return (
      <MainExchange>
        <MainExchangeWrapper>
          <MainExchangeContainer>
            <MainExchangeSectionOperations>
              <h2>Ваш счет</h2>
              {Object.keys(COIN_SIGN_MAP).map(key => (
                <WalletField key={key} {...{ walletBalance: wallet[key], walletKey: key }} />
              ))}
              <TradeOperations />
            </MainExchangeSectionOperations>
            <section>
              <TradeChart />
              <TransactionsHistory />
            </section>
          </MainExchangeContainer>
        </MainExchangeWrapper>
      </MainExchange>
    );
  }
}

const WalletField = ({ walletBalance, walletKey }) => {
  const [walletInteger, ...walletFloat] = `${walletBalance}`.split('.');

  return (
    <WalletInputContainer>
      <WalletInput>
        <WalletInputInteger>{walletInteger}</WalletInputInteger>
        .
        <WalletInputFloat>{walletFloat.length > 0 ? walletFloat : 0}</WalletInputFloat>
      </WalletInput>
      <WalletCointSign>{COIN_SIGN_MAP[walletKey]}</WalletCointSign>
    </WalletInputContainer>
  );
};

const mapDispatchToProps = {
  selectBtc,
  selectEth,
};

const mapStateToProps = state => ({
  wallet: selectWalletFrom(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
