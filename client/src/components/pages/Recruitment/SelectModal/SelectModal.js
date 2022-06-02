import React, { useState } from 'react'
import { Button } from 'antd'
import Modal from '../../commons/Modal/Modal'
import { CareerType, Edu, Location, Salary } from '../Conditions/Conditions'

function SelectModal(props) {
    const [Temp, setTemp] = useState(props.Condition)
    const [ModalOpen, setModalOpen] = useState(false)
    const openModal = () => {
        setModalOpen(true)
        // 상위 컴포넌트 State에 저장된 조건 모달에 설정하고 열기.
        setTemp(props.Condition)
    };
    const closeModal = () => {
        setModalOpen(false)
        // 모달에서 설정한 조건 상위 컴포넌트 State에 저장하고 닫기.
        props.setCondition(Temp);
    };

    return (
        <>
            <Modal open={ModalOpen} close={closeModal} header={props.text}>
                {props.type === 'CareerType' && <CareerType Condition={Temp} setCondition={setTemp} />}
                {props.type === 'Edu' && <Edu Condition={Temp} setCondition={setTemp} />}
                {props.type === 'Location' && <Location Condition={Temp} setCondition={setTemp} />}
                {props.type === 'Salary' && <Salary Condition={Temp} setCondition={setTemp} />}
            </Modal>
            <Button onClick={openModal} style={{ margin: '1rem', marginBottom: '2rem', }}>{props.text}</Button>
        </>
    )
}

export default SelectModal