import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const PriorityButtons = ({priority, setPriority, priorityLevels}) => {
  return (
    <View style={styles.setPrioContainer}>
      {priorityLevels.map(prioLevel => (
        <TouchableOpacity
          key={prioLevel}
          onPress={() => {
            setPriority(prioLevel);
          }}
          style={[styles.prioContainer(priority === prioLevel)]}>
          <Text>{prioLevel}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  setPrioContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  prioContainer: isActive => ({
    padding: 10,
    borderRadius: 30,
    backgroundColor: isActive ? '#55BCF6' : null,
  }),
});

export default PriorityButtons;
