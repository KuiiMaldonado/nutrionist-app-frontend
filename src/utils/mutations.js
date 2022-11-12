import {gql} from "@apollo/client";

export const LOGIN_USER = gql `
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                firstName
                lastName
            }
        }
    }
`;

export const ADD_PROFILE = gql`
    mutation addProfile($userInput: updatedProfileInput) {
        addProfile(userInput: $userInput) {
            username
            email
            firstName
            lastName
        }
    }
`;

export const UPDATE_PROFILE = gql `
    mutation updateProfile($userInput: updatedProfileInput) {
        updateProfile(userInput: $userInput) {
            username
            email
            firstName
            lastName
        }
    }
`;

export const DELETE_PROFILE = gql`
    mutation deleteProfile($userId: String!) {
        deleteProfile(userId: $userId) {
            username
        }
    }
`;

export const DELETE_MEASURE = gql`
    mutation deleteMeasure($measureId: String!, $userId: String!) {
        deleteMeasure(measureId: $measureId, userId: $userId) {
            userMeasures {
                _id
                date
                weight
                bodyFatPercentage
                leanBodyWeight
                bodyFat
                bodyType
            }
        }
    }
`;