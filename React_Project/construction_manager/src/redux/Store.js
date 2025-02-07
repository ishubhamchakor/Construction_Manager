import { configureStore } from '@reduxjs/toolkit';
import authReducer from  './Slice/authSlice'; // Correct the import to match the usage below
<<<<<<< Updated upstream
import projectReducer from './Slice/projectReducer';
=======
>>>>>>> Stashed changes

const store = configureStore({
  reducer: {
    auth: authReducer, // Ensure this matches the imported reducer
    project: projectReducer,
  },
});

export default store;