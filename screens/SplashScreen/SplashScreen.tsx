import * as React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

const SplashScreen: React.FC  = () => (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <Text>
            Signin
            </Text>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });

export default SplashScreen;
