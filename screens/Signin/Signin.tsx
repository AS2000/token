import * as React from 'react';
import { SafeAreaView, Button, TextInput, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import { fetchJWTtoken } from '../../api/authentication';
import { useAppDispatch } from '../../redux/hooks';

const Signin: React.FC = () => {
    const dispatch = useAppDispatch();
    const handleSubmit = (userName: string, password: string) => {
        fetchJWTtoken(userName, password)(dispatch);
    };

    interface FormValues {
        userName: string;
        password: string;
    };

    const initialValues: FormValues = {
        userName: '',
        password: '',
    };

    return (
        <SafeAreaView style={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    console.log(values);
                    handleSubmit('john.doe@nfq.lt', 'johndoe');
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <TextInput
                        onChangeText={handleChange('userName')}
                        onBlur={handleBlur('userName')}
                        value={values.userName}
                    />
                    <TextInput
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />
                    <Button onPress={handleSubmit} title="Submit" />
                </View>
                )}
            </Formik>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });

export default Signin;
