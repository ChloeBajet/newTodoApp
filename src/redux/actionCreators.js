export const addTask = payload => ({
  type: 'ADD_TASK',
  payload: payload,
});

export const removeTask = payload => {
  return {
    type: 'REMOVE_TASK',
    payload: payload,
  };
};

export const markAsComplete = payload => ({
  type: 'MARK_AS_COMPLETE',
  payload: payload,
});

export const filterTasks = payload => ({
  type: 'FILTER_TASKS',
  payload: payload,
});
