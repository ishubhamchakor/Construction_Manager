import { SET_PROJECT_ID } from './projectActions';

const initialState = {
    projectId: null,
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROJECT_ID:
            return { ...state, projectId: action.projectId };
        default:
            return state;
    }
};

export default projectReducer;