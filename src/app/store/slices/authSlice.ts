import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  AuthState,
  Credentials,
  LoginResponse,
  User,
} from 'src/app/common/types';
import { axiosRequestHelper } from 'src/app/common/utils';

// Thunks for login and logout
export const loginUser = createAsyncThunk<
  LoginResponse,
  Credentials,
  { rejectValue: string }
>('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const data = await axiosRequestHelper('post', 'auth/login', credentials);
    return data as LoginResponse;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axiosRequestHelper('post', 'auth/logout');
    } catch (error) {
      return rejectWithValue(error as string);
    }
  },
);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        },
      )
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? 'Login failed';
        },
      )
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
