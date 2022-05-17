import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios'
import React from "react";
import '../../App.css';

 
 
export default function Store_api() {
    const [coins, setCoins] = useState([]);
 
    useEffect(() => {
      axios.get('http://openapi.seoul.go.kr:8088/514f7a704273656f36337046516a4d/xml/ListPriceModelStoreProductService/1/100')
    .then(res => {
      setCoins(res.data);
    })
    .catch(error => console.log(error));
    }, []);


    return (
        <div className='coin-app'>
          <div className='coin-search'>
            <h1 className='coin-text'>Search a currency</h1>
            <form>
              <input type='text' placeholder='Search'
              className='coin-input' />
            </form>
          </div>
        </div>
      );


    // return <h1 className='store'>
    //     <Store_Cards/>
    // </h1>;
}



