import React from "react";
import {Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {useQuery} from "@apollo/client";
import {GET_USER_DIETS} from "../utils/queries";
import Divider from "./Divider";
import LoadingSpinners from "./LoadingSpinners";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";

import '../assets/css/ManageUsers.css';

const Diets = (props) => {
    const {data, loading, refetch} = useQuery(GET_USER_DIETS, {
        variables: {userId: props.userId}
    });
    let diets;

    if (!loading) {
        diets = data.getUserDiets.userDiets;
        console.log(diets);
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
                                        <button className={'user-button delete'}>
                                            <FontAwesomeIcon icon={faCircleXmark} size={'xl'}/>
                                        </button>
                                    </div>
                                </ListGroupItem>
                            );
                        })}
                    </ListGroup>
                </>
            }
        </Container>
    );
}

export default Diets;