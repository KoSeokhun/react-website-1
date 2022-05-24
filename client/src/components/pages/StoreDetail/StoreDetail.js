import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, MAIN_IMAGE_URL, SHOP_IMAGE_URL } from '../../Config';
import MainImage from '../Store/Sections/MainImage'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import GridCards from '../Store/GridCards';
import { Row } from 'antd';
import Auth from '../../../hoc/auth';

function StoreDetail(props) {


  // let shopId = props.match.params.shopId
  const { shopId } = useParams();
  const { state } = useLocation();

  const [shopData, setShopData] = useState([])
  const [MainShopImage, setMainShopImage] = useState(null)
  const [CurrentPage, setCurrentPage] = useState(0)


  useEffect(() => {
    
    console.log('23 Line shopData : ' + JSON.stringify(state));
    setShopData(state);

    // let endpointInfo = `${API_URL}`


    // fetch(endpointInfo)
    //   .then(response => response.json())
    //   .then(response => {

    //     console.log(response.ListPriceModelStoreService.row);
    //     setShopdata(response.ListPriceModelStoreService.row.SH_ID);
    //     setMainShopImage('https://images.unsplash.com/photo-1526152505827-d2f3b5b4a52a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987')
    //     setCurrentPage(response.ListPriceModelStoreService.row.SH_ID)
    //   })


  }, [])





  return (
    <>
      <div style={{ width: '100%', margin: '0' }}>

        {/* Header */}

        {MainShopImage &&
          <MainImage
            image={`${SHOP_IMAGE_URL}`}

          />
        }

        {/* Body */}



        {/* store Info */}
        <div style={{ width: '95%', margin: '1rem auto' }}>



          {
            shopData &&
            <>
              <div style={{ width: '100%', margin: '0' }}>

                <img src={shopData.SH_PHOTO} />
              </div>
              <div className="box" key={shopData.SH_ID}>
                <div>가게 이름 : {shopData.SH_NAME}</div>
                <br></br>
                <div>주소 : {shopData.SH_ADDR}</div>
                <br></br>
                <div>가게 정보 : {shopData.SH_INFO}</div>
                <br></br>
                <div>업종 : {shopData.INDUTY_CODE_SE_NAME}</div>
                <br></br>
                <div>전화번호 : 02-{shopData.SH_PHONE}</div>
                <br></br>
                <div>찾아오시는 길 : {shopData.SH_WAY}</div>
                <br></br>
                <div>자랑거리 : {shopData.SH_PRIDE}</div>


              </div>
            </>


          }
        </div>

        <br />
        {/* Stores Grid */}


        {/* <Row gutter={[16, 16]} >

          {shopdata && shopdata.map((shop, index) => (
            <React.Fragment key={index}>
              <GridCards
                // image={shop.SH_PHOTO ?
                //   `${SHOP_IMAGE_URL}w500${shop.SH_PHOTO}` : null}
                // image={`${SHOP_IMAGE_URL}`}
                shopId={shop.SH_ID}
                shopName={shop.SH_NAME}
                shopInfo={shop.SH_INFO}
                shopAddr={shop.SH_ADDR}
              />
            </React.Fragment>

          ))}

        </Row> */}

        {/* <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
        <button> Toggle Store View</button>
      </div> */}






      </div>
    </>)
}

export default Auth(StoreDetail, null);
