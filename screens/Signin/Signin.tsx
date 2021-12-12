import * as React from 'react';
import { SafeAreaView, TextInput, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
                        style={styles.input}
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
                        style={styles.input}
                        value={values.password}
                    />
                    {
                        errors.userName && touched.userName && (
                            <Text style={{color: 'red'}}>{errors.password}</Text>
                        )
                    }
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.button}
                    >
                        <Text>
                            Submit
                        </Text>
                    </TouchableOpacity>

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
    input: {
        height: 40,
        width: 250,
        marginTop: 12,
        marginBottom: 2,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        height: 40,
        width: 250,
        marginTop: 20,
        alignItems: "center",
        backgroundColor: "#DDDDDD",
    },
  });

export default Signin;
