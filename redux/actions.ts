import {
    SET_NAME,
    SET_ADDRESS,
    SET_PHONE_NUMBER,
    SET_IS_FETCHING,
} from './constants';

export const setName = (payload:string) => {
    return {
        type: SET_NAME,
        payload,
    };
};

export const setAddress = (payload:string) => {
    return {
        type: SET_ADDRESS,
        payload,
    };
};

export const setPhoneNumber = (payload:string) => {
    return {
        type: SET_PHONE_NUMBER,
        payload,
    };
};

export const setIsFetching = (payload:boolean) => {
    return {
        type: SET_IS_FETCHING,
        payload,
    };
};
