import React, { useEffect, useState } from "react";
import '../../App.css';
import Store_Cards from '../commons/Cards/Store_Cards';
import Store_Cards2 from '../commons/Cards/Store_Cards2';
import MainImage from './Sections/MainImage';
import { API_URL, API_KEY, MAIN_IMAGE_URL, SHOP_IMAGE_URL } from '../../Config';
import GridCards from './GridCards';
import { Row } from 'antd';


export default function Store() {

  const [shopdata, setShopdata] = useState([])
  const [MainShopImage, setMainShopImage] = useState(null)
  const [CurrentPage, setCurrentPage] = useState(0)


  useEffect(() => {


    const endpoint = `http://openapi.seoul.go.kr:8088/44776f494b73656f3830706d565461/json/ListPriceModelStoreService/1/50/`;

    fetchShops(endpoint)


  }, [])
  

  

  const fetchShops = (endpoint) => {
    fetch(endpoint)
      .then(response => response.json())
      .then(response => {

        //console.log(response.ListPriceModelStoreService);
        setShopdata(response.ListPriceModelStoreService.row);
        setMainShopImage('https://images.unsplash.com/photo-1455849318743-b2233052fcff?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2338')
        setCurrentPage(response.ListPriceModelStoreService.row)

        // setMovies([...Movies, ...response.results])
        // setMainMovieImage(response.results[0])
        // setCurrentPage(response.page)


      })

  }



  const loadMoreShops = () => {

    const endpoint = `http://openapi.seoul.go.kr:8088/44776f494b73656f3830706d565461/json/ListPriceModelStoreService/1/100/`;
    fetchShops(endpoint)

  }





  return (

    <div style={{ width: '100%', margin: '0' }}>


      {/* // <div className='shop'> */}


      {MainShopImage &&
        <MainImage
          image={`${MAIN_IMAGE_URL}`}

        />
      }

    { shopdata && <Store_Cards shopdata={shopdata}/>}

      <div style={{ width: '85%', margin: '1rem auto' }}>

        <center><h2>착한가게 리스트</h2></center>
        <hr />
        {/* {
          shopdata && shopdata.map(record => {

            return (



              <div className="box" key={record.SH_ID}>
                <div>{record.SH_NAME}</div>
                <div>{record.SH_ADDR}</div>


                <div> {record.SH_INFO}</div>

                <div> {record.SH_PHOTO}</div>
              </div>

            )
          })
        } */}


        <Row gutter={[16, 16]} >

          {shopdata && shopdata.map((shop, index) => (
            //console.log('line 109 shop : ' + JSON.stringify(shop)),
            <React.Fragment key={index}>
              <GridCards
                // image={shop.SH_PHOTO ?
                //   `${SHOP_IMAGE_URL}w500${shop.SH_PHOTO}` : null}
                // image={`${SHOP_IMAGE_URL}`}
                shopData={shop}
                shopId={shop.SH_ID}
                shopName={shop.SH_NAME}
                shopInfo={shop.SH_INFO}
                shopAddr={shop.SH_ADDR}
              />
            </React.Fragment>

          ))}

        </Row>


      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>

        <button onClick={loadMoreShops}> Load More</button>
      </div>





    </div>

  );
}