import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider= new GoogleAuthProvider();

export const signInWithGoogle= async()=>{
    try {
        const result= await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials=GoogleAuthProvider.credentialFromResult(result);
        // const user=result.user;
        const {displayName,email,photoURL,uid}=result.user;
        return {
            ok:true,
            //User info
            displayName,
            email,
            photoURL,
            uid,
        }
    }catch(error){
        const errorCode=error.code;
        const errorMessage=error.message;
        // const email=error.customData.email;
        // const credential=GoogleAuthProvider.credentialFromError(error);
        return {
            ok:false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword= async({email,password,displayName})=>{
    try {
        const resp= await createUserWithEmailAndPassword(FirebaseAuth,email,password);
        const {uid,photoURL}=resp.user;
        // TODO: actualizar el displayName en Firebase
        await updateProfile(FirebaseAuth.currentUser,{displayName});
        return {
            ok:true,
            uid,photoURL,email,displayName
        }
    } catch (error) {
        //* Aca podria hacer lógica para manejar los errores de firebase en español
        return {ok:false,errorMessage:error.message}
    }
}

//!Login
export const loginWithEmailPassword=async({emailToPut,password})=>{
    try {
        const resp=await signInWithEmailAndPassword(FirebaseAuth,emailToPut,password);
        const{displayName,email,photoURL,uid}=resp.user;
        return{
            ok:true,
            displayName,email,photoURL,uid
        }
    } catch (error) {
        return {ok:false,errorMessage:error.message}
    }
}

//!logout
export const logoutFirebase= async()=>{
    return await FirebaseAuth.signOut();
}