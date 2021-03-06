import * as React from 'react';
import {
    SafeAreaView,
    TextInput,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    useWindowDimensions,
} from 'react-native';
import { Formik } from 'formik';

import { setIsPortait } from '../../redux/actions';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchJWTtoken } from '../../api/authentication';
import { IMAGE_URL } from '../../api/constants';
import { signinSchema } from '../../validationSchema';
import { isPortrait } from '../../helper/platform';


const Signin: React.FC = () => {
    const dispatch = useAppDispatch();
    const window = useWindowDimensions();
    const isPortait = useAppSelector(state => state.isPortait);
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

    const renderImage = () => (
        <Image style={
            isPortait
                ? styles.portraitImage
                : styles.landscapeImage
            }
            source={{ uri: IMAGE_URL }}
        />
    );

    const renderInputFields = ({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.inputBlock}>
            <TextInput
                placeholder='Username'
                onChangeText={handleChange('userName')}
                onBlur={handleBlur('userName')}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                style={styles.input}
                value={values.userName}
            />
            {
                errors.userName && touched.userName && (
                    <Text style={{color: 'red'}}>{errors.userName}</Text>
                )
            }
            <TextInput
                placeholder='Password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry
                textContentType='password'
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
    );

    const renderPortrait = props => (
        <View style={styles.portraitView}>
            { renderImage() }
            { renderInputFields(props) }
        </View>
    );

    const renderLandscape = props => (
        <View style={ styles.landscapeView }>
            <View style={ styles.landscapeColumn }>{ renderImage() }</View>
            <View style={ styles.landscapeColumn }>{ renderInputFields(props) }</View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={signinSchema}
                    onSubmit={values => {
                        handleSubmit(values.userName, values.password); // 'john.doe@nfq.lt', 'johndoe'
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        {
                            isPortait
                                ? renderPortrait({ handleChange, handleBlur, handleSubmit, values, errors, touched })
                                : renderLandscape({ handleChange, handleBlur, handleSubmit, values, errors, touched })
                        }
                    </View>
                    )}
                </Formik>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    landscapeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    landscapeColumn: {
        maxWidth: '50%',
        flexDirection: 'column',
        padding: 40,
    },
    portraitView: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    landscapeImage: {
        width: 200,
        height: 200,
    },
    portraitImage: {
        width: 100,
        height: 100,
        marginVertical: 60,
    },
    inputBlock: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        textAlign: 'center',
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
        justifyContent: 'center',
    },
  });

export default Signin;
