import * as React from 'react';
import { SafeAreaView, Button, TextInput, View, Text, Image, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import { fetchJWTtoken } from '../../api/authentication';
import { useAppDispatch } from '../../redux/hooks';
import { IMAGE_URL } from '../../api/constants';
import { signinSchema } from '../../validationSchema';

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
            <Image style={{width: 100, height: 100}} source={{ uri: IMAGE_URL }} />
            <Formik
                initialValues={initialValues}
                validationSchema={signinSchema}
                onSubmit={values => {
                    console.log(values);
                    handleSubmit('john.doe@nfq.lt', 'johndoe');
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                    <TextInput
                        placeholder="Username (email)"
                        onChangeText={handleChange('userName')}
                        onBlur={handleBlur('userName')}
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        value={values.userName}
                    />
                    {
                        errors.userName && touched.userName && (
                            <Text style={{color: 'red'}}>{errors.userName}</Text>
                        )
                    }
                    <TextInput
                        placeholder="Password"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry
                        textContentType="password"
                        value={values.password}
                    />
                    {
                        errors.userName && touched.userName && (
                            <Text style={{color: 'red'}}>{errors.password}</Text>
                        )
                    }
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
