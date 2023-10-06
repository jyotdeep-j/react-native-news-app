import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
import NewsScreen from '../News';

interface HomeScreenProps {
    navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <NewsScreen />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        paddingTop: 20,
        paddingHorizontal: 16
    },
    heading: {
        textAlign: 'center',
    }
})


export default HomeScreen;


