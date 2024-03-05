import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import PriorityButtons from './PriorityButtons';
import TodoList from './TodoList';
import {addTask} from '../redux/actionCreators';

const Todo = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('High');
  const priorityLevels = ['High', 'Medium', 'Low'];

  const payload = {
    name: task,
    priority: priority,
    isCompleted: false,
  };

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardWrapper}>
          <View style={styles.flexColumn}>
            <TextInput
              style={styles.inputContainer}
              placeholder="Add new task"
              value={task}
              onChangeText={input => setTask(input)}
            />
            <PriorityButtons
              priority={priority}
              setPriority={setPriority}
              priorityLevels={priorityLevels}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch(addTask(payload));
              setTask('');
              setPriority('High');
            }}
            disabled={task === ''}>
            <View style={styles.plusContainer(task && priority)}>
              <Text style={{fontSize: 25, fontWeight: 600}}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <TodoList />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 25,
    flex: 1,
  },

  keyboardWrapper: {
    paddingTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 40,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 260,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  plusContainer: isActive => ({
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isActive ? '#55BCF6' : '#E8EAED',
  }),
});

export default Todo;