import React from "react";
import {useLocation} from "react-router-dom";
import Auth from "../utils/auth";

const EditUser = () => {
    if (!Auth.loggedIn()) {
        window.location.assign('/login');
    }

    if (!Auth.isAdmin()) {
        window.location.assign('/profile');
    }

    const {state} = useLocation();
    const {id} = state;
    return (
        <h1>Edit user {id}</h1>
    );
}

export default EditUser;