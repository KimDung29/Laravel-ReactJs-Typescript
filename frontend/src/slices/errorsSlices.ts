
import { createSlice } from '@reduxjs/toolkit';

export interface ErrorType {
  name?: string[];
	email?: string[];
  avatar?: string[];
	password?: string[];
	original?: string | null;

	color?: string[];
	long_desc?: string[];
	short_desc?: string[];
	price?: string[];
  image?: string[];
	quantity?: string[];
	size?: string[];
}


const initialError:ErrorType = {
  name: [],
	email: [],
  avatar: [],
	password: [],
	original: null,
  
  color: [],
	long_desc: [],
  short_desc: [],
  image: [],
	price: [],
	quantity: [],
	size: [],
};

interface InitialMessageType {
  errors: ErrorType;
  notification?: string | null;
}

const initialState: InitialMessageType = {
  errors: initialError,
  notification: null,
}
const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrors: (state, action) => {
      console.log('redux: ', action.payload)

      state.errors = {
        ...state.errors,
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        avatar: action.payload.avatar,
        original: action.payload.message,

        color: action.payload.color ,
        long_desc: action.payload.long_desc ,
        short_desc: action.payload.short_desc ,
        price: action.payload.price ,
        image: action.payload.image,
        quantity: action.payload.quantity ,
        size: action.payload.size ,

      }
    },

    setNotification: (state, action) => {
      console.log('notice: ', action.payload)
      state.notification = action.payload;
    },
  },
});

export const { 
  setErrors,
  setNotification
  } = errorsSlice.actions;


export default errorsSlice.reducer;
