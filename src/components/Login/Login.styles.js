import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const LoginWrapper = styled.div`
  display: flex;
  width: 440px;
  height: 100vh;
  margin: 0 auto;
  z-index: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;

  img {
    width: 300px;
    height: 144px;
  }
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 7px;
  padding: 9px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 11px 0;
  position: relative;
  border: 1px solid #c3c3c3;

  &:before {
    border-radius: 7px;
    background: transparent;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    box-shadow: 0px 0px 68px 4px rgba(0, 0, 0, 0.23);
  }

  p {
    margin: 5px 0;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 20px;
`;

const SubmitButton = styled.button`
  margin: 10px 0;
  background-color: #4db6e2;
  color: #fff;
  border: none;
  font-size: 22px;
  padding: 12px 0;
  font-weight: 300;
  letter-spacing: 1.1px;
  cursor: pointer;
  width: 100%;
`;

export { LoginContainer, LoginWrapper, FormContainer, FormWrapper, SubmitButton }
