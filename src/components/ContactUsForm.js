import React, {useState} from "react";
import {Alert, Container} from "react-bootstrap";
import {useForm} from 'react-hook-form';
import axios from "axios";
import Utils from "../utils/utils";

import EmailSentModal from "./EmailSentModal";
import form_label_image from "../assets/images/form_label_image.jpeg";
import '../assets/css/ContactUsForm.css'

const ContactUsForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalBody, setModalBody] = useState('');
    const [isSendingEmail, setIsSendingEmail] = useState(true);
    const {register, resetField, handleSubmit, formState:{errors, isValid}} = useForm({
        mode: 'onChange',
        shouldUseNativeValidation: false
    });

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onSubmit = async (data, event) => {
        event.preventDefault();

        try {
            setModalTitle('Sending your message!')
            handleShow();
            let url = Utils.getBaseUrl() + '/api/emailJS/sendContactEmail';
            await axios.post(url, data);
            resetField('fullName');
            resetField('user_email');
            resetField('phoneNumber');
            resetField('message');
            setModalTitle('Thanks for your message!');
            setModalBody('We will contact you as soon as possible');
            setIsSendingEmail(false);
        } catch (error) {
            setModalTitle('Oooops something went wrong');
            setModalBody('Please try again!');
            setIsSendingEmail(false);
            console.error(error.response.data);
        }

    };

    return (
        <>
            <EmailSentModal title={modalTitle} body={modalBody} sending={isSendingEmail} show={showModal} onHide={handleClose}/>
            <Container className={'mt-4 mb-4'}>
                <div className={'row col-12'} id={'formRow'}>
                    <div className={'col-lg-6'}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={'row mt-2'}>
                                <label htmlFor={'name-input'}>Name:</label>
                                <input type={'text'} placeholder={'John Smith'} className={'form-control'} id={'name-input'}
                                       {...register('fullName', {required: {value: true, message: 'A name is required'},
                                       maxLength: {value: 50, message: 'Max length is 50'}})}
                                       aria-invalid={errors.fullName ? "true" : "false"}
                                />
                                {errors.fullName && <Alert variant={'danger'}>{errors.fullName.message}</Alert>}
                            </div>
                            <div className={'row mt-2'}>
                                <label htmlFor={'email-input'}>Email:</label>
                                <input type={'email'} placeholder={'johnsmith@email.com'} className={'form-control'} id={'email-input'}
                                       {...register('user_email', {required: {value: true, message: 'An email is required'},
                                       pattern: {value: /[\w.]+@[a-z]+\.[a-z]+/, message: 'Input a valid email'}})}
                                />
                                {errors.user_email && <Alert variant={'danger'}>{errors.user_email.message}</Alert>}
                            </div>
                            <div className={'row mt-2'}>
                                <label htmlFor={'phone-input'}>Phone number:</label>
                                <input type={'tel'} placeholder={'5599992222'} className={'form-control'} id={'phone-input'}
                                       {...register('phoneNumber', {required: {value: true, message: 'A phone number is required'},
                                       pattern: {value: /\d{10,}/, message: 'Invalid phone number. Must be at least 10 digits'}})}
                                />
                                {errors.phoneNumber && <Alert variant={'danger'}>{errors.phoneNumber.message}</Alert>}
                            </div>
                            <div className={'row mt-2'}>
                                <label htmlFor={'message-input'}>Message:</label>
                                <textarea className={'form-control'} placeholder={'Wanna hear from you...'} id={'message-input'}
                                          {...register('message', {required: {value: true, message: 'Share a message with us'}})}
                                />
                                {errors.message && <Alert variant={'danger'}>{errors.message.message}</Alert>}
                            </div>
                            <div className={'row mt-2'}>
                                <div className={'col'}>
                                    <button type={'submit'} disabled={!isValid} className={'btn btn-primary'}>Send message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={'col-6'} id={'formImageContainer'}>
                        <img src={form_label_image} alt={'woman tying her shoe'}/>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default ContactUsForm