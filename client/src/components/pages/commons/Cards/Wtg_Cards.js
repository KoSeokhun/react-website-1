import React from 'react'
import CardItem from '../CardItem/CardItem'
import './Cards.css';
// import GridCards from './GridCards';
// import { Row } from 'antd';

function Cards(props) {
    // console.log('shopdata 0 : '+ JSON.stringify(props.shopdata[0]))
    // console.log('shopdata 1 : '+ JSON.stringify(props.shopdata[1]))
    // console.log('shopdata 2 : '+ JSON.stringify(props.shopdata[2]))
    return (
        <div className='cards'>
            <h1>서울시에서 무료로 제공하는 와이파이/따릉이/공간 정보를 둘러보세요!</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    {/* 추가 */}
                    <ul className='cards__items'>
                        <CardItem
                            src={require('../images/img-37.jpg')}
                            text='서울시에서 제공하는 무료 와이파이를 이용 해 보세요.'
                            label='와이파이'
                            path='/wtg/'
                            //data={props.gongdata[0]}
                        />
                        <CardItem
                            src={require('../images/img-38.jpg')}
                            text='실시간 따릉이 위치 정보입니다.'
                            label='따릉이'
                            path='/wtg/'
                            //data={props.gongdata[1]}
                        />
                        <CardItem
                            src={require('../images/img-39.jpg')}
                            text='청년들을 위한 스터디 룸을 이용해 보세요.'
                            label='스터디 룸'
                            path='/wtg/'
                            //data={props.gongdata[2]}
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards