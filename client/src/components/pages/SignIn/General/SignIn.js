import React, { useState } from "react";
import { loginUser } from "../../../../_actions/user_action";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Auth from "../../../../hoc/auth";
import Kakao from "../Kakao/Kakao";
import Naver from "../Naver/Naver";
import Modal from "../../commons/Modal/Modal";
import ResetUser from "../../ResetUser/ResetUser";
import moment from "moment";
import './SignIn.css';

const { Title } = Typography;

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(moment().unix())

    // RememberMe
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

    const [formErrorMessage, setFormErrorMessage] = useState('')
    const [rememberMe, setRememberMe] = useState(rememberMeChecked)

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    };

    const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

    // Forgot email, password modal
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Formik
                initialValues={{
                    email: initialEmail,
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        let dataToSubmit = {
                            email: values.email,
                            password: values.password
                        };

                        dispatch(loginUser(dataToSubmit))
                            .then(response => {
                                if (response.payload.loginSuccess) {
                                    window.localStorage.setItem('userId', response.payload.userId);
                                    if (rememberMe === true) {
                                        window.localStorage.setItem('rememberMe', values.email);
                                    } else {
                                        localStorage.removeItem('rememberMe');
                                    }
                                    // props.history.push("/");
                                    navigate('/');
                                } else {
                                    setFormErrorMessage('Check out your Account or Password again')
                                }
                            })
                            .catch(err => {
                                setFormErrorMessage('Check out your Account or Password again')
                                setTimeout(() => {
                                    setFormErrorMessage("")
                                }, 3000);
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
                        // dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        // handleReset,
                    } = props;
                    return (
                        <div className='sign-in' >

                            <Title level={2} className='sign-in-title'>Log In</Title>
                            {/* <form onSubmit={handleSubmit} style={{ width: '350px' }}> */}
                            <form className="login-form" onSubmit={handleSubmit} >

                                <Form.Item required className="sign-in-form-input">
                                    <Input
                                        id="email"
                                        prefix={
                                            <>
                                                <UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                                                &nbsp;
                                            </>
                                        }
                                        placeholder="Enter your email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.email && touched.email ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {(errors.email && touched.email) ? (
                                        <div className="input-feedback" style={{ color: "rgb(171, 138, 247)", }}>{errors.email}</div>
                                    ) : (<div>&nbsp;</div>)}
                                </Form.Item>

                                <Form.Item required className="sign-in-form-input">
                                    <Input
                                        id="password"
                                        prefix={
                                            <>
                                                <LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                                                &nbsp;
                                            </>
                                        }
                                        placeholder="Enter your password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.password && touched.password ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {(errors.password && touched.password) ? (
                                        <div className="input-feedback" style={{ color: "rgb(171, 138, 247)", }}>{errors.password}</div>
                                    ) : (<div>&nbsp;</div>)}
                                </Form.Item>

                                {formErrorMessage && (
                                    <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
                                )}

                                <Form.Item >
                                    <Button type="primary" htmlType="submit" className="sign-in-form-button" disabled={isSubmitting} onSubmit={handleSubmit}>
                                        Log in
                                    </Button>
                                </Form.Item>

                                <Form.Item>
                                    <Checkbox id="rememberMe" className="sign-in-form-item" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
                                </Form.Item>
                                <div className="sign-in-form-item">
                                    Or <a href="/sign-up">register now!</a>
                                </div>
                                <Form.Item>
                                    <Button onClick={openModal} className="sign-in-form-button" style={{ marginBottom: '2rem', }}>forgot email / password</Button>
                                </Form.Item>
                            </form>

                            <Kakao />
                            <Naver />

                        </div>
                    );
                }}
            </Formik>
            <Modal open={modalOpen} close={closeModal} header="Find your email / password">
                <ResetUser />
            </Modal>
        </>
    );
};

export default Auth(SignIn, false);