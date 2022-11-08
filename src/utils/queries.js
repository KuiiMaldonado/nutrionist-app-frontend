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