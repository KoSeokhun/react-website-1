import React from 'react'
import { useLocation } from 'react-router-dom';
import Scraping from '../../commons/Scraping/Scraping';

function Information() {
    const location = useLocation();
    console.log(decodeURI(location.search));
    // pathname: "/recruitment/information"
    // search: "?searchword=%ED%81%AC%EB%A6%AC%EC%97%90%EC%9D%B4%ED%84%B0"
    Scraping();


    return (
        <div>Information</div>
    )
}

export default Information