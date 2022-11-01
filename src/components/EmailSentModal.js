import React from "react";
import {Button, Modal, Spinner} from "react-bootstrap";

const EmailSentModal = (props) => {
    return (
        <>
            <Modal {...props} centered>
                <Modal.Header closeButton>
                    <Modal.Title className={'text-center'}>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={'text-center'}>
                    <h5>{props.body}</h5>
                    {props.sending ? (
                        <>
                            <Spinner animation={'grow'} variant={'info'}/>
                            <Spinner animation={'grow'} variant={'info'}/>
                            <Spinner animation={'grow'} variant={'info'}/>
                        </>
                    ): (
                        <Button variant={'info'} className={'btn'} onClick={props.onHide}>Got it!</Button>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EmailSentModal;