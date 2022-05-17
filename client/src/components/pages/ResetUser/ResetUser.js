import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { findUser } from '../../../_actions/user_action';
import { Button } from 'antd';

function ResetUser() {
    const dispatch = useDispatch();
    const [Result, setResult] = useState('');

    return (
        <>
            <div>
                <h3>이메일 찾기</h3>
                <Formik
                    initialValues={{ name: '' }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string()
                            .max(16, 'Name is too long.')
                            .required('Name is required')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            let dataToSubmit = {
                                dataType: 'name',
                                value: values.name
                            };

                            dispatch(findUser(dataToSubmit))
                                .then(response => {
                                    if (response.payload.findSuccess) {
                                        // 검색 결과 있음.
                                        let result = '';
                                        let data = response.payload.user;
                                        data.forEach((currentElement, index, array) => {
                                            let email = currentElement.email;
                                            //     console.log('요소 : ' + currentElement.email);
                                            //     console.log('인덱스 : ' + index);
                                            //     console.log(array);

                                            // 문자열의 중간 글자들을 *로 만들기
                                            const maskingName = function (email) {
                                                let originName = email.split('');

                                                for (let i = 0; i < originName.length; i++) {
                                                    if (
                                                        originName[i] === '.'
                                                    ) break;
                                                    if (
                                                        i === 0
                                                        || i === 1
                                                        || originName[i - 1] === '@'
                                                        || originName[i] === '@'
                                                        || originName[i + 1] === '@'
                                                    ) continue;
                                                    originName[i] = '*';
                                                }

                                                const joinName = originName.join();
                                                return joinName.replace(/,/g, '');
                                            };
                                            result += maskingName(email);
                                        })
                                        setResult(result);
                                    } else {
                                        // 검색 결과 없음.
                                        setResult('검색 결과가 없습니다.');
                                    }
                                });
                            setSubmitting(false);
                        }, 500);
                    }}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset,
                        } = props;

                        return (
                            <>
                                <Form onSubmit={handleSubmit}>
                                    <Field
                                        id='name'
                                        type='text'
                                        placeholder="Enter your name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <Button onClick={handleSubmit} disabled={isSubmitting}>검색</Button>
                                    &nbsp;
                                    <Button onClick={() => { handleReset(); setResult(''); }}>다시 쓰기</Button>
                                    {errors.name && touched.name && (
                                        <div>{errors.name}</div>
                                    )}
                                </Form>
                                <div>{Result}</div>
                            </>
                        );
                    }}
                </Formik>
            </div>
            <br />
            <div>
                <h3>비밀번호 찾기/미완성</h3>
                <Formik
                    initialValues={{ name: '' }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string()
                            .max(16, 'Name is too long.')
                            .required('Name is required')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            let dataToSubmit = {
                                name: values.name
                            };

                            dispatch(findUser(dataToSubmit))
                                .then(response => {
                                    if (response.payload.success) {
                                        // 검색 결과 있음.
                                    } else {
                                        // 검색 결과 없음.

                                    }
                                });
                            setSubmitting(false);
                        }, 500);
                    }}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset,
                        } = props;

                        return (
                            <>
                                <Form onSubmit={handleSubmit}>
                                    <Field
                                        id='name'
                                        type='text'
                                        placeholder="Enter your name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <button onClick={handleSubmit} disabled={isSubmitting}>검색</button>
                                    &nbsp;
                                    <button onClick={handleReset}>다시 쓰기</button>
                                    {errors.name && touched.name && (
                                        <div>{errors.name}</div>
                                    )}
                                </Form>
                            </>
                        );
                    }}
                </Formik>
            </div>
        </>
    )
}

export default ResetUser