import '../../App.css';
import HeroSection from '../HeroSection/HeroSection';
import Cards from '../commons/Cards/Cards';
import React, { useEffect, useState } from 'react';
import Auth from '../../../hoc/auth';
import Store_Cards from '../commons/Cards/Store_Cards';


function Home() {
    const [shopdata, setShopdata] = useState([])
    return (
        <>
            <HeroSection />
            <Cards />
          
        </>
    );
}

export default Auth(Home, null);