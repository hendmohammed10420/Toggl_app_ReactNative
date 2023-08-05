import React from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import {Text, Card, Button} from 'react-native-paper';
import {useTaskContext} from '../context/TaskContext';

const TasksList = () => {
  const {tasks, deleteTask} = useTaskContext();

  const calculateDuration = (startTime: Date, endTime: Date) => {
    const diff = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m`;
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  type Task = {
    id: number;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
  };

  const renderItem = ({item}: {item: Task}) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>Duration: {calculateDuration(item.startTime, item.endTime)}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          labelStyle={styles.deleteButton}
          onPress={() => handleDeleteTask(item.id)}>
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <>
          <Image
            source={require('../assets/empty.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>No tasks found.</Text>
        </>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  deleteButton: {
    color: 'red',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 1,
  },
  image: {
    width: 250,
    height: 250,
    marginLeft: 50,
    alignItems: 'center',
  },
});

export default TasksList;
