import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice'; // Correct the import to match the usage below
import projectReducer from './Slice/projectReducer';

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Maps the 'auth' slice to authReducer
    project: projectReducer, // Maps the 'project' slice to projectReducer
  },
});

export default store;
