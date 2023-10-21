

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import errorsReducer from './slices/errorsSlices';


export const store = configureStore({
  reducer: {
    user: userReducer,
    errors: errorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;