import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTaskContext} from '../context/TaskContext';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation

const CreationPage = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [isValidateName, setNameValid] = useState(true); // State to track email validation status
  const [isValidDescription, setDescriptionValid] = useState(true); // State to track password validation statusconst {addTask} = useTaskContext();
  const navigation = useNavigation<NavigationProps>();
  interface NavigationProps {
    navigate: (screen: string) => void;
  }
  const handleStartTimeChange = (event: any, selectedTime: Date) => {
    const currentTime = selectedTime || startTime;
    setShowStartTimePicker(false);
    setStartTime(currentTime);
  };

  const handleEndTimeChange = (event: any, selectedTime: Date) => {
    const currentTime = selectedTime || endTime;
    setShowEndTimePicker(false);
    setEndTime(currentTime);
  };
  const formatTime = (time: Date) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const isFormValid = () => {
    return taskName !== '' && taskDescription !== '';
  };
  const validateName = (text: string) => {
    const isValid = /\S+@\S+\.\S+/.test(text);
    setNameValid(isValid);
    return isValid;
  };

  const validDescription = (text: string) => {
    const isValid = text.length >= 8;
    setDescriptionValid(isValid);
    return isValid;
  };

  const handleCreateTask = () => {
    if (isFormValid()) {
      const newTask = {
        id: Date.now(),
        title: taskName,
        description: taskDescription,
        startTime: startTime,
        endTime: endTime,
      };

      // Check if the TaskContext is available
      if (addTask) {
        addTask(newTask); // Save the task using the context
      }

      setTaskName('');
      setTaskDescription('');
      setStartTime(new Date());
      setEndTime(new Date());

      navigation.navigate('TasksList');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="taskName"
        value={taskName}
        onChangeText={text => setTaskName(text)}
        maxLength={100}
      />
      <TextInput
        style={styles.input}
        placeholder="taskDescription"
        value={taskDescription}
        onChangeText={text => setTaskDescription(text)}
        maxLength={300}
        multiline
      />
      <TouchableOpacity
        onPress={() => setShowStartTimePicker(true)}
        style={styles.timePicker}>
        <Button style={styles.startButton} labelStyle={styles.buttonText}>
          Start Task: {formatTime(startTime)}
        </Button>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setShowEndTimePicker(true)}
        style={styles.timePicker}>
        <Button style={styles.endButton} labelStyle={styles.buttonText}>
          End Task: {formatTime(endTime)}
        </Button>
      </TouchableOpacity>
      <Button
        style={styles.createButton}
        mode="contained"
        onPress={handleCreateTask}
        disabled={!isFormValid()}>
        Create Task
      </Button>

      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleStartTimeChange}
        />
      )}

      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleEndTimeChange}
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    justifyContent: 'center',
    marginBottom: 16,
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  timeText: {
    fontSize: 16,
  },
  createButton: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    marginBottom: 16,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 4,
    color: 'white',
  },
  endButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 4,
    color: 'white',
  },
  buttonText: {
    color: 'white',
  },
});

export default CreationPage;
