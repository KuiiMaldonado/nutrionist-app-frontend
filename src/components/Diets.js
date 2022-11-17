import React, {useEffect, useState} from "react";
import axios from "axios";
import {FileUploader} from "react-drag-drop-files";
import {Col, Container, ListGroup, ListGroupItem, Row, Button} from "react-bootstrap";
import {useQuery, useMutation} from "@apollo/client";
import {GET_USER_DIETS} from "../utils/queries";
import {ADD_DIET} from "../utils/mutations";
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
    const [selectedFile, setSelectedFIle] = useState(null);
    const handleChange = (file) => {
        setSelectedFIle(file);
    };

    useEffect(() => {
        refetch().then();
    })

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
                                            <button className={'user-button delete'}>
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