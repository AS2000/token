import * as React from 'react';
import {
    SafeAreaView,
    TextInput,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    useWindowDimensions,
} from 'react-native';
import { Formik } from 'formik';

import { fetchJWTtoken } from '../../api/authentication';
import { useAppDispatch } from '../../redux/hooks';
import { IMAGE_URL } from '../../api/constants';
import { signinSchema } from '../../validationSchema';
import { isPortrait } from '../../helper/platform';
import { setIsPortait } from '../../redux/actions';

const Signin: React.FC = () => {
    const window = useWindowDimensions();
    console.log('window: ', window);

    const dispatch = useAppDispatch();
    const handleSubmit = (userName: string, password: string) => {
        fetchJWTtoken(userName, password)(dispatch);
    };

    React.useEffect(() => {
        dispatch(setIsPortait(isPortrait(window)))
    },[window]);

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
            <View style={styles.viewItems}>
                <Image style={styles.image} source={{ uri: IMAGE_URL }} />
                <Formik
                    initialValues={initialValues}
                    validationSchema={signinSchema}
                    onSubmit={values => {
                        console.log(values);
                        handleSubmit('john.doe@nfq.lt', 'johndoe');
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.viewItems}>
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
                        <Text>
                            Dimensions = {JSON.stringify(Dimensions.get('screen'))}{'\n'}
                            isPortrait = {isPortrait(window) ? 'true\n' : 'false\n'}
                        </Text>
                    </View>
                    )}
                </Formik>
                </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    viewItems: {
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
