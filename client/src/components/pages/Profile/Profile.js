import React, { useEffect, useState } from 'react';
import Auth from '../../../hoc/auth';
import { useDispatch } from 'react-redux';
import { auth, findUser, modifyUser } from '../../../_actions/user_action';
import './Profile.css'
import GenerateToken from '../SendEmail/GenerateToken';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
    Form,
    Input,
    Button,
} from 'antd';

function Profile() {
    const dispatch = useDispatch();

    function isInUse(message, dataType, dispatch) {

        return this.test("isInUse", message, function (value) {
            const { path, createError } = this;
            let dataToSubmit = {
                dataType,
                value
            };

            return dispatch(findUser(dataToSubmit))
                .then(response => {
                    if (response.payload.findSuccess) {
                        return createError({ path, message: message });
                    }
                    else {
                        return true;
                    }
                });
        });

    }
    Yup.addMethod(Yup.string, "isInUse", isInUse);

    useEffect(() => {
        dispatch(auth())
            .then(res => res.payload)
            .then(raw => {
                for (raw.key in raw) {
                    // if (raw.key === '_id')
                    //     set_id(raw[raw.key])
                    if (raw.key === 'oAuthId')
                        setoAuthId(raw[raw.key])
                    // else if (raw.key === 'isAdmin')
                    //     setisAdmin(raw[raw.key].toString())
                    // else if (raw.key === 'isAuth')
                    //     setisAuth(raw[raw.key].toString())
                    else if (raw.key === 'email')
                        setemail(raw[raw.key])
                    else if (raw.key === 'name')
                        setname(raw[raw.key])
                    else if (raw.key === 'Nickname')
                        setNickname(raw[raw.key])
                    else if (raw.key === 'role')
                        setrole(raw[raw.key])
                    else if (raw.key === 'image')
                        setimage(raw[raw.key])
                }
            })
    }, [dispatch])

    // const [_id, set_id] = useState('');
    const [oAuthId, setoAuthId] = useState(null);
    // const [isAdmin, setisAdmin] = useState('');
    // const [isAuth, setisAuth] = useState('');
    const [email, setemail] = useState('');
    const [name, setname] = useState('');
    const [Nickname, setNickname] = useState('');
    const [role, setrole] = useState('');
    const [image, setimage] = useState('');

    const [ModifyMode, setModifyMode] = useState(false);
    const modifyModeOn = () => {
        setModifyMode(true);
    }
    const modifyModeOff = () => {
        setModifyMode(false);
    }

    return (
        <>
            {!ModifyMode &&
                <>
                    <h1>Profile</h1>
                    <div id='wrapper' className='wrapper'>
                        <img className='profile_img' src={image} alt='프로필 이미지 없음' height='200' width='200' />
                        {oAuthId ? oAuthId.length === 10 ? <div className='account_data'>카카오로 로그인</div> : <div className='account_data'>네이버로 로그인</div> : <div className='account_data'>알뜰리에로 로그인</div>}
                        {role === 0 ? (<span className='account_data'>계정 유형 : 사용자<br /></span>) : (<span className='account_data'>계정 유형 : 관리자<br /></span>)}
                        {email && <span className='account_data'>이메일 : {email}<br /></span>}
                        <div className='account_data'>
                            {oAuthId == null && <GenerateToken email={email} disabled={!ModifyMode} />}
                        </div>
                        {name && <span className='account_data'>이름 : {name}<br /></span>}
                        {Nickname && <span className='account_data'>닉네임 : {Nickname}<br /></span>}
                        <Button onClick={modifyModeOn} type="primary" className='account_data' disabled={ModifyMode} >
                            내 정보 수정하기
                        </Button>
                    </div>
                </>
            }

            {ModifyMode &&
                <>
                    <h1>Profile</h1>

                    <Formik
                        initialValues={{
                            name: name,
                            Nickname: Nickname,
                        }}
                        validationSchema={
                            Yup.object().shape({
                                name: Yup.string()
                                    .max(16, 'Name is too long.')
                                    .required('Name is required'),
                                Nickname: Yup.string()
                                    .required('Nickname is required')
                                    .max(8, 'Nickname is too long.')
                                    .isInUse('Nickname is already in use.', 'Nickname', dispatch)
                            })}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {

                                let dataToSubmit = {
                                    email,
                                    name: values.name,
                                    Nickname: values.Nickname,
                                };

                                dispatch(modifyUser(dataToSubmit)).then(response => {
                                    if (response.payload.modifySuccess) {
                                        // off
                                        setname(values.name);
                                        setNickname(values.Nickname);
                                        modifyModeOff();
                                    } else {
                                        alert(response.payload.err.errmsg)
                                    }
                                })

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
                                <div id='wrapper' className="wrapper" >
                                    <img className='profile_img' src={image} alt='프로필 이미지 없음' height='200' width='200' />
                                    {oAuthId ? oAuthId.length === 10 ? <div className='account_data'>카카오로 로그인</div> : <div className='account_data'>네이버로 로그인</div> : <div className='account_data'>알뜰리에로 로그인</div>}
                                    {role === 0 ? (<span className='account_data'>계정 유형 : 사용자<br /></span>) : (<span className='account_data'>계정 유형 : 관리자<br /></span>)}
                                    {email && <span className='account_data'>이메일 : {email}<br /></span>}
                                    <div className='account_data'>
                                        {oAuthId == null && <GenerateToken email={email} disabled={!ModifyMode} />}
                                    </div>

                                    <Form onSubmit={handleSubmit} >
                                        <Form.Item required>
                                            이름 : <Input
                                                id="name"
                                                placeholder="Enter your name"
                                                type="text"
                                                value={values.name} // true or false
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={
                                                    errors.name && touched.name ? 'text-input error account_data' : 'text-input account_data'
                                                }
                                            />
                                            {errors.name && touched.name && (
                                                <div className="input-feedback">{errors.name}</div>
                                            )}
                                        </Form.Item>

                                        <Form.Item required>
                                            닉네임 : <Input
                                                id="Nickname"
                                                placeholder="Enter your Nickname"
                                                type="text"
                                                value={values.Nickname}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={
                                                    errors.Nickname && touched.Nickname ? 'text-input error account_data' : 'text-input account_data'
                                                }
                                            />
                                            {errors.Nickname && touched.Nickname && (
                                                <div className="input-feedback">{errors.Nickname}</div>
                                            )}
                                        </Form.Item>

                                        <Form.Item>
                                            <Button onClick={handleSubmit} type="primary" style={{ marginLeft: '20%', marginTop: '1rem' }} disabled={isSubmitting} >
                                                수정 완료
                                            </Button>
                                            <Button onClick={modifyModeOff} type="primary" style={{ marginLeft: '1rem' }} >
                                                수정 취소
                                            </Button>
                                        </Form.Item>

                                    </Form>
                                </div>
                            );
                        }}
                    </Formik>

                </>
            }
        </>
    )
}

export default Auth(Profile, true);




