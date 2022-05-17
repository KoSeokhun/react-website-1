import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { fetchData } from "../../../../_actions/data_action";

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

    const [Career, setCareer] = useState(location.search);
    const [Location, setLocation] = useState('');
    const [Salary, setSalary] = useState('');

    const [SaraminData, setSaraminData] = useState([]);
    const [JobkoreaData, setJobkoreaData] = useState([]);

    useEffect(() => {
        const dataToSubmit = {
            site: 'saramin',
            searchword: Career,
            loc_mcd: Location,
            sal_min: Salary,
        }
        function fetchSaraminData(dataToSubmit) {
            dispatch(fetchData(dataToSubmit))
                .then(res => { console.log(res); return res.payload.data })
                .then(data => {
                    console.log(data[0]);
                    setSaraminData(data[0].title);
                })

        }
        fetchSaraminData(dataToSubmit);
    }, [Career, Location, Salary]);

    useEffect(() => {
        const dataToSubmit = {
            site: 'jobkorea',
            stext: Career,
            local: Location,
            payMin: Salary,
        }
        function fetchJobkoreaData(dataToSubmit) {
            dispatch(fetchData(dataToSubmit))
                .then(res => { console.log(res); return res.payload.data })
                .then(data => {
                    console.log(data[0]);
                    setJobkoreaData(data[0].title);
                })

        }
        fetchJobkoreaData(dataToSubmit);
    }, [Career, Location, Salary]);

    return (
        <>
            <div>Information</div>
            {SaraminData && (<div>{SaraminData}</div>)}
            {JobkoreaData && (<div>{JobkoreaData}</div>)}
        </>
    )
}

export default Information