import React from "react";
import {Container} from "react-bootstrap";

import Slides from "../components/Slides";
import Services from "../components/Services";
import Divider from "../components/Divider";
import Featurette from "../components/Featurette";

import featurette_image_1 from '../assets/images/featurette_1.jpg'
import featurette_image_2 from '../assets/images/featurette_2.jpg';
import featurette_image_3 from '../assets/images/featurette_3.jpg';
import SocialMedia from "../components/SocialMedia";

const featurettes = [
    {
        position: 'left',
        heading: 'Featurette heading',
        description: 'Donec ullamcorper nulla non metus auctor fringilla.\n' +
            'Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque\n' +
            'nisl consectetur. Fusce dapibus, tellus ac cursus commodo.',
        pathImage: featurette_image_1,
    },
    {
        position: 'right',
        heading: 'Featurette heading',
        description: 'Donec ullamcorper nulla non metus auctor fringilla.\n' +
            'Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque\n' +
            'nisl consectetur. Fusce dapibus, tellus ac cursus commodo.',
        pathImage: featurette_image_2,
    },
    {
        position: 'left',
        heading: 'Featurette heading',
        description: 'Donec ullamcorper nulla non metus auctor fringilla.\n' +
            'Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque\n' +
            'nisl consectetur. Fusce dapibus, tellus ac cursus commodo.',
        pathImage: featurette_image_3,
    },
];

const MainPage = () => {
    return (
        <>
            <Slides/>
            <Container className={'mt-4'}>
                <Services/>
                <Divider/>
                {featurettes.map((element, index) => {
                    return (
                        <div key={index}>
                            <Featurette position={element.position} heading={element.heading} description={element.description} pathImage={element.pathImage}/>
                            <Divider/>
                        </div>
                    );
                })}
            </Container>
            <SocialMedia/>
        </>
    );
}

export default MainPage;