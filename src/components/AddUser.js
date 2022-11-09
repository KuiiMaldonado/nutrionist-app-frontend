import React, {useState} from "react";
import {Alert, Button, Col, Container, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {ADD_PROFILE} from "../utils/mutations";
import Divider from "./Divider";

const AddUser = () => {
    const {register, resetField, handleSubmit, formState:{errors, isValid}} = useForm({
        mode: 'onChange',
        shouldUseNativeValidation: false
    });

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [addProfile] = useMutation(ADD_PROFILE);

    const onSubmit = async (inputs, event) => {
        event.preventDefault();
        event.stopPropagation();

        let newUserData = {
            username: inputs.username,
            email: inputs.email,
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            password: inputs.password
        }

        if (inputs.admin === 'Yes')
            newUserData.isAdmin = true;

        try {
            await addProfile({
                variables: {userInput: newUserData}
            });
            setShowSuccessAlert(true);
            resetField('username');
            resetField('email');
            resetField('firstName');
            resetField('lastName');
            resetField('password');
            resetField('admin');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Container>
            <Alert dismissible variant={'success'} onClose={() => setShowSuccessAlert(false)} show={showSuccessAlert}>
                User added successfully!
            </Alert>
            <Row>
                <h2>Add user</h2>
            </Row>
            <Divider/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row className={'my-3'}>
                    <Col className={'col-6'}>
                        <Row>
                            <h6>Username</h6>
                        </Row>
                        <input type={'text'} className={'form-control'}
                               {...register('username' ,{required: {value: true, message: 'Username required'},
                               maxLength: {value: 50, message: 'Max length is 50'},
                               pattern: {value: /[\w.]+/, message: 'Username should be characters, period(.) and underscore'}})}
                        />
                        {errors.username && <Alert variant={'danger'}>{errors.username.message}</Alert>}
                    </Col>
                </Row>
                <Row className={'my-3'}>
                    <Col className={'col-6'}>
                        <Row>
                            <label>Email</label>
                        </Row>
                        <input type={'email'} className={'form-control'}
                               {...register('email', {required: {value: true, message: 'Email required'},
                                   pattern: {value: /[\w.]+@[a-z]+\.[a-z]+/, message: 'Input a valid email'}})}
                        />
                        {errors.email && <Alert variant={'danger'}>{errors.email.message}</Alert>}
                    </Col>
                </Row>
                <Row className={'my-3'}>
                    <Col className={'col-6'}>
                        <label>First Name</label>
                        <input type={'text'} className={'form-control'}
                               {...register('firstName', {required: {value: true, message: 'First name required'},
                                   maxLength: {value: 50, message: 'Max length is 50'},
                                   pattern: {value: /[A-z]+/, message: 'First name should be only characters'}})}
                        />
                        {errors.firstName && <Alert variant={'danger'}>{errors.firstName.message}</Alert>}
                    </Col>
                </Row>
                <Row className={'my-3'}>
                    <Col className={'col-6'}>
                        <label>Last Name</label>
                        <input type={'text'} className={'form-control'}
                               {...register('lastName', {required: {value: true, message: 'Last name required'},
                                   maxLength: {value: 50, message: 'Max length is 50'},
                                   pattern: {value: /[A-z]+/, message: 'Last name should be only characters'}})}
                        />
                        {errors.lastName && <Alert variant={'danger'}>{errors.lastName.message}</Alert>}
                    </Col>
                </Row>
                <Row className={'my-3'}>
                    <Col className={'col-6'}>
                        <Row>
                            <label>Password</label>
                        </Row>
                        <input type={'password'} className={'form-control'}
                               {...register('password', {required: {value: true, message: 'A password is required'},
                               minLength: {value: 8, message: 'Password should have at least length 8'}})}
                        />
                        {errors.password && <Alert variant={'danger'}>{errors.password.message}</Alert>}
                    </Col>
                </Row>
                <Row className={'my-3'}>
                    <Col className={'col-6'}>
                        <Row>
                            <label>Admin</label>
                        </Row>
                        <select className={'form-select'} defaultValue={'No'}
                                {...register('admin')}
                        >
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </Col>
                </Row>
                <Row className={'my-3'}>
                    <Col className={'col-6 text-center'}>
                        <Button type={'submit'} disabled={!isValid} variant={'success'}>Add user</Button>
                    </Col>
                </Row>
            </form>
        </Container>
    );
}

export default AddUser;