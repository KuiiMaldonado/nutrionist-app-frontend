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
                profilePictureURL
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

export const ADD_MEASURE = gql `
    mutation addMeasure($userId: String!, $measureInput: addMeasureInput) {
        addMeasure(userId: $userId, measureInput: $measureInput) {
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

export const ADD_DIET = gql`
    mutation addDiet($userId: String!, $eTag: String!, $fileName: String!) {
        addDiet(userId: $userId, eTag: $eTag, fileName: $fileName) {
            userDiets {
                _id
                eTag
                fileName
            }
        }
    }
`;

export const DELETE_DIET = gql`
    mutation deleteDiet($userId: String!, $dietId: String!) {
        deleteDiet(userId: $userId, dietId: $dietId) {
            userDiets {
                _id
                eTag
                fileName
            }
        }
    }
`;

export const ADD_TRAINING = gql`
    mutation addTraining($userId: String!, $eTag: String!, $fileName: String!) {
        addTraining(userId: $userId, eTag: $eTag, fileName: $fileName) {
            userTrainings {
                _id
                eTag
                fileName
            }
        }
    }
`;

export const DELETE_TRAINING = gql`
    mutation deleteTraining($userId: String!, $trainingId: String!) {
        deleteTraining(userId: $userId, trainingId: $trainingId) {
            userTrainings {
                _id
                eTag
                fileName
            }
        }
    }
`;

export const UPDATE_PROFILE_PICTURE = gql`
    mutation updateProfilePicture($url: String!) {
        updateProfilePicture(url: $url) {
            profilePictureURL
        }
    }
`;