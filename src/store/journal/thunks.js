import { collection,deleteDoc,doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNote, setPhotosToActiveNote, setSaving, updatedNote } from "./";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote=()=>async(dispatch,getState)=>{

    dispatch(savingNewNote())
    //uid
    const {uid}=getState().auth;

    const newNote={
        title:'',
        body:'',
        date: new Date().getTime(),
        imageUrls:[]
    }

    const newDoc= doc(collection(FirebaseDB,`${uid}/journal/notes`));

    await setDoc(newDoc,newNote);

    newNote.id= newDoc.id;

    //!dispatch
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
}

 export const startLoadingNotes=()=>async(dispatch,getState)=>{
    const {uid}=getState().auth;
    if(!uid)throw new Error('El UID del usuario no existe');

    const notes=await loadNotes(uid);
    dispatch(setNote(notes));
 }


export const startSaveNote=()=>async(dispatch,getState)=>{

    dispatch(setSaving());

    const {uid}=getState().auth;
    const {activeNote:note}=getState().journal;

    const noteToFirestore = {...note};
    delete noteToFirestore.id;

    const docRef=doc(FirebaseDB,`${uid}/journal/notes/${note.id}`);
    await setDoc(docRef,noteToFirestore,{merge:true});
    dispatch(updatedNote(note));
}

export const startUpLoadingFiles=(files=[])=>async(dispatch)=>{
    dispatch(setSaving());

    const fileUploadPromises=[];
    for (const file of files){
        fileUploadPromises.push(fileUpload(file));
    }


    const photoUrls = await Promise.all(fileUploadPromises);
    
    dispatch(setPhotosToActiveNote(photoUrls));

}

export const startDeletingNote=()=>async(dispatch,getState)=>{
    const {uid}=getState().auth;
    const {activeNote}=getState().journal;

    const docRef=doc(FirebaseDB,`${uid}/journal/notes/${activeNote.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(activeNote.id));
}

//  export const startActiveNote=(id)=>async(dispatch)=>{
//     const currentNote=
//     dispatch(setActiveNote(currentNote))
//  }