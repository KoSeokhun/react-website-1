import React from 'react'
import { Col } from 'antd';
import './W_GridCards.css';

import {Link} from 'react-router-dom';

function W_GridCards(props) {

    const gongData = props.gongData;
  return (
    <Col>


            <div style={{ position: 'relative' }}>
                <div className='gong-container'>
                    <div className='gong-row'>
                        <div className='gong'>

                            {/* <a href={`/store/${props.shopId}`} >
                                
                                <h1>{props.shopName}</h1>
                            </a> */}
                            <Link to={
                                `/wtg/${props.gongId}`}
                         state= {gongData}
                       // state= {{text: 'hello'}}
                            ><h1>{props.gongName}</h1></Link>
                            
                            <div className='gong-data'>
                                <p className='gong-info'>{props.gongInfo}</p>
                                <p className='gong-telno'>{props.gongTelno}</p>
                                <p className='gong-addr'>{props.gongAddr}</p>
                            </div>
</div>
                        </div>
                    </div>
                </div>
            
        </Col>
  )
}

export default W_GridCards
