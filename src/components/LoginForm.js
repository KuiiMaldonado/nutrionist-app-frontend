import React, {useRef, useState} from "react";
import {Container, Alert} from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {LOGIN_USER} from '../utils/mutations';

import Auth from "../utils/auth";
import Utils from "../utils/utils";
import '../assets/css/LoginForm.css';
import axios from "axios";

const LoginForm = () => {
    const {register, handleSubmit, resetField, formState:{errors, isValid}} = useForm({
        mode: 'onChange',
        shouldUseNativeValidation: false
    });
    const [login] = useMutation(LOGIN_USER);
    const [showAlert, setShowAlert] = useState(false);
    const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
    const captchaRef = useRef(null);

    const onSubmit = async (inputs, event) => {
        event.preventDefault();
        event.stopPropagation();

        const captchaToken = captchaRef.current.getValue();
        captchaRef.current.reset();

        let url = Utils.getBaseUrl() + '/api/validateCaptcha';

        try {
            const {data} = await login( {
                variables: inputs,
            });
            Auth.login(data.login.token);
            await axios.post(url, {
                captchaToken: captchaToken
            });
        } catch (error) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2500);
            console.error(error);
        }
        resetField('email');
        resetField('password');
    };

    const onRecaptchaChange = (value) => {
        setIsCaptchaSolved(true);
    }

    //If we try to access login route, and we are already logged in redirect to profile page.
    if (Auth.loggedIn())
        window.location.assign('/profile');

    return (
        <Container className={'mt-4 mb-4'}>
            <div className={'row'}>
                <div className={'col-lg-6 offset-lg-3 text-center'} id={'loginContainer'}>
                    <h1>Keep it up!</h1>
                    <div className={'row mt-3'}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Alert show={showAlert} variant={'danger'}>
                                Something's wrong with your credentials. Please try again.
                            </Alert>
                            <div className={'row mx-1'}>
                                <label htmlFor={'email-input'}>Email</label>
                                <input type={'email'} placeholder={'johnsmith@email.com'} className={'form-control'} id={'email-input'}
                                       {...register('email', {required: {value: true, message: 'An email is required'},
                                       pattern: {value: /[\w.]+@[a-z]+\.[a-z]+/, message: 'Input a valid email'}})}
                                />
                                {errors.email && <Alert variant={'danger'}>{errors.email.message}</Alert>}
                            </div>
                            <div className={'row mt-2 mx-1'}>
                                <label htmlFor={'password-input'}>Password</label>
                                <input type={'password'} placeholder={'***************'} className={'form-control'} id={'password-input'}
                                       {...register('password', {required: {value: true, message: 'Password required'}})}
                                />
                                {errors.password && <Alert variant={'danger'}>{errors.password.message}</Alert>}
                            </div>
                            <ReCAPTCHA id={'captcha-div'}
                                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                onChange={onRecaptchaChange}
                                ref={captchaRef}
                                size={'normal'}
                            />
                            <div className={'row mt-2 mb-3'}>
                                <div className={'d-grid gap-2 col-6 mx-auto'}>
                                    <button type={'submit'} disabled={(!isValid || !isCaptchaSolved)} className={'btn'} id={'submitButton'}>Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default LoginForm;