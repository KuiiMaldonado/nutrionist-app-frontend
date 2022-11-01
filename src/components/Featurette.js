import React from "react";
import '../assets/css/Featurette.css';

const Featurette = (props) => {
    if (props.position === 'left') {
        return (
            <div className={'row featurette'}>
                <div className={'col-lg-7'}>
                    <h1>
                        {props.heading}
                    </h1>
                    <p>
                        {props.description}
                    </p>
                </div>
                <div className={'col-lg-5'}>
                    <img src={props.pathImage} alt={'...'}/>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className={'row featurette'}>
                <div className={'col-lg-5'}>
                    <img src={props.pathImage} alt={'...'}/>
                </div>
                <div className={'col-lg-7'}>
                    <h1>
                        {props.heading}
                    </h1>
                    <p>
                        {props.description}
                    </p>
                </div>
            </div>
        );
    }
}

export default Featurette;