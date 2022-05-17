import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { fetchData } from "../../../../_actions/data_action";
import Scraping from '../../commons/Scraping/Scraping';

function Information() {
    const dispatch = useDispatch();
    const location = useLocation();
    console.log('갖고온 파라미터 : ' + decodeURI(location.search));

    // pathname: "/recruitment/information"
    // 사람인 search: "?searchword=소프트웨어+개발자"
    // 잡코리아 search: "?searchword=소프트웨어%20개발자"

    // 소프트웨어 개발자 + 서울전체 + 연봉 3000 이상
    // 사람인 : https://www.saramin.co.kr/zf_user/ 
    //search?searchType=search&company_cd=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C9%2C10&loc_mcd=101000&sal_min=11&keydownAccess= 
    //&searchword=소프트웨어+개발자&panel_type=&search_optional_item=y&search_done=y&panel_count=y&abType=b

    // 잡코리아 : https://www.jobkorea.co.kr/Search/ 
    //?stext=소프트웨어%20개발자&local=I000&payType=1&payMin=3000

    const [Career, setCareer] = useState(decodeURI(location.search))
    const [Location, setLocation] = useState(null);
    const [Salary, setSalary] = useState(null);

    const scrapJobkorea = () => {
        try {
            const dataToSubmit = {
                stext: Career,
                local: Location,
                payMin: Salary,
            }

            return Scraping(dataToSubmit);
        }
        catch (err) {
            console.error(err);
        }
    };

    const [SaraminData, setSaraminData] = useState([]);
    const [JobkoreaData, setJobkoreaData] = useState([]);
    const dataToSubmit = {
        stext: Career,
        local: Location,
        payMin: Salary,
    }
    useEffect(() => {
        function fetchSaraminData(dataToSubmit) {
            dispatch(fetchData(dataToSubmit))
                .then(res => { console.log(res); return JSON.stringify(res.payload.data) })
                .then(data => {
                    console.log(data);
                    setSaraminData(data);
                })

        }
        // setData(dataToSubmit)
    }, [Career, Location, Salary]);

    return (
        <>
            <div>Information</div>
            {SaraminData && (<div>{SaraminData}</div>)}
        </>
    )
}

export default Information