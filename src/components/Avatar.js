import React from "react";
import {useQuery} from "@apollo/client";
import {GET_ME} from "../utils/queries";

import profilePicture from '../assets/images/defaultProfilePicture.jpeg';
import {Image} from "react-bootstrap";
import LoadingSpinners from "./LoadingSpinners";

const Avatar = (props) => {
    const {loading, data} = useQuery(GET_ME);
    if (loading) {
        return (
            <LoadingSpinners/>
        );
    }
    return (
        <Image style={{width: props.size, height: props.size, objectFit: 'cover'}}
               className={'rounded-circle'}
               src={data.me.profilePictureURL || profilePicture}
        />
    );
}

export default Avatar;