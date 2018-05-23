import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getSelectedCurrency, getBtcSellPrice, getEthSellPrice } from "ducks/currency";

const CurrencyButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 80px;
  justify-content: center;
  margin: 0 8px;
  text-decoration: none;
  cursor: auto;
  color: white;
`;

const selectCurrencyButton = ({ currency, selectedCurrency, ...fns }) => {
  if (selectedCurrency === currency) return buttonWrapper(currency, fns)

  return <Link to={`/exchange/${currency}`}>{buttonWrapper(currency, fns)}</Link>;
}

const buttonWrapper = (currency, fns) => (
  <CurrencyButton>
    {fns[`${currency}Price`]}
    <b>{`1 ${currency.toUpperCase()}`}</b>
  </CurrencyButton>
);

const mapStateToProps = state => ({
  selectedCurrency: getSelectedCurrency(state),
  btcPrice: getBtcSellPrice(state),
  ethPrice: getEthSellPrice(state),
});

export default connect(mapStateToProps)(selectCurrencyButton);
