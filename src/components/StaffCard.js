import React from "react";

const StaffCard = (props) => {
    return (
        <>
            <div className={'image-box'}>
                <img src={props.pathImage} alt={`metpro staff ${props.name}` }/>
            </div>
            <div className={'staff-details'}>
                <h3>{props.name}</h3>
                <span>{props.job}</span>
            </div>
        </>
    );
}

export default StaffCard;