import { configureStore } from '@reduxjs/toolkit';

// Import reducers (only once for each)
import authReducer from './Slice/authSlice';
import projectReducer from './Slice/projectReducer';

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Maps the 'auth' slice to authReducer
    project: projectReducer, // Maps the 'project' slice to projectReducer
  },
});

export default store;
