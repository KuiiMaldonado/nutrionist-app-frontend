import React, {useEffect, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import {Button, Col, Container, ListGroup, ListGroupItem, Modal, Row} from "react-bootstrap";
import Divider from "./Divider";
import {useMutation, useQuery} from "@apollo/client";
import {GET_USER_TRAININGS} from "../utils/queries";
import {ADD_TRAINING, DELETE_TRAINING} from "../utils/mutations";
import LoadingSpinners from "./LoadingSpinners";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";

import '../assets/css/ManageUsers.css';
import axios from "axios";

const fileTypes = ['PDF'];
let baseUrl;
if (process.env.NODE_ENV === 'production')
    baseUrl = process.env.REACT_APP_BACKEND_SERVER;
else
    baseUrl = 'http://localhost:3001';

const Trainings = (props) => {
    const {data, loading, refetch} = useQuery(GET_USER_TRAININGS, {
        variables: {userId: props.userId}
    });
    const [addTraining] = useMutation(ADD_TRAINING);
    const [deleteTraining] = useMutation(DELETE_TRAINING);
    const [showModal, setShowModal] = useState(false);
    const [trainingId, setTrainingId] = useState('');
    const [trainingFileName, setTrainingFileName] = useState('');
    const [selectedFile, setSelectedFIle] = useState(null);
    const handleChange = (file) => setSelectedFIle(file);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        refetch().then();
    });

    const handleModal = (trainingId, trainingFileName) => {
        handleShow();
        setTrainingId(trainingId);
        setTrainingFileName(trainingFileName);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const formData = new FormData();
        formData.append('uploaded-training', selectedFile);
        formData.append('userId', props.userId);

        try {
            let url = baseUrl + '/api/uploadTraining';
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            await addTraining({
                variables: {
                    userId: props.userId,
                    eTag: response.data.response.ETag,
                    fileName: response.data.fileName
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteTraining = async () => {
        try {
            let url = baseUrl + '/api/deleteTraining';
            const trainingData = {
                userId: props.userId,
                fileName: trainingFileName
            };
            await axios.post(url, trainingData);
            const {data} = await deleteTraining({
                variables: {
                    userId: props.userId,
                    trainingId: trainingId
                }
            });
            if (!data) {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.error(error);
        }
        handleClose();
    }

    const handleDownloadTraining = async (trainingFileName) => {
        try {
            let url = baseUrl + '/api/downloadTraining';
            const response = await axios.post(url, {
                userId: props.userId,
                fileName: trainingFileName
            });
            const link = document.createElement('a');
            link.href = response.data.download;
            link.download = trainingFileName
            link.click();
        } catch (error) {
            console.error(error);
        }
    }

    let trainings;

    if (!loading) {
        trainings = data.getUserTrainings.userTrainings;
    }
    else {
        return (
            <LoadingSpinners/>
        );
    }
    return (
        <Container>
            <Modal centered show={showModal}>
                <Modal.Header>
                    <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Deleting training</h5>
                    <p>
                        You are about to delete the user's training. This action can not be undone.
                        Do you want to proceed?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'secondary'} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant={'danger'} onClick={handleDeleteTraining}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            {!props.edit &&
                <Row>
                    <h2>Trainings</h2>
                    <Divider/>
                </Row>
            }
            {trainings.length === 0
                ? <h3>No trainings available</h3>
                :
                <>
                    <ListGroup as={'ul'}>
                        {trainings.map((training) => {
                            return (
                                <ListGroupItem key={training._id} as={'li'} className={'d-flex justify-content-between align-items-start'}>
                                    <div>
                                        <h5>{training.fileName}</h5>
                                    </div>
                                    <div>
                                        <button className={'user-button download'}>
                                            <FontAwesomeIcon icon={faDownload} size={'xl'} onClick={() => handleDownloadTraining(training.fileName)}/>
                                        </button>
                                        {props.edit &&
                                            <button className={'user-button delete'}>
                                                <FontAwesomeIcon icon={faCircleXmark} size={'xl'} onClick={() => handleModal(training._id, training.fileName)}/>
                                            </button>
                                        }
                                    </div>
                                </ListGroupItem>
                            );
                        })}
                    </ListGroup>
                </>
            }
            {props.edit &&
                <Row className={'text-center mt-3'}>
                    <Col lg={{span: 4, offset: 4}}>
                        <form onSubmit={onSubmit}>
                            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                            <Button type={'submit'} variant={'success'} className={'mt-3'}>
                                Upload training
                            </Button>
                        </form>
                    </Col>
                </Row>
            }
        </Container>
    );
}

export default Trainings;