import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit'
import { forgotPasswordApi, getUserApi, loginUserApi, logoutApi, registerUserApi, resetPasswordApi, TLoginData, TRegisterData, updateUserApi } from "../utils/burger-api"
import { TUser } from '@utils-types';
import { setCookie } from '../utils/cookie';
import { RootState } from '../services/store';

export const loginUserThunk = createAsyncThunk(
    'users/loginUser',
    async ({ email, password }: TLoginData, { rejectWithValue }) => {
        try {
            const data = await loginUserApi({ email, password })
            setCookie('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const registerUserThunk = createAsyncThunk(
    'users/registerUser',
    async ({ email, name, password }: TRegisterData, { rejectWithValue }) => {
        try {
            const data = await registerUserApi({ email, name, password })
            setCookie('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const forgotPasswordThunk = createAsyncThunk(
    'users/forgotPassword',
    async (emailData: { email: string }, { rejectWithValue }) => {
        try {
            const data = await forgotPasswordApi(emailData)
            return data;
        } catch (error) {
            rejectWithValue(error)
        }
    }
);

export const resetPasswordThunk = createAsyncThunk(
    'users/resetPassword',
    async (resetPasswordData: { password: string; token: string }, {rejectWithValue}) => {
        try {
            const data = await resetPasswordApi(resetPasswordData);
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

export const getUserThunk = createAsyncThunk(
    'user/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getUserApi()
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateUserThunk = createAsyncThunk(
    'user/updateUser',
    async (user: TRegisterData, { rejectWithValue }) => {
        try {
            const data = await updateUserApi(user);
            return data
        } catch (error) {
          return rejectWithValue(error)  
        }
    }
)

export const logoutUserThunk = createAsyncThunk(
    'user/logoutUser',
    async (_, {rejectWithValue}) => {
        try {
            const data = await logoutApi();
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }        
    }
)

export interface UserState {
    isInit: boolean;
    isLoading: boolean;
    user: TUser | null;
    error: string | null;
}

const initialState: UserState = {
    isInit: false,
    isLoading: false,
    user: null,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        init: (state) => {
            state.isInit = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUserThunk.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loginUserThunk.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.isInit = true;
            state.error = payload as string
        });
        builder.addCase(loginUserThunk.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isInit = true;
            state.user = payload.user
        });
        builder.addCase(registerUserThunk.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(registerUserThunk.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.isInit = true;
            state.error = payload as string
        });
        builder.addCase(registerUserThunk.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isInit = true;
            state.user = payload.user
        });
        builder.addCase(getUserThunk.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUserThunk.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.isInit = true;
            state.error = payload as string
        });
        builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isInit = true;
            state.user = payload.user;
        });

        builder.addCase(updateUserThunk.fulfilled, (state, { payload }) => {
            state.user = payload.user
        });
        builder.addCase(logoutUserThunk.fulfilled, (state) => {
            state.user = null;
        });
        builder.addCase(forgotPasswordThunk.rejected, (state, {payload}) => {
            state.error = payload as string;
        });
        builder.addCase(forgotPasswordThunk.fulfilled, () => {});
        builder.addCase(resetPasswordThunk.rejected, (state, {payload}) => {
            state.error = payload as string;
        });
        builder.addCase(resetPasswordThunk.fulfilled, () => {});
    }
});

export const { init } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer