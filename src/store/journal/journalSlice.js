import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: { 
        isSaving:false,
        messageSaved:'',
        notes:[],
        activeNote: null
     },
    reducers: {  
        savingNewNote:(state)=>{
            state.isSaving=true;
        },
        addNewEmptyNote: (state,{payload})=>{
            state.notes.push(payload);
            state.isSaving=false;
        },
        setActiveNote:(state,{payload})=>{
            state.activeNote=payload;
            state.messageSaved='';
        },
        setNote:(state,{payload})=>{
            state.notes=payload;
        },
        setSaving:(state)=>{
            state.isSaving=true;
            state.messageSaved='';
        },
        updatedNote:(state,{payload})=>{
            state.isSaving=false;
            state.notes[state.notes.findIndex(note=>note.id==payload.id)]={...payload};
            state.messageSaved=`${payload.title}, Actualizada correctamente`;
        },
        setPhotosToActiveNote:(state, {payload})=>{
            state.activeNote.imageUrls=[...state.activeNote.imageUrls,...payload];
            state.isSaving=false;
        },
        clearNotesLogout:(state)=>{
            state.isSaving=false;
            state.messageSaved='';
            state.notes=[];
            state.activeNote=null;
        },
        deleteNoteById:(state,{payload})=>{
            state.activeNote=null;
            state.notes=state.notes.filter(note=>note.id!==payload);
        }
    },
});

export const {savingNewNote,addNewEmptyNote,setActiveNote,setNote,setSaving,updatedNote,deleteNoteById,setPhotosToActiveNote,clearNotesLogout} = journalSlice.actions;