import { Button } from '@/components/Button';
import { useAuth, useUser } from '@clerk/clerk-expo';
import {View, Text, StyleSheet, Image } from 'react-native';

export default function Home(){
    const { signOut } = useAuth()
    const { user } = useUser()
    return( 
        <View style={styles.container}>
            <Image source={{uri: user?.imageUrl}} style={styles.image} />
            <Text style={styles.text}>Olá {user?.fullName}</Text>
            <Button icon="exit" title='Sair' onPress={()=>signOut()} />
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
    },
    image: {
        height: 140,
        width: 140,
        borderRadius: 99
    }
});