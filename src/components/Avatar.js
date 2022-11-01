import React from "react";

import profilePicture from '../assets/images/profilePicture.jpeg';
import {Image} from "react-bootstrap";

const Avatar = (props) => {
    return (
        <Image style={{width: props.size}} className={'rounded-circle'} src={profilePicture}/>
    );
}

export default Avatar;