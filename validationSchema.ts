import * as Yup from 'yup';

export const signinSchema = Yup.object().shape({
    userName: Yup.string()
    .email('Please enter valid login email')
    .required('Email is required')
    .label('Username'),
    password: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .min(7, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .label('Password'),
    });
