
import { createSlice } from '@reduxjs/toolkit';

export interface InitialMessageType {
  nameError?: string[];
	emailError?: string[];
  avatarError?: string[];
	passwordError?: string[];
	original?: string | null;
  notification?: string | null;
}

const initialState:InitialMessageType = {
  nameError: [],
	emailError: [],
  avatarError: [],
	passwordError: [],
	original: null,
  notification: null,
};

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setNameError: (state, action) => {
      state.nameError = action.payload;
    },
    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    setAvatarError: (state, action) => {
      state.avatarError = action.payload;
    },
    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
    setOriginal: (state, action) => {
      state.original = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { 
  setNameError,
  setEmailError ,
  setAvatarError,
  setPasswordError,
  setOriginal,
  setNotification,
  } = errorsSlice.actions;


export default errorsSlice.reducer;
