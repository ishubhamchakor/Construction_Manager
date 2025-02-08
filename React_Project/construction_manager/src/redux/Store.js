import { configureStore } from '@reduxjs/toolkit';

import authReducer from  './Slice/authSlice'; // Correct the import to match the usage below

import projectReducer from './Slice/projectReducer';

import authReducer from '../redux/Slice/authSlice'; // Correct the import to match the usage below
import projectReducer from '../redux/Slice/projectReducer';


const store = configureStore({
  reducer: {
    auth: authReducer, // Ensure this matches the imported reducer
    project: projectReducer,
  },
});

export default store;