import {gql} from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            password
            firstName
            lastName
            birthDate
            isAdmin
            profilePictureURL
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

export const GET_USER = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            email
            firstName
            lastName
            profilePictureURL
            userMeasures {
                _id
                date
                weight
                bodyFatPercentage
                leanBodyWeight
                bodyFat
                bodyType
            }
            userDiets {
                _id
                eTag
                fileName
            }
            userTrainings {
                _id
                eTag
                fileName
            }
        }
    }
`;

export const GET_ALL_USERS = gql`
    query users {
        users {
            _id
            firstName
            lastName
            email
        }
    }
`;

export const GET_USER_MEASURES = gql`
    query getUserMeasures($userId: ID!) {
        getUserMeasures(userId: $userId) {
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

export const GET_USER_DIETS = gql`
    query getUserDiets($userId: ID!) {
        getUserDiets(userId: $userId) {
            userDiets {
                _id
                eTag
                fileName
            }
        }
    }
`;

export const GET_USER_TRAININGS = gql`
    query getUserTrainings($userId: ID!) {
        getUserTrainings(userId: $userId) {
            userTrainings {
                _id
                eTag
                fileName
            }
        }
    }
`;