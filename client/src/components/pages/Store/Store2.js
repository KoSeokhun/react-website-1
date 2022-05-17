import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios'
import React from "react";
import '../../App.css';

 
 
export default class Store2 extends React.Component{
  
  state = {
    loading: true
  }


  async componentDidMound() {
    const url = "http://openapi.seoul.go.kr:8088/514f7a704273656f36337046516a4d/xml/ListPriceModelStoreProductService/1/100";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results[0]);
  }
  
  
  
  render() {
    return (
      <div>
        {this.state.loading ? <div>loading...</div> : <div>person..</div>}
      </div>
    );
  }
}




