import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Alert, Button, Container, Modal, Row} from "react-bootstrap";
import {FileUploader} from "react-drag-drop-files";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useMutation} from "@apollo/client";
import {UPDATE_PROFILE_PICTURE} from "../utils/mutations";
import {faUser, faAt, faGear, faUtensils, faDumbbell, faUsersGear, faWeightScale, faPencil} from '@fortawesome/free-solid-svg-icons';
import Avatar from "./Avatar";
import Divider from "./Divider";
import axios from "axios";

import '../assets/css/ProfileSections.css';
import LoadingSpinners from "./LoadingSpinners";

const fileTypes = ['JPG', 'JPEG'];
let baseUrl;
if (process.env.NODE_ENV === 'production')
    baseUrl = process.env.REACT_APP_BACKEND_SERVER;
else
    baseUrl = 'http://localhost:3001';

const ProfileSections = (props) => {
    const [updatedProfilePicture] = useMutation(UPDATE_PROFILE_PICTURE);
    const [showModal, setShowModal] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const handleChange = (file) => setSelectedPicture(file);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleEditPicture = () => {
        handleShow();
    }

    const handleUploadProfilePicture = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsUploading(true);
        const formData = new FormData();
        formData.append('uploaded-picture', selectedPicture);
        formData.append('userId', props.userData._id);
        try {
            let url = baseUrl + '/api/uploadProfilePicture';
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            await updatedProfilePicture({
                variables: {
                    url: response.data.location
                }
            });
            setShowSuccessAlert(true);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container>
            <Modal centered show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update your picture</Modal.Title>
                </Modal.Header>
                <Alert variant={'success'} show={showSuccessAlert}>Profile picture updated!</Alert>
                <Modal.Body>
                    {isUploading ? (
                        <LoadingSpinners/>
                    ) : (
                        <form onSubmit={handleUploadProfilePicture} className={'text-center'}>
                            <FileUploader handleChange={handleChange} name='file' types={fileTypes}/>
                            <Button type={'submit'} variant={'success'} className={'mt-3'}>
                                Update
                            </Button>
                        </form>
                    )}
                </Modal.Body>
            </Modal>
            <Row className={'mt-4'} id={'profile-picture'}>
                <Avatar size={'200px'}/>
            </Row>
            <Row className={'mt-3'}>
                <Button variant={'primary'} onClick={() => handleEditPicture()}>
                    <FontAwesomeIcon icon={faPencil} size={'xl'}/>
                    <span>Edit picture</span>
                </Button>
            </Row>
            <Row className={'mt-2'}>
                <h4>{`${props.userData.firstName} ${props.userData.lastName}`}</h4>
            </Row>
            <Row className={'mt-1'}>
                <span className={'d-inline-flex'}>
                    <FontAwesomeIcon icon={faUser} size={'xl'}/>
                    <h5 className={'ms-2'}>{`${props.userData.username}`}</h5>
                </span>
            </Row>
            <Row className={'mt-1'}>
                <span className={'d-inline-flex'}>
                    <FontAwesomeIcon icon={faAt} size={'xl'}/>
                    <h5 className={'ms-2'}>{`${props.userData.email}`}</h5>
                </span>
            </Row>
            <Divider/>
            <Row className={'mt-1 sectionRow'}>
                <Link to={'/profile/measures'} className={'d-inline-flex'}>
                    <FontAwesomeIcon icon={faWeightScale} size={'xl'}/>
                    <h5 className={'ms-2'}>Measures</h5>
                </Link>
            </Row>
            <Row className={'mt-1 sectionRow'}>
                <Link to={'/profile/diets'} className={'d-inline-flex'}>
                    <FontAwesomeIcon icon={faUtensils} size={'xl'}/>
                    <h5 className={'ms-2'}>Diets</h5>
                </Link>
            </Row>
            <Row className={'mt-1 sectionRow'}>
                <Link to={'/profile/trainings'} className={'d-inline-flex'}>
                    <FontAwesomeIcon icon={faDumbbell} size={'xl'}/>
                    <h5 className={'ms-2'}>Trainings</h5>
                </Link>
            </Row>
            <Divider/>
            <Row className={'mt-1 sectionRow'}>
                <Link to={'/profile/settings'} className={'d-inline-flex'}>
                    <FontAwesomeIcon icon={faGear} size={'xl'}/>
                    <h5 className={'ms-2'}>Account</h5>
                </Link>
            </Row>
            {props.userData.isAdmin && (
                <>
                    <Divider/>
                    <Row className={'mt-1 sectionRow'}>
                        <Link to={'/profile/manage'} className={'d-inline-flex'}>
                            <FontAwesomeIcon icon={faUsersGear} size={'xl'}/>
                            <h5 className={'ms-2'}>Manage users</h5>
                        </Link>
                    </Row>
                </>
            )}
        </Container>
    );
}

export default ProfileSections;