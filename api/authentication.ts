import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setIsLoading } from '../redux/actions';
import { IAction } from '../redux/reducer';

export const fetchJWTtoken = (userName: string, password: string) => async (dispatch: Dispatch<IAction>) => {
    const api = 'https://vidqjclbhmef.herokuapp.com/credentials';

    dispatch(setIsLoading(true));
    await axios.post(api, {
        username: userName,
        password: password,
    })
        .then((res: AxiosResponse<any>) => {
            dispatch(setIsLoading(false));
            AsyncStorage.setItem('token', res.data.token);
        })
        .catch((error: AxiosError<any>) => {
            dispatch(setIsLoading(false));
            console.log('error: ', error);
    })
};
