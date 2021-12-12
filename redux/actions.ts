import {
    SET_TOKEN,
    SET_NAME,
    SET_ADDRESS,
    SET_PHONE_NUMBER,
    SET_IS_LOADING,
    SET_IS_PORTRAIT,
} from './constants';

export const setToken = (payload:string | null) => {
    return {
        type: SET_TOKEN,
        payload,
    };
};

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

export const setIsLoading = (payload:boolean) => {
    return {
        type: SET_IS_LOADING,
        payload,
    };
};

export const setIsPortait = (payload:boolean) => {
    return {
        type: SET_IS_PORTRAIT,
        payload,
    };
};
