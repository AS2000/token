import * as React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { logout } from '../../api/authentication';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { IMAGE_URL } from '../../api/constants';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const isPortait = useAppSelector(state => state.isPortait);
    const handleLogout = async () => {
        logout()(dispatch);
    };
    const name = useAppSelector(state => state.name);
    const address = useAppSelector(state => state.address);
    const phoneNumber = useAppSelector(state => state.phoneNumber);

    const renderButton = () => (
    <TouchableOpacity
        onPress={handleLogout}
        style={styles.button}
    >
        <Text>
            LOGOUT
        </Text>
    </TouchableOpacity>
    );

    const renderImage = () => (
        <View style={styles.imageBlock}>
            <Image style={
                isPortait
                    ? styles.portraitImage
                    : styles.landscapeImage
                }
                source={{ uri: IMAGE_URL }}
            />
        </View>
    );

    const renderDataFields = () => (
        <View style={styles.dataBlock}>
            <Text style={styles.dataLine}>{name}</Text>
            <Text style={styles.dataLine}>{address}</Text>
            <Text style={styles.dataLine}>{phoneNumber}</Text>
        </View>
    );

    const renderLandscapeDataColumn = () => (
        <View>
            { renderButton() }
            { renderDataFields() }
        </View>
    )

    const renderPortrait = () => (
        <View style={styles.dataBlock}>
            <View style={styles.portraitButton}>{ renderButton() }</View>
            { renderImage() }
            { renderDataFields() }
        </View>
    );

    const renderLandscape = () => (
        <View style={ styles.landscapeView }>
            <View style={ styles.landscapeColumn }>{ renderImage() }</View>
            <View style={ styles.landscapeColumn }>{ renderLandscapeDataColumn() }</View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
            {
                isPortait
                    ? renderPortrait()
                    : renderLandscape()
            }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    landscapeView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    landscapeColumn: {
        maxWidth: '50%',
        flexDirection: 'column',
    },
    imageBlock: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    landscapeImage: {
        width: 200,
        height: 200,
    },
    portraitImage: {
        width: 300,
        height: 300,
    },
    dataBlock: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dataLine: {
        paddingTop: 20,
        fontSize: 16,
    },
    portraitButton: {
        alignSelf: 'flex-end',
        paddingBottom: 20,
    },
    button: {
        height: 40,
        width: 60,
        marginTop: 20,
        alignItems: 'flex-end',
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
    },
  });

export default Profile;
