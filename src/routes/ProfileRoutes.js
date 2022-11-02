import ProfilePage from "../pages/ProfilePage";
import Measures from "../components/Measures";
import {Routes, Route} from "react-router-dom";
import React from "react";

const ProfileRoutes = () => {
    return (
        <>
            <ProfilePage/>
            <Routes>
                <Route path={'measures'} element={<Measures/>}/>
                <Route path={'diets'}/>
                <Route path={'trainings'}/>
                <Route path={'settings'}/>
            </Routes>
        </>
    )
}

export default ProfileRoutes;