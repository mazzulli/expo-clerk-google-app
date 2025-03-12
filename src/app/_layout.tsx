import { tokenCache } from '@/storage/tokenCache'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { Slot, router } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

function InitialLayout(){
    const { isSignedIn, isLoaded } = useAuth()
    
    useEffect(()=>{
      if(!isLoaded) return

      if(isSignedIn){
        router.replace("/home")
      }else{
        console.log("ESTÁ LOGADO: ", isSignedIn )
        router.replace("/(public)")
      }    
    },[isSignedIn])
    
    return isLoaded ? (
      <Slot /> ):(
        <ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} size={40} color="#121212" />
    ) 
  }

export default function Layout(){
    return (
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            <InitialLayout />      
        </ClerkProvider>
      )
}