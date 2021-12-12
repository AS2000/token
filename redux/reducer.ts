import {
    SET_TOKEN,
    SET_NAME,
    SET_ADDRESS,
    SET_PHONE_NUMBER,
    SET_IS_LOADING,
    SET_IS_PORTRAIT,
} from './constants';

interface IState {
    token: string | null,
    name: string,
    address: string,
    phoneNumber: string,
    isLoading: boolean,
    isPortait: boolean,
};

const initialState: IState = {
    token: null,
    name: 'John Doe', // TODO set an empty string when API will be added
    address: 'Adress line', // TODO set an empty string when API will be added
    phoneNumber: '+370 xxx xxxxx', // TODO set an empty string when API will be added
    isLoading: false,
    isPortait: true,
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
    case SET_IS_PORTRAIT:
        return { ...state, isPortait: action.payload };
    default:
        return state;
    };
};

export default rootReducer;
