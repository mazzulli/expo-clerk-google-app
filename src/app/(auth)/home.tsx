import {View, Text, StyleSheet } from 'react-native';

export default function Home(){
    return( 
        <View style={styles.container}>
            <Text style={styles.text}>Olá usuário!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 32,
        gap: 12,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold', 
    }
});