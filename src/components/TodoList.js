import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {removeTask, markAsComplete, filterTasks} from '../redux/actionCreators';
import PriorityButtons from './PriorityButtons';

const TodoList = () => {
  const dispatch = useDispatch();
  const {tasks, filter} = useSelector(state => state.todoReducer);
  const [searchFilter, setSearchFilter] = useState('');
  const priorityLevels = ['All', 'High', 'Medium', 'Low'];

  const renderItem = ({item}) => {
    return (
      <View style={styles.taskContainer}>
        <View style={styles.nameContainer}>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text>{item.priority}</Text>
        </View>

        <TouchableOpacity
          onPress={() => dispatch(markAsComplete(item.id))}
          style={styles.buttonContainer(false)}>
          <Text>Complete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(removeTask(item.id));
          }}
          style={styles.buttonContainer(true)}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderComplete = ({item}) => {
    return (
      <View style={styles.taskContainer}>
        <View style={styles.name}>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.name}>
          <Text>{item.priority}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            dispatch(removeTask(item.id));
          }}
          style={styles.buttonContainer(true)}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const uncompletedTasks = tasks?.filter(task => task.isCompleted === false);
  const completedTasks = tasks?.filter(task => task.isCompleted === true);

  const filterByPrio = uncompletedTasks?.filter(
    task => task.priority === filter,
  );

  const displayedTasks = filter === 'All' ? uncompletedTasks : filterByPrio;

  const displayUncompleteWithSearchFilter =
    searchFilter !== ''
      ? displayedTasks?.filter(task => task.name === searchFilter)
      : displayedTasks;

  const displayCompletedWithSearchFilter =
    searchFilter !== ''
      ? completedTasks?.filter(task => task.name === searchFilter)
      : completedTasks;

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.flexColumn}>
          <Text style={{fontSize: 25, fontWeight: 700}}>
            Tasks - {displayUncompleteWithSearchFilter?.length}
          </Text>
          <TextInput
            style={styles.inputContainer}
            placeholder="Search Task"
            value={searchFilter}
            onChangeText={input => setSearchFilter(input)}
          />
        </View>

        {uncompletedTasks?.length !== 0 && (
          <PriorityButtons
            priorityLevels={priorityLevels}
            priority={filter}
            setPriority={e => dispatch(filterTasks(e))}
          />
        )}

        <FlatList
          renderItem={renderItem}
          data={displayUncompleteWithSearchFilter}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      <View style={styles.mainContainer}>
        <Text style={{fontSize: 25, fontWeight: 700}}>
          Completed Tasks - {completedTasks?.length}
        </Text>
        <FlatList
          renderItem={renderComplete}
          data={displayCompletedWithSearchFilter}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  buttonContainer: isDelete => ({
    backgroundColor: isDelete ? '#F44949' : '#55BCF6',
    padding: 3,
    borderRadius: 5,
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  nameContainer: {
    flex: 0.4,
  },
  inputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 40,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '50',
  },
  flexColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default TodoList;
