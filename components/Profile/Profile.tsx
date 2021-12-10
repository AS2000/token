import * as React from 'react';

import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

const Profile: React.FC = () => (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <Text>
                Profile
            </Text>
        </View>
    </SafeAreaView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250,
    },
  });

export default Profile;
