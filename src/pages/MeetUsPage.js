import React from "react";

import Divider from "../components/Divider";
import {Container} from "react-bootstrap";
import StaffCarousel from "../components/StaffCarousel";

const MeetUsPage = () => {
    return (
        <>
            <Container className={'mt-4'}>
                <h1 className={'text-center mb-3'}>Meet the team</h1>
                <Divider/>
                <StaffCarousel/>
                <Divider/>
            </Container>
        </>
    );
}

export default MeetUsPage;