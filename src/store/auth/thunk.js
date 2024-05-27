import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication=(email,password)=>async (dispatch)=>{
    dispatch(checkingCredentials())
}


export const startGoogleSignIn=()=>async (dispatch)=>{
    dispatch(checkingCredentials());
    const result=await signInWithGoogle();
    if(!result.ok)return dispatch(logout(result.errorMessage));
    dispatch(login(result));
}


export const startCreatingUserWithEmailPassword=({email,password,displayName})=>async(dispatch)=>{
        dispatch(checkingCredentials());
        const {ok,uid,photoURL,errorMessage}=await registerUserWithEmailPassword({email,password,displayName});

        if (!ok) return dispatch(logout({errorMessage}));
        dispatch(login({uid,displayName,email,photoURL}));
    }
    
//!Login
export const startLoginWithEmailPassword=(emailToPut,password)=>async(dispatch)=>{
    dispatch(checkingCredentials());
    const response=await loginWithEmailPassword({emailToPut,password})
    if (!response.ok) return dispatch(logout(response));
    dispatch(login(response));
}

//!logout
export const startLogout =()=>async(dispatch)=>{
    await logoutFirebase();
    dispatch(logout())
}
