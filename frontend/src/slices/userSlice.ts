
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// interface CurrentUser {
// 	id: number;
// 	name: string;
// 	email: string;
// 	: number;
// 	created_at: string;
// 	email_verified_at: null;
// 	updated_at: string
// }

interface UserState {
  userId: number | null;
  token: string | null;
  role: string | null;

}

// const  initialCurrentUser = {
// 	id: 0,
// 	name: '',
// 	email: '',
// 	: 0,
// 	created_at: '',
// 	email_verified_at: null,
// 	updated_at: ''
// }

const initialState: UserState = {
  userId: 0,
  token: sessionStorage.getItem('ACCESS_TOKEN') || null,
  role: sessionStorage.getItem('ROLE') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
		state.userId = action.payload;
		// if(action.payload) {
		// 	sessionStorage.setItem('CURRENT_USER_ID', action.payload);
		// } else {
		// 	sessionStorage.removeItem('CURRENT_USER_ID');
		// }
    },

    setToken: (state, action: PayloadAction<string | null>) => {
		state.token = action.payload;
		if (state.token) {
			sessionStorage.setItem('ACCESS_TOKEN', state.token);
		} 
		console.log('token action: ', state.token)
		if(!state.token) {
			sessionStorage.removeItem('ACCESS_TOKEN');
		}
    },

	setIsSeller: (state, action: PayloadAction<string | null>) => {
		state.role = action.payload;
		//  In router.tsx I don't use function component so I need to set  into sessionStorage
		if(state.role) {
			sessionStorage.setItem('ROLE', state.role)
		}else {
			sessionStorage.removeItem('ROLE')
		}
	},
  },
});

export const { setCurrentUser, setToken , setIsSeller } = userSlice.actions;

export default userSlice.reducer;
