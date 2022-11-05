import React from "react";
import {Alert, Button, Col, Container, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import Divider from "./Divider";

const AccountSettings = (props) => {
    const {register, handleSubmit, formState:{errors}} = useForm({
        mode: 'onChange',
        shouldUseNativeValidation: false,
        defaultValues: {
            username: props.user.username,
            email: props.user.email,
            firstName: props.user.firstName,
            lastName: props.user.lastName,
        }
    })

    const onSubmit = async (inputs, event) => {
        event.preventDefault();
        event.stopPropagation();

        console.log(inputs);
    }

    return (
        <Container>
            <Row>
                <h2>Profile</h2>
            </Row>
            <Divider/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row className={'my-3'}>
                    <Col className={'col-6'}>
                        <Row>
                            <h6>Username</h6>
                        </Row>
                        <input type={'text'} className={'form-control'}
                               {...register('username' ,{required: {value: true, message: 'Username required'}})}
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
                               {...register('firstName', {required: {value: true, message: 'First name required'}})}
                        />
                        {errors.firstName && <Alert variant={'danger'}>{errors.firstName.message}</Alert>}
                    </Col>
                </Row>
                <Row className={'my-3'}>
                    <Col className={'col-6'}>
                        <label>Last Name</label>
                        <input type={'text'} className={'form-control'}
                               {...register('lastName', {required: {value: true, message: 'Last name required'}})}
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
                               {...register('password')}
                        />
                    </Col>
                </Row>
                <Row className={'my-3'}>
                    <Col className={'col-6 text-center'}>
                        <Button type={'submit'} variant={'success'}>Update profile</Button>
                    </Col>
                </Row>
            </form>
        </Container>
    );
}

export default AccountSettings;