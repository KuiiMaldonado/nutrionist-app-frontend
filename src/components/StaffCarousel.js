import React from "react";
import {Container} from "react-bootstrap";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, EffectCoverflow} from 'swiper'

import staff_image_1 from "../assets/images/staff_1.jpeg";
import staff_image_2 from '../assets/images/staff_2.jpeg'
import staff_image_3 from '../assets/images/staff_3.jpeg'
import staff_image_4 from '../assets/images/staff_4.jpeg'
import staff_image_5 from '../assets/images/staff_5.jpeg'
import staff_image_6 from '../assets/images/staff_6.jpeg'

import 'swiper/css/bundle';
import '../assets/css/Staff.css';
import StaffCard from "./StaffCard";

const StaffMembers = [
    {
        name: 'Natalie Hart',
        job: 'Coach',
        pathImage: staff_image_1
    },
    {
        name: 'Noah Davis',
        job: 'Coach',
        pathImage: staff_image_2
    },{
        name: 'Scarlet Duncan',
        job: 'Nutritionist',
        pathImage: staff_image_3
    },{
        name: 'Charles Romero',
        job: 'Coach',
        pathImage: staff_image_4
    },{
        name: 'Abbie Blaese',
        job: 'Coach',
        pathImage: staff_image_5
    },{
        name: 'Marshall Crawford',
        job: 'Nutritionist',
        pathImage: staff_image_6
    },
]

const StaffCarousel = () => {
    return (
        <Container>
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              effect={'coverflow'}
              coverflowEffect={{
                  rotate: 50,
                  stretch: 10,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
              }}
              grabCursor={true}
              navigation={true}
              slidesPerView={"auto"}
              centeredSlides={true}
              loop={true}
              pagination={{clickable: true, type: 'bullets'}}
            >
                {StaffMembers.map((member, index) => {
                    return (
                      <SwiperSlide key={index}>
                          <StaffCard name={member.name} job={member.job} pathImage={member.pathImage}/>
                      </SwiperSlide>
                    );
                })}
            </Swiper>
        </Container>
    );
}

export default StaffCarousel;