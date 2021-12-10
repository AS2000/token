import axios from "axios";

export const getJWTtoken = (userName: string, password: string) => {
    const api = 'https://app.swaggerhub.com/apis-docs/NFQ5/Application/1.0.0-oas3';
    axios.post(api, {
        Username: userName,
        Password: password,
    })
        .then(res => {
            console.log('data: ', res.data);
        })
        .catch((error) => {
            error.log('error: ', error);
    })
};
