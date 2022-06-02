import React, { useState, useEffect } from 'react'
import { Checkbox, Button, Input, Form } from 'antd'
import { Formik } from 'formik';
import './Conditions.css'

export function CareerType({ Condition, setCondition }) {
    // 신입 : &exp_cd=1  &careerType=1
    // 경력 : &exp_cd=2  &careerType=2
    // 신입+경력 : &exp_cd=1%2C2  &careerType=3
    // 경력 무관 : &exp_none=y  &careerType=4

    // 나머지 조합 : 사람인은 &...&... 으로 모두 보내기, 잡코리아는 &...%2C... 으로 접합해 보내기
    // 경력 연차 : &exp_min=2&exp_max=4  &careerMin=2&careerMax=4
    const newcomerChecked = Condition.newcomer;
    const [newcomer, setNewcomer] = useState(newcomerChecked);
    const handleNewcomer = () => {
        setNewcomer(!newcomer);
        if (Condition.newcomer) {
            setCondition({
                ...Condition,
                newcomer: false,
            });
        }
        else if (!Condition.newcomer) {
            setCondition({
                ...Condition,
                newcomer: true,
            });
        }
    }

    const [experienced, setExperienced] = useState(Condition.experienced);
    const handleExperienced = () => {
        setExperienced(!experienced);
        if (Condition.experienced) {
            setCondition({
                ...Condition,
                experienced: false,
            });
        }
        else if (!Condition.experienced) {
            setCondition({
                ...Condition,
                experienced: true,
            });
        }
    }

    const irrChecked = Condition.irr
    const [irr, setIrr] = useState(irrChecked);
    const handleIrr = () => {
        setIrr(!irr);
        if (Condition.irr) {
            setCondition({
                ...Condition,
                irr: false,
            });
        }
        else if (!Condition.irr) {
            setCondition({
                ...Condition,
                irr: true,
            });
        }
    }

    const init_exp_min = Condition.exp_min;
    const [exp_min, setExp_min] = useState(init_exp_min)
    const init_exp_max = Condition.exp_max;
    const [exp_max, setExp_max] = useState(init_exp_max)
    useEffect(() => {
        if (exp_min === '' && exp_max === '') {
            setExperienced(false);
            setCondition({
                ...Condition,
                experienced: false,
                exp_min: exp_min,
                exp_max: exp_max,
            });
        } else {
            setExperienced(true);
            setCondition({
                ...Condition,
                experienced: true,
                exp_min: exp_min,
                exp_max: exp_max,
            });
        }
    }, [exp_min, exp_max])

    return (
        <>
            <div>CareerType</div>
            <div className='career-type-checkbox'>
                <Checkbox id='newcomer' onChange={handleNewcomer} checked={newcomerChecked}> 신입</Checkbox>
                <Checkbox id='experienced' onChange={handleExperienced} checked={experienced}> 경력</Checkbox>
                <Checkbox id='irr' onChange={handleIrr} checked={irrChecked} style={{ marginLeft: 'auto', }}> 경력무관</Checkbox>
            </div>
            <Formik
                initialValues={{
                    exp_min: exp_min,
                    exp_max: exp_max,
                }}
            >
                {props => {
                    const {
                        values,
                        handleChange,
                    } = props;
                    return (
                        <div className='career-type-div'>
                            <Form className='career-type-form'>
                                <Form.Item className='career-type-form-item'>
                                    연차 입력하기 :
                                    <Input
                                        id='exp_min'
                                        placeholder='년'
                                        type='text'
                                        value={values.exp_min}
                                        onChange={(e) => { handleChange(e); setExp_min(e.currentTarget.value) }}
                                        className='career-type-input'
                                    />
                                    ~
                                    <Input
                                        id='exp_max'
                                        placeholder='년'
                                        type='text'
                                        value={values.exp_max}
                                        onChange={(e) => { handleChange(e); setExp_max(e.currentTarget.value) }}
                                        className='career-type-input'
                                    />
                                </Form.Item>
                            </Form>
                        </div>
                    )
                }}
            </Formik>
        </>
    )
}

export function Edu({ Condition, setCondition }) {
    // 학력 무관 : &edu_none=y  &edu=0
    // 고등학교 졸업 : &edu_min=6&edu_max=9  &edu=3
    // 대학교 졸업 (2,3년) : &edu_min=7&edu_max=10  &edu=4
    // 대학교 졸업 (4년) : &edu_min=8&edu_max=11  &edu=4
    // 대학원 석사 졸업 : &edu_min=9&edu_max=12  &edu=6
    // 대학원 박사 졸업 : &edu_min=5&edu_max=13  &edu=7

    // 나머지 조합 : 사람인은 &...&... 으로 낮은 조건의 최소, 높은 조건의 최대를
    // (ex.대학교 졸업(4년) ~ 대학원 석사 졸업 : &edu_min=8&edu_max=12 ) 범위로 모두 보내기, 
    // 잡코리아는 &...%2C... 으로 접합해 보내기
    return (
        <>
            <div>Edu</div>
        </>
    )
}

export function Location({ Condition, setCondition }) {
    // 서울 전체 : &loc_mcd=101000  &local=I000
    // 강남구 : &loc_cd=101010  &local=I010 // 강동구 : &loc_cd=101020  &local=I020 // ...
    // 강남구 강동구 강북구 강서구 관악구   광진구 구로구 금천구 노원구 도봉구
    // 동대문구 동작구 마포구 서대문구 서초구   성동구 성북구 송파구 양천구 영등포구
    // 용산구 은평구 종로구 중구 중랑구

    // 나머지 조합 : 사람인, 잡코리아 모두 &...%2C... 으로 접합해 보내기
    return (
        <>
            <div>Location</div>
        </>
    )
}

export function Salary({ Condition, setCondition }) {
    // 2,200만원 이상 : &sal_min=7  &payType=1&payMin=2200
    // 2,400만원 이상 : &sal_min=8  &payType=1&payMin=2400
    // ...
    // 4,000만원 이상 : &sal_min=16  &payType=1&payMin=4000
    // 5,000만원 이상 : &sal_min=17  &payType=1&payMin=5000
    // ...
    // 1억원 이상 : &sal_min=22  &payType=1&payMin=10000
    return (
        <>
            <div>Salary</div>
        </>
    )
}