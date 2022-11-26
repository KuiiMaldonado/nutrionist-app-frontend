import React from "react";
import Divider from "../components/Divider";
import Location from "../components/Location";
import ContactUsForm from "../components/ContactUsForm";
import SocialMedia from "../components/SocialMedia";

const ContactUsPage = () => {
    return (
        <>
            <h1 className={'text-center'}>Get in touch...</h1>
            <ContactUsForm/>
            <Divider/>
            <Location/>
            <Divider/>
            <SocialMedia/>
        </>
    );
}

export default ContactUsPage;