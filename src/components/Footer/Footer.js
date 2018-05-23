import React from 'react';
import styled from "styled-components";

import Logo from '../Header/Logo-white.svg';

const FooterSection = styled.section`
  align-items: center;
  background-color: #1f2022;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 100;
  height: 100px;
  justify-content: center;
`;

const FooterWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1200px;
`;

const AutorContent = styled.p`
  line-height: 1.4;
  width: 230px;
`;

const LogoImage = styled.img`
  width: 180px;
`;

const footer = () => (
  <FooterSection>
    <FooterWrapper>
      <AutorContent>
        Здесь могла быть Ваша реклама
      </AutorContent>
      <LogoImage alt='logo' src={Logo}/>
    </FooterWrapper>
  </FooterSection>
)

export default footer;
