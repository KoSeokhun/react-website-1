

import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, MAIN_IMAGE_URL, SHOP_IMAGE_URL } from '../../Config';
import MainImage from '../Store/Sections/MainImage'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import W_GridCards from '../Wtg/W_GridCards';
import { Row } from 'antd';
import Auth from '../../../hoc/auth';
import './WtgDetail.css';


function WtgDetail(props) {

    const { gongId } = useParams();
    const { state } = useLocation();
  
    const [gongData, setGongData] = useState([])
    const [MainShopImage, setMainShopImage] = useState(null)
   

    useEffect(() => {
    
        
        setGongData(state);


    }, [])



  return (
   
   
<>
      <div style={{ width: '100%', margin: '0' }}>

        {/* Header */}

        {/* {MainShopImage &&
          <MainImage
            image={`${SHOP_IMAGE_URL}`}

          />
        } */}

        {/* Body */}



        {/* store Info */}
        <div style={{ width: '95%', margin: '1rem auto' }}>



          {
            gongData &&
            <>
              <div align="center" style={{ width: '100%', margin: '0' }}>

                <img src={gongData.IMGURL} />
                
              </div>
              <br></br>
              <br></br>
              <div className="box" align="center" key={gongData.SVCID}>

                <table id="wtg_detail" align="center">

                  <tr>
                    <td className='wtg_detail_category'>공간 이름 </td>
                    <td>{gongData.PLACENM}</td>
                </tr>
                <tr>
                  <td className='wtg_detail_category'>공간 유형</td>
                  <td>{gongData.MINCLASSNM}</td>
                </tr>
                <tr>
                  <td className='wtg_detail_category'>전화번호</td>
                  <td>{gongData.TELNO}</td>
                </tr>
                <tr>
                  <td className='wtg_detail_category'>위치</td>
                  <td>{gongData.SVCNM}</td>
                </tr>
                <tr>
                  <td className='wtg_detail_category'>이용 시작</td>
                  <td>{gongData.V_MIN}</td>
                </tr>
                <tr>
                  <td className='wtg_detail_category'>이용 마감</td>
                  <td>{gongData.V_MAX}</td>
                </tr>
                <tr>
                  <td className='wtg_detail_category'>요금 유무</td>
                  <td>{gongData.PAYATNM}</td>
                </tr>
        

                </table>
              </div>

              
            </>


          }
        </div>

        <br />
       
      </div>
    </>)

}

export default Auth(WtgDetail, null);
