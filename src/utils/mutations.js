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