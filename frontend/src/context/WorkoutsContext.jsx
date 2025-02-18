import { createContext, useReducer } from 'react';

// Creating a context for workouts
export const WorkoutsContext = createContext();

// Reducer function to handle state updates based on action types
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':  // Sets the workouts list
      return { 
        workouts: action.payload 
      };
    case 'CREATE_WORKOUT':  // Adds a new workout to the existing list
      return { 
        workouts: [action.payload, ...state.workouts] 
      };
    case 'DELETE_WORKOUT':  // Adds a new workout to the existing list
      return { 
        workouts: state.workouts.filter((w)=>w._id!=action.payload._id)
      };
    default:
      return state;
  }
};

// Context Provider to manage workouts state
export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: null 
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  );
};
