import React from 'react';
import styled from 'styled-components';
import KaKaoLogin from 'react-kakao-login';
import { KAKAO_JAVASCRIPT_KEY } from '../../../Config';

const buttonBlock = {
    border: 'none',
    borderRadius: '9px',
    fontSize: '17px',
    width: '284px',
    fontWeight: '500',
    height: '32px',
    cursor: 'pointer',
    background: '#fae101',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: '4px 0px',
};

const ButtoninnerText = styled.h3`
  margin: 0;
  font-size: 14px;
`;

const Kakao = ({ oAuthLoginHandler }) => {
    return (
        <>
            <KaKaoLogin
                token={KAKAO_JAVASCRIPT_KEY}
                buttonText="kakao"
                onSuccess={oAuthLoginHandler}
                onFail={console.error}
                onLogout={console.info}
                style={buttonBlock}
            >
                <ButtoninnerText>카카오 계정으로 로그인</ButtoninnerText>
            </KaKaoLogin>
        </>
    );
};
export default Kakao;