import {
    SET_TOKEN,
    SET_NAME,
    SET_ADDRESS,
    SET_PHONE_NUMBER,
    SET_IS_LOADING,
    SET_IS_SIGNOUT,
} from './constants';

interface IState {
    token: string | null,
    name: string,
    address: string,
    phoneNumber: string,
    isLoading: boolean,
    isSignout: boolean,
};

const initialState: IState = {
    token: null,
    name: '',
    address: '',
    phoneNumber: '',
    isLoading: false,
    isSignout: false,
};

export interface IAction {
    type: string,
    payload: any,
};

const rootReducer = (state = initialState, action:IAction): IState => {
    switch(action.type) {
    case SET_TOKEN:
        return { ...state, token: action.payload };
    case SET_NAME:
        return { ...state, name: action.payload };
    case SET_ADDRESS:
        return { ...state, address: action.payload };
    case SET_PHONE_NUMBER:
        return { ...state, phoneNumber: action.payload };
    case SET_IS_LOADING:
        return { ...state, isLoading: action.payload };
    case SET_IS_SIGNOUT:
        return { ...state, isSignout: action.payload };
    default:
        return state;
    };
};

export default rootReducer;
