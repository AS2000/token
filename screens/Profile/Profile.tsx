import * as React from 'react';
import { SafeAreaView, Button, Text, View, Image, StyleSheet } from 'react-native';

import { logout } from '../../api/authentication';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { IMAGE_URL } from '../../api/constants';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const handleLogout = async () => {
        logout()(dispatch);
    };
    const name = useAppSelector(state => state.name);
    const address = useAppSelector(state => state.address);
    const phoneNumber = useAppSelector(state => state.phoneNumber);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Button onPress={handleLogout} title="Logout" />
                <Image style={{width: 300, height: 300}} source={{ uri: IMAGE_URL }} />
                <Text>{name}</Text>
                <Text>{address}</Text>
                <Text>{phoneNumber}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });

export default Profile;
