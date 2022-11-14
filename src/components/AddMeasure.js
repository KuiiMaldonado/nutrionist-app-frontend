import React, {useState} from "react";
import {Alert, Button, Col, Container, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {ADD_MEASURE} from "../utils/mutations";
import Divider from "./Divider";
import {useLocation} from "react-router-dom";
import Auth from "../utils/auth";

const AddMeasure = () => {
    if (!Auth.loggedIn()) {
        window.location.assign('/login');
    }

    if (!Auth.isAdmin()) {
        window.location.assign('/profile');
    }

    const {register, resetField, handleSubmit, formState:{errors, isValid}} = useForm({
        mode: 'onChange',
        shouldUseNativeValidation: false
    });

    const {state} = useLocation();
    const {editId} = state;
    const [addMeasure] = useMutation(ADD_MEASURE);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const onSubmit = async (inputs, event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const {data} = await addMeasure({
                variables: {
                    userId: editId,
                    measureInput: inputs
                }
            });
            if (!data) {
                throw new Error('Something went wrong!');
            }
            else {
                setShowSuccessAlert(true);
                resetField('date');
                resetField('bodyType');
                resetField('bodyFatPercentage');
                resetField('bodyFat');
                resetField('leanBodyWeight');
                resetField('weight');
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Container>
            <Alert dismissible variant={'success'} onClose={() => setShowSuccessAlert(false)} show={showSuccessAlert}>
                Measure added successfully!
            </Alert>
            <Row>
                <h2>Add measure</h2>
            </Row>
            <Divider/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row className={'my-3'}>
                    <Col className={'col-6'}>
                        <Row>
                            <h6>Date</h6>
                        </Row>
                        <input type={'date'} className={'form-control'}
                               {...register('date' ,{required: {value: true, message: 'Date required'}})}
                        />
                        {errors.date && <Alert variant={'danger'}>{errors.date.message}</Alert>}
                    </Col>
                    <Col className={'col-6'}>
                        <Row>
                            <h6>Body type</h6>
                        </Row>
                        <input type={'text'} className={'form-control'}
                               {...register('bodyType', {required: {value: true, message: 'Body type required'},
                               pattern: {value: /[A-z]+/, message: 'Body type can be letters only'}})}
                        />
                        {errors.bodyType && <Alert variant={'danger'}>{errors.bodyType.message}</Alert>}
                    </Col>
                </Row>
                <Row className={'my-3'}>
                    <Col className={'col-6'}>
                        <Row>
                            <h6>Body Fat %</h6>
                        </Row>
                        <input type={'text'} className={'form-control'}
                               {...register('bodyFatPercentage' ,{required: {value: true, message: 'Body fat percentage required'},
                               pattern: {value: /\b[0-9]{1,3}\b\.[0-9]{2}%/, message: 'Fat percentage must follow this pattern 85.54%'}})}
                        />
                        {errors.bodyFatPercentage && <Alert variant={'danger'}>{errors.bodyFatPercentage.message}</Alert>}
                    </Col>
                    <Col className={'col-6'}>
                        <Row>
                            <h6>Body Fat</h6>
                        </Row>
                        <input type={'text'} className={'form-control'}
                               {...register('bodyFat', {required: {value: true, message: 'Body fat required'},
                               pattern: {value: /\b[0-9]{1,3}\b\.[0-9]{2}\b/, message: 'Body Fat can have only 2 decimal places'}})}
                        />
                        {errors.bodyFat && <Alert variant={'danger'}>{errors.bodyFat.message}</Alert>}
                    </Col>
                </Row>
                <Row className={'my-3'}>
                    <Col className={'col-6'}>
                        <Row>
                            <h6>Lean Body Weight</h6>
                        </Row>
                        <input type={'text'} className={'form-control'}
                               {...register('leanBodyWeight' ,{required: {value: true, message: 'Lean body weight required'},
                               pattern: {value: /\b[0-9]{1,3}\b\.[0-9]{2}\b/, message: 'Lean body weight can have only 2 decimal places'}})}
                        />
                        {errors.leanBodyWeight && <Alert variant={'danger'}>{errors.leanBodyWeight.message}</Alert>}
                    </Col>
                    <Col className={'col-6'}>
                        <Row>
                            <h6>Weight</h6>
                        </Row>
                        <input type={'text'} className={'form-control'}
                               {...register('weight', {required: {value: true, message: 'Weight required'},
                               pattern: {value: /\b[0-9]{1,3}\b\.[0-9]{2}\b/, message: 'Weight can have only 2 decimal places'}})}
                        />
                        {errors.weight && <Alert variant={'danger'}>{errors.weight.message}</Alert>}
                    </Col>
                </Row>
                <Row className={'my-3'}>
                    <Col className={'text-center'}>
                        <Button type={'submit'} disabled={!isValid} variant={'success'}>Add measure</Button>
                    </Col>
                </Row>
            </form>
        </Container>
    );
}

export default AddMeasure;