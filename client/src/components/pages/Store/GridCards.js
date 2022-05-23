import React from 'react'
import { Col } from 'antd';
import './GridCards.css';


function GridCards(props) {
    return (

        <Col lg={6} md={8} xs={24}>


            <div style={{ position: 'relative' }}>
                <div className='shop-container'>
                    <div className='shop-row'>
                        <div className='shop'>

                            <a href={`/store/${props.shopId}`} >
                                {/* <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.shopName} /> */}
                                <h1>{props.shopName}</h1>
                            </a>
                            <div className='shop-data'>
                                <p className='shop-info'>{props.shopInfo}</p>
                                <p className='shop-addr'>{props.shopAddr}</p>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default GridCards
