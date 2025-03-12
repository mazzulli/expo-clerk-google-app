import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { Slot, router } from 'expo-router'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

function InitialLayout(){
    const { isSignedIn, isLoaded } = useAuth()
    
    if(isSignedIn){
      router.replace("/home")
    }else{
      console.log("Erro: ", isSignedIn )
    }    
    return <Slot />
  }

export default function Layout(){
    return (
        <ClerkProvider publishableKey={publishableKey}>
            <InitialLayout />      
        </ClerkProvider>
      )
}