import '../../App.css';
import HeroSection from '../HeroSection/HeroSection';
import Cards from '../commons/Cards/Cards';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';

function Home() {
    const navigate = useNavigate();

    const onClickHandler = () => {
        axios.get('api/users/logout')
            .then(response => {
                if (response.data.success) {
                    navigate('/sign-in');
                } else {
                    alert('로그아웃에 실패했습니다.');
                }
            })
    }

    return (
        <>
            <HeroSection />
            <Cards />
        </>
    );
}

export default Auth(Home, null);