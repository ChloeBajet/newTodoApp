import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import {removeTask, markAsComplete, filterTasks} from '../redux/actionCreators';
import PriorityButtons from './PriorityButtons';
const TodoList = () => {
  const {tasks, filter} = useSelector(state => state.todoReducer);
  const dispatch = useDispatch();

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

  const filteredUncomplete = uncompletedTasks?.filter(
    task => task.priority === filter,
  );

  const priorityLevels = ['All', 'High', 'Medium', 'Low'];
  const displayedTasks =
    filter === 'All' ? uncompletedTasks : filteredUncomplete;

  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={{fontSize: 25, fontWeight: 700}}>
          Tasks - {displayedTasks?.length}
        </Text>

        {uncompletedTasks?.length !== 0 && (
          <PriorityButtons
            priorityLevels={priorityLevels}
            priority={filter}
            setPriority={e => dispatch(filterTasks(e))}
          />
        )}

        <FlatList
          renderItem={renderItem}
          data={displayedTasks}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      <View style={styles.mainContainer}>
        <Text style={{fontSize: 25, fontWeight: 700}}>
          Completed Tasks - {completedTasks?.length}
        </Text>
        <FlatList
          renderItem={renderComplete}
          data={completedTasks}
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
});
export default TodoList;