import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'antd';
import { deleteUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

// 회원 탈퇴 (profile page 모달)
function DeleteUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const _id = useSelector(state => state.user.userData._id);
    const [Authenticator, setAuthenticator] = useState(Math.random().toString(36).substring(2, 11))
    const [InputValue, setInputValue] = useState('')

    return (
        <>
            <div>
                <h3>회원 탈퇴</h3>
                <h2>{Authenticator}</h2>
                <Formik
                    initialValues={{ str: '' }}
                    validationSchema={Yup.object().shape({
                        str: Yup.string()
                            .required('Authenticator is required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            console.log(InputValue);

                            if (InputValue === Authenticator) {
                                let dataToSubmit = {
                                    _id,
                                };

                                dispatch(deleteUser(dataToSubmit))
                                    .then(response => {
                                        const data = response.payload;
                                        if (data.deleteSuccess) {
                                            console.log('delete completed')
                                            alert('지금까지 알뜰리에를 이용해주셔서 감사합니다.')
                                            navigate('/')
                                        } else {
                                            console.log('delete failed')
                                            alert('회원 탈퇴 실패')
                                        }
                                    });
                            } else {
                                alert('입력하신 값이 인증기와 다릅니다.')
                            }

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
                                        id='str'
                                        type='text'
                                        placeholder="Enter the authenticator above."
                                        value={values.str}
                                        onChange={(e) => { handleChange(e); setInputValue(e.currentTarget.value); }}
                                        onBlur={handleBlur}
                                    />
                                    <br />
                                    <Button onClick={handleSubmit} disabled={isSubmitting}>인증기 입력</Button>
                                    &nbsp;
                                    <Button onClick={() => { handleReset(); setAuthenticator(Math.random().toString(36).substring(2, 11)); }}>인증기 초기화</Button>
                                    {errors.str && touched.str && (
                                        <div>{errors.str}</div>
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

export default DeleteUser