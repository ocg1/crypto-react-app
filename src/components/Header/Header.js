import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Logo from './Logo-white.svg';
import SelectCurrencyButton from '../SelectCurrencyButton';
import { selectUserEmailFrom } from 'ducks/user';

const CURRENCIES = ['btc', 'eth'];

const HeaderApp = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2b2c2e;
  height: 80px;
  color: #fff;
`;

const LogoImage = styled.img`
  width: 180px;
`;

const HeaderWrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none;
    div {
      color: #aaa;
      cursor: pointer;
    }
  }
`;

const HeaderPanel = styled.div`
  display: flex;
  flex-direction: row;
`;

const header = ({ email }) => (
  <HeaderApp>
    <HeaderWrapper>
      <LogoImage alt="logo" src={Logo} />
      <HeaderPanel>
        {CURRENCIES.map(currency => <SelectCurrencyButton {...{ key: currency, currency }} />)}
      </HeaderPanel>
      <span>{email}</span>
    </HeaderWrapper>
  </HeaderApp>
);

const mapStateToProps = state => ({
  email: selectUserEmailFrom(state),
});

export default connect(mapStateToProps)(header);
