import React, {useEffect, useState} from "react";
import axios from "axios";
import {FileUploader} from "react-drag-drop-files";
import {Col, Container, ListGroup, ListGroupItem, Row, Button, Modal, Alert} from "react-bootstrap";
import {useQuery, useMutation} from "@apollo/client";
import {GET_USER_DIETS} from "../utils/queries";
import {ADD_DIET, DELETE_DIET} from "../utils/mutations";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import Divider from "./Divider";
import LoadingSpinners from "./LoadingSpinners";

import '../assets/css/ManageUsers.css';

const fileTypes = ['PDF'];

const Diets = (props) => {
    const {data, loading, refetch} = useQuery(GET_USER_DIETS, {
        variables: {userId: props.userId}
    });
    const [addDiet] = useMutation(ADD_DIET);
    const [deleteDiet] = useMutation(DELETE_DIET);
    const [showModal, setShowModal] = useState(false);
    const [dietId, setDietId] = useState('');
    const [selectedFile, setSelectedFIle] = useState(null);
    const handleChange = (file) => setSelectedFIle(file);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        refetch().then();
    });

    const handleModal = (dietId) => {
        handleShow();
        setDietId(dietId);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const formData = new FormData();
        formData.append('uploaded-diet', selectedFile);
        formData.append('userId', props.userId);

        let baseUrl;
        try {
            if (process.env.NODE_ENV === 'production')
                baseUrl = process.env.REACT_APP_BACKEND_SERVER;
            else
                baseUrl = 'http://localhost:3001';
            let url = baseUrl + '/api/uploadDiet';
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            await addDiet({
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

    const handleDeleteDiet = async () => {
        try {
            const {data} = await deleteDiet({
                variables: {
                    userId: props.userId,
                    dietId: dietId
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

    let diets;

    if (!loading) {
        diets = data.getUserDiets.userDiets;
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
                    <h5>Deleting diet</h5>
                    <p>
                        You are about to delete the user's diet. This action can not be undone.
                        Do you want to proceed?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'secondary'} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant={'danger'} onClick={handleDeleteDiet}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            {!props.edit &&
                <Row>
                  <h2>Diets</h2>
                  <Divider/>
                </Row>
            }
            {diets.length === 0
                ? <h3>No diets available</h3>
                :
                <>
                    <ListGroup as={'ul'}>
                        {diets.map((diet) => {
                            return (
                                <ListGroupItem key={diet._id} as={'li'} className={'d-flex justify-content-between align-items-start'}>
                                    <div>
                                        <h5>{diet.fileName}</h5>
                                    </div>
                                    <div>
                                        <button className={'user-button download'}>
                                            <FontAwesomeIcon icon={faDownload} size={'xl'}/>
                                        </button>
                                        {props.edit &&
                                            <button className={'user-button delete'} onClick={() => handleModal(diet._id)}>
                                                <FontAwesomeIcon icon={faCircleXmark} size={'xl'}/>
                                            </button>
                                        }
                                    </div>
                                </ListGroupItem>
                            );
                        })}
                    </ListGroup>
                    {props.edit &&
                        <Row className={'text-center mt-3'}>
                            <Col lg={{span: 4, offset: 4}}>
                                <form onSubmit={onSubmit}>
                                    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                                    <Button type={'submit'} variant={'success'} className={'mt-3'}>
                                        Upload diet
                                    </Button>
                                </form>
                            </Col>
                        </Row>
                    }
                </>
            }
        </Container>
    );
}

export default Diets;