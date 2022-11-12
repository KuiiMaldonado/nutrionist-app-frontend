import React from "react";
import {Container, Row, Table} from "react-bootstrap";
import {faCircleXmark, faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import {useQuery, useMutation} from "@apollo/client";
import {DELETE_MEASURE} from "../utils/mutations";
import {GET_USER_MEASURES} from "../utils/queries";
import Divider from "./Divider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import '../assets/css/ManageUsers.css';
import LoadingSpinners from "./LoadingSpinners";

const Measures = (props) => {
    const {data, loading} = useQuery(GET_USER_MEASURES, {
        variables: {userId: props.userId}
    });
    const [deleteMeasure] = useMutation(DELETE_MEASURE);
    let measures;

    const handleDeleteMeasure = async (measureId) => {
        // try {
        //     console.log(measureId);
        //     const {data} = await deleteMeasure({
        //         variables: {
        //             measureId: measureId,
        //             userId: props.userId
        //         }
        //     });
        //     if (!data) {
        //         throw new Error('Something went wrong');
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    }

    if (!loading) {
        measures = data.getUserMeasures.userMeasures
        console.log(measures);
    }
    else {
        return (
            <LoadingSpinners/>
        );
    }
    return (
        <Container>
            {measures.length === 0
                ? <h3>No data available</h3>
                :
                <>
                    {!props.edit &&
                        <>
                        <Row>
                        <h2>Measures</h2>
                        </Row>
                        <Divider/>
                        </>
                    }
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
                                                        <button className={'user-button delete'} onClick={() => handleDeleteMeasure(measure._id)}>
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
            <Row className={'text-center'}>
                <button className={'user-button add'}>
                    <FontAwesomeIcon icon={faSquarePlus} size={'xl'}/>
                </button>
            </Row>
        </Container>
    );
}

export default Measures;