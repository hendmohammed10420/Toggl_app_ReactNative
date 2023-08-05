/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTaskContext} from '../context/TaskContext';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import {Image} from 'react-native';

const CreationPage = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [isValidateName, setNameValid] = useState(true);
  const [isValidDescription, setDescriptionValid] = useState(true);

  const {addTask} = useTaskContext();
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
  const validateName = (text: string) => {
    const isValid = text.length <= 100;
    setNameValid(isValid);
    return isValid;
  };

  const validDescription = (text: string) => {
    const isValid = text.length <= 300;
    setDescriptionValid(isValid);
    return isValid;
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
    return (
      (taskName !== '' && taskDescription !== '') ||
      (!isValidateName && !isValidDescription)
    );
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
      <Image
        source={require('../assets/list.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <TextInput
        style={[
          styles.input,
          !isValidateName && {borderColor: 'red'}, // Add red border for invalid email
        ]}
        placeholder="taskName"
        value={taskName}
        onChangeText={text => {
          setTaskName(text);
          validateName(text);
        }}
        autoCorrect={false}
        onBlur={() => validateName(taskName)} // Validate email when the input loses focus
      />
      {!isValidateName && <Text style={styles.errorText}>Invalid Title</Text>}

      <TextInput
        style={[
          styles.input,
          !isValidDescription && {borderColor: 'red'}, // Add red border for invalid email
        ]}
        placeholder="taskDescription"
        value={taskDescription}
        onChangeText={text => {
          setTaskDescription(text);
          validDescription(text);
        }}
        autoCorrect={false}
        onBlur={() => validateName(taskDescription)} // Validate email when the input loses focus
        multiline
      />
      {!isValidDescription && (
        <Text style={styles.errorText}>Invalid Description </Text>
      )}
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
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: !isFormValid() ? colors.second : colors.primary,
          },
        ]}
        onPress={handleCreateTask}
        disabled={!isFormValid()}>
        <Text style={styles.buttonText}>Create Task</Text>
      </TouchableOpacity>

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
const colors = {
  primary: '#2b648b',
  second: '#ccc',
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
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items with space in between
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
    backgroundColor: '#2b648b',
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
  errorText: {
    color: 'red',
    marginBottom: 5,
    textAlign: 'center',
  },
  button: {
    width: '95%',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginStart: 10,
  },
  image: {
    width: 280,
    height: 280,
    marginLeft: 50,
    alignItems: 'center',
  },
});

export default CreationPage;
