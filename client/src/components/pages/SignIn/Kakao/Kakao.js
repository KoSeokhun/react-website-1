import React, { useState } from 'react';
import styled from 'styled-components';
import KaKaoLogin from 'react-kakao-login';
import { KAKAO_JAVASCRIPT_KEY } from '../../../Config';

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../../_actions/user_action";

const buttonBlock = {
    border: 'none',
    borderRadius: '9px',
    fontSize: '17px',
    width: '196px',
    fontWeight: '500',
    height: '32px',
    cursor: 'pointer',
    background: '#FEE500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 0px',
    margin: 'auto',
    marginTop: '0.7em',
};

const ButtonImage = styled.img`
  height: 1.2rem;
  margin-right: 0.7em;
  margin-left: 0.2em;
`;

const ButtoninnerText = styled.h3`
  margin: 0;
  font-size: 14px;
`;

const Kakao = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formErrorMessage, setFormErrorMessage] = useState('')

    const oAuthLoginHandler = (values) => {
        let dataToSubmit = {
            oAuthId: values.profile.id,
            name: values.profile.properties.nickname,
            Nickname: values.profile.properties.nickname,
            email: values.profile.kakao_account.email,
            image: values.profile.properties.profile_image,
        };

        dispatch(loginUser(dataToSubmit))
            .then(response => {
                if (response.payload.loginSuccess) {
                    window.localStorage.setItem('userId', response.payload.userId);
                    navigate('/');
                } else {
                    setFormErrorMessage('Check out your Account or Password again')
                }
            })
            .catch(err => {
                console.log(err);
                setFormErrorMessage('Check out your Account or Password again')
                setTimeout(() => {
                    setFormErrorMessage("")
                }, 3000);
            });
    }

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
                <ButtonImage src={require('../../commons/images/kakao/kakaolink_btn_small.png')} alt="naver" />
                <ButtoninnerText>카카오 로그인</ButtoninnerText>
            </KaKaoLogin>
            {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
            )}
        </>
    );
};
export default Kakao;