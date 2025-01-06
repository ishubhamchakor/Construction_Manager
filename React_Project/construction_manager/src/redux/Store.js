import { configureStore } from '@reduxjs/toolkit';
import authReducer from  '../redux/Slice/authSlice'; // Correct the import to match the usage below

const store = configureStore({
  reducer: {
    auth: authReducer, // Ensure this matches the imported reducer
  },
});

export default store;