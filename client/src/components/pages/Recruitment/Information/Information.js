import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { fetchData } from "../../../../_actions/data_action";
import './Information.css'
import SelectModal from '../SelectModal/SelectModal';
import useDidMountEffect from '../../../../utils/useDidMountEffect';

function Information() {
    const dispatch = useDispatch();
    const location = useLocation();
    // 소프트웨어 개발자 + 서울전체 + 연봉 3000 이상
    // 사람인 : https://www.saramin.co.kr/zf_user/ 
    //search?searchType=search&company_cd=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C9%2C10&loc_mcd=101000&sal_min=11&keydownAccess= 
    //&searchword=소프트웨어+개발자&panel_type=&search_optional_item=y&search_done=y&panel_count=y&abType=b

    // 잡코리아 : https://www.jobkorea.co.kr/Search/ 
    //?stext=소프트웨어%20개발자&local=I000&payType=1&payMin=3000

    // ----- 사람인 --- 잡코리아 -----
    const [Career, setCareer] = useState(location.search);
    // pathname: "/recruitment/information"
    // 사람인 search: "?searchword=소프트웨어+개발자"
    // 잡코리아 search: "?searchword=소프트웨어%20개발자"

    const [CareerType, setCareerType] = useState({ 'newcomer': false, 'experienced': false, 'irr': false, 'exp_min': '', 'exp_max': '', });
    // 신입 : &exp_cd=1  &careerType=1
    // 경력 : &exp_cd=2  &careerType=2
    // 신입+경력 : &exp_cd=1%2C2  &careerType=3
    // 경력 무관 : &exp_none=y  &careerType=4

    // 나머지 조합 : 사람인은 &...&... 으로 모두 보내기, 잡코리아는 &...%2C... 으로 접합해 보내기
    // 경력 연차 : &exp_min=2&exp_max=4  &careerMin=2&careerMax=4

    const [Edu, setEdu] = useState('');
    // 학력 무관 : &edu_none=y  &edu=0
    // 고등학교 졸업 : &edu_min=6&edu_max=9  &edu=3
    // 대학교 졸업 (2,3년) : &edu_min=7&edu_max=10  &edu=4
    // 대학교 졸업 (4년) : &edu_min=8&edu_max=11  &edu=4
    // 대학원 석사 졸업 : &edu_min=9&edu_max=12  &edu=6
    // 대학원 박사 졸업 : &edu_min=5&edu_max=13  &edu=7

    // 나머지 조합 : 사람인은 &...&... 으로 낮은 조건의 최소, 높은 조건의 최대를
    // (ex.대학교 졸업(4년) ~ 대학원 석사 졸업 : &edu_min=8&edu_max=12 ) 범위로 모두 보내기, 
    // 잡코리아는 &...%2C... 으로 접합해 보내기

    const [Location, setLocation] = useState('');
    // 서울 전체 : &loc_mcd=101000  &local=I000
    // 강남구 : &loc_cd=101010  &local=I010 // 강동구 : &loc_cd=101020  &local=I020 // ...
    // 강남구 강동구 강북구 강서구 관악구   광진구 구로구 금천구 노원구 도봉구
    // 동대문구 동작구 마포구 서대문구 서초구   성동구 성북구 송파구 양천구 영등포구
    // 용산구 은평구 종로구 중구 중랑구

    // 나머지 조합 : 사람인, 잡코리아 모두 &...%2C... 으로 접합해 보내기

    const [Salary, setSalary] = useState('');
    // 2,200만원 이상 : &sal_min=7  &payType=1&payMin=2200
    // 2,400만원 이상 : &sal_min=8  &payType=1&payMin=2400
    // ...
    // 4,000만원 이상 : &sal_min=16  &payType=1&payMin=4000
    // 5,000만원 이상 : &sal_min=17  &payType=1&payMin=5000
    // ...
    // 1억원 이상 : &sal_min=22  &payType=1&payMin=10000

    const [SaraminData, setSaraminData] = useState([]);
    const [JobkoreaData, setJobkoreaData] = useState([]);

    function fetchSaraminData(dataToSubmit) {
        dispatch(fetchData(dataToSubmit))
            .then(res => res.payload.data)
            .then(data => {
                setSaraminData(data);
            })
    }

    useEffect(() => {
        console.log('사람인 스크래핑 시작')
        const dataToSubmit = {
            site: 'saramin',
            searchword: Career,
            loc_mcd: Location,
            sal_min: Salary,
        }
        fetchSaraminData(dataToSubmit);
    }, []);

    function fetchJobkoreaData(dataToSubmit) {
        dispatch(fetchData(dataToSubmit))
            .then(res => res.payload.data)
            .then(data => {
                setJobkoreaData(data);
            })
    }

    useEffect(() => {
        console.log('잡코리아 스크래핑 시작')
        let arr = Career.split('=');
        const dataToSubmit = {
            site: 'jobkorea',
            stext: arr[1],
            local: Location,
            payMin: Salary,
        }
        fetchJobkoreaData(dataToSubmit);
    }, []);

    const [SaraminCareerType, setSaraminCareerType] = useState('');
    const [JobkoreaCareerType, setJobkoreaCareerType] = useState('');

    useDidMountEffect(() => {
        console.log('Information.js line 107 : 한 번만 떠야 함..' + JSON.stringify(CareerType));
        console.log('사람인 스크래핑 재시작')
        console.log('잡코리아 스크래핑 재시작')
        setSaraminCareerType('');
        setJobkoreaCareerType('');

        if (CareerType.newcomer && CareerType.experienced) {
            setSaraminCareerType(SaraminCareerType + '&exp_cd=1%2C2')
            setJobkoreaCareerType(JobkoreaCareerType + '&careerType=3')
        } else if (CareerType.newcomer) {
            setSaraminCareerType(SaraminCareerType + '&exp_cd=1')
            setJobkoreaCareerType(JobkoreaCareerType + '&careerType=1')
        } else if (CareerType.experienced) {
            setSaraminCareerType((SaraminCareerType) => { return (SaraminCareerType + '&exp_cd=2') })
            setJobkoreaCareerType(JobkoreaCareerType + '&careerType=2')
        }

        if (CareerType.irr) {
            setSaraminCareerType(SaraminCareerType + '&exp_none=y')
            if (JobkoreaCareerType !== '')
                setJobkoreaCareerType(JobkoreaCareerType + '%2C4')
            else
                setJobkoreaCareerType(JobkoreaCareerType + '&careerType=4')
        }

        if (CareerType.exp_min && CareerType.exp_max) {
            setSaraminCareerType((SaraminCareerType) => { return (SaraminCareerType + '&exp_min=' + CareerType.exp_min + '&exp_max=' + CareerType.exp_max) })
            setJobkoreaCareerType(JobkoreaCareerType + '&careerMin=' + CareerType.exp_min + '&careerMax=' + CareerType.exp_max)
        } else if (CareerType.exp_min) {
            setSaraminCareerType(SaraminCareerType + '&exp_min' + CareerType.exp_min)
            setJobkoreaCareerType(JobkoreaCareerType + '&careerMin=' + CareerType.exp_min)
        } else if (CareerType.exp_max) {
            setSaraminCareerType(SaraminCareerType + '&exp_max=' + CareerType.exp_max)
            setJobkoreaCareerType(JobkoreaCareerType + '&exp_max=' + CareerType.exp_max)
        }

        setTimeout(() => {
            let arr = Career.split('=');
            const dataToSaramin = {
                site: 'saramin',
                searchword: Career,
                exp: SaraminCareerType,

                loc_mcd: Location,
                sal_min: Salary,
            }
            const dataToJobkorea = {
                site: 'jobkorea',
                stext: arr[1],
                careerType: JobkoreaCareerType,

                local: Location,
                payMin: Salary,
            }
            fetchSaraminData(dataToSaramin);
            fetchJobkoreaData(dataToJobkorea);
        }, 5000);
    }, [Career, CareerType, Edu, Location, Salary])

    const renderSarmainData = SaraminData.map((item, index) => {
        return <tr key={index}>
            <td>{item.title}</td>
            <td> <a href={`https://www.saramin.co.kr${item.url}`}>사람인으로 자세히 보러가기</a></td>
            <td>{item.date}</td>
            <td>{item.condition}</td>
            <td>{item.sector}</td>
            <td>{item.corp}</td>
            <td>{item.affiliate}</td>
        </tr>
    })

    const renderJobkoreaData = JobkoreaData.map((item, index) => {
        return <tr key={index}>
            <td>{item.title}</td>
            <td><a href={`https://www.jobkorea.co.kr${item.url}`}>잡코리아로 자세히 보러가기</a></td>
            <td>{item.date}</td>
            <td>{item.condition}</td>
            <td>{item.sector}</td>
            <td>{item.corp}</td>
            <td></td>
        </tr>
    })

    return (
        <>
            <div className='wrapper'>
                <h2>Information</h2>
                <hr />
                {/* <div>
                    <SelectModal text='경력선택' type='CareerType' Condition={CareerType} setCondition={setCareerType} />
                    {CareerType && JSON.stringify(CareerType)}
                    <SelectModal text='학력선택' type='Edu' Condition={Edu} setCondition={setEdu} />
                    {Edu && Edu}
                    <SelectModal text='지역선택' type='Location' Condition={Location} setCondition={setLocation} />
                    {Location && Location}
                    <SelectModal text='연봉선택' type='Salary' Condition={Salary} setCondition={setSalary} />
                    {Salary && Salary}
                </div> */}

                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>URL</th>
                            <th>Date</th>
                            <th>Condition</th>
                            <th>Sector</th>
                            <th>Corp</th>
                            <th>Affiliate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SaraminData && renderSarmainData}
                        {JobkoreaData && renderJobkoreaData}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Information