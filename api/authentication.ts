import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setIsLoading, setToken } from '../redux/actions';
import { IAction } from '../redux/reducer';

const API = 'https://vidqjclbhmef.herokuapp.com/credentials';

export const fetchJWTtoken = (userName: string, password: string) => async (dispatch: Dispatch<IAction>) => {
    dispatch(setIsLoading(true));
    await axios.post(API, {
        username: userName,
        password: password,
    })
        .then((res: AxiosResponse<any>) => {
            dispatch(setIsLoading(false));
            dispatch(setToken(res.data.token));
            AsyncStorage.setItem('token', res.data.token);
        })
        .catch((error: AxiosError<any>) => {
            dispatch(setIsLoading(false));
            console.log('error: ', error);
    })
};

export const logout = () => async (dispatch: Dispatch<IAction>) => {
    dispatch(setToken(null));
    await AsyncStorage.removeItem('token');
};
