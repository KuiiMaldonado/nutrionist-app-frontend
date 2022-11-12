import React, {useEffect, useState} from "react";
import {Button, Container, Modal, Row, Table} from "react-bootstrap";
import {faCircleXmark, faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import {useQuery, useMutation} from "@apollo/client";
import {DELETE_MEASURE} from "../utils/mutations";
import {GET_USER_MEASURES} from "../utils/queries";
import Divider from "./Divider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import '../assets/css/ManageUsers.css';
import LoadingSpinners from "./LoadingSpinners";

const Measures = (props) => {
    const {data, loading, refetch} = useQuery(GET_USER_MEASURES, {
        variables: {userId: props.userId}
    });
    const [deleteMeasure] = useMutation(DELETE_MEASURE);
    const [showModal, setShowModal] = useState(false);
    const [measureId, setMeasureId] = useState('');
    let measures;

    useEffect(() => {
        refetch().then();
    });
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleModal = (measureId) => {
        handleShow();
        setMeasureId(measureId);
    }

    const handleDeleteMeasure = async () => {
        try {
            const {data} = await deleteMeasure({
                variables: {
                    measureId: measureId,
                    userId: props.userId
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

    if (!loading) {
        measures = data.getUserMeasures.userMeasures
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
                    <h5>Deleting measure</h5>
                    <p>
                        You are about to delete the user's measure. This action can not be undone.
                        Do you want to proceed?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'secondary'} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant={'danger'} onClick={handleDeleteMeasure}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            {!props.edit &&
                <>
                    <Row>
                        <h2>Measures</h2>
                    </Row>
                    <Divider/>
                </>
            }
            {measures.length === 0
                ? <h3>No data available</h3>
                :
                <>
                    <div className={'table-responsive'}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Weight</th>
                                    <th>Body Fat %</th>
                                    <th>Lean Body Weight</th>
                                    <th>Body Fat</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {measures.map((measure) => {
                                    return (
                                        <tr key={measure._id}>
                                            <td>{measure.date}</td>
                                            <td>{measure.weight}</td>
                                            <td>{measure.bodyFatPercentage}</td>
                                            <td>{measure.leanBodyWeight}</td>
                                            <td>{measure.bodyFat}</td>
                                            <td>{measure.bodyType}</td>
                                            {props.edit &&
                                                <>
                                                    <td>
                                                        <button className={'user-button delete'} onClick={() => handleModal(measure._id)}>
                                                            <FontAwesomeIcon icon={faCircleXmark} size={'xl'}/>
                                                        </button>
                                                    </td>
                                                </>
                                            }
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                </>
            }
            {props.edit &&
                <Row className={'text-center'}>
                    <button className={'user-button add'}>
                        <FontAwesomeIcon icon={faSquarePlus} size={'xl'}/>
                    </button>
                </Row>
            }
        </Container>
    );
}

export default Measures;