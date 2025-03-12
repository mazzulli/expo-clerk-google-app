import { Button } from "@/components/Button";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser"
import * as AuthSession from 'expo-auth-session'
import { useSSO } from "@clerk/clerk-expo";

export const useWarmUpBrowser = () => {
    useEffect(() => {
      // Preloads the browser for Android devices to reduce authentication load time
      // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync()
      return () => {
        // Cleanup: closes browser when component unmounts
        void WebBrowser.coolDownAsync()
      }
    }, [])
}

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession()

export default function SignIn(){
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const {startSSOFlow} = useSSO()

    async function onGoogleSignIn(){
        try {
            setIsLoading(true)            
            
            const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
                strategy: 'oauth_google',
                // Defaults to current path
                redirectUrl: AuthSession.makeRedirectUri(),
              })
                // If sign in was successful, set the active session
                if (createdSessionId) {
                    setActive!({ session: createdSessionId })
                } else {
                    // If there is no `createdSessionId`,
                    // there are missing requirements, such as MFA
                    // Use the `signIn` or `signUp` returned from `startSSOFlow`
                    // to handle next steps
                    setIsLoading(false)
                    // 35:56 https://www.youtube.com/watch?v=XzuKLqJUR14
                }
        } catch (error) {
            console.log("ERRO NA ENTRADA: ", JSON.stringify(error, null, 2))
        }
    }

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Entrar</Text>
            <Button 
                icon="logo-google"
                title="Entrar com Google"
                isLoading={isLoading}
                onPress={onGoogleSignIn}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        gap: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})