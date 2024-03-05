const INITIAL_STATE = {
    tasks: [],
    filter: 'All',
  };
  
  let id = 0;
  
  const todoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'ADD_TASK':
        return {
          ...state,
          tasks: [
            ...state.tasks,
            {
              name: action.payload.name,
              priority: action.payload.priority,
              isCompleted: action.payload.isCompleted,
              id: id++,
            },
          ],
        };
      case 'REMOVE_TASK':
        // console.log('task', action.payload);
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.payload),
        };
  
      case 'MARK_AS_COMPLETE':
        return {
          ...state,
          tasks: state.tasks.map(task =>
            task.id === action.payload ? {...task, isCompleted: true} : task,
          ),
        };
  
      case 'FILTER_TASKS':
        return {
          ...state,
          filter: action.payload,
        };
      case 'RESET_TODO':
        return INITIAL_STATE;
      default:
        return state;
    }
  };
  
  export default todoReducer;