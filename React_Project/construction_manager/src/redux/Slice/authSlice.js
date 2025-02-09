// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null, // Stores user details
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload; // Save user object (including username)
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Store user in local storage
      localStorage.setItem('isAuthenticated', 'true'); // Track auth status
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem('user'); // Clear stored user data
      localStorage.removeItem('isAuthenticated'); // Remove auth flag
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
