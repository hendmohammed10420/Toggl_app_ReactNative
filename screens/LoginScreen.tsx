/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image} from 'react-native';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
  StyleProp,
  ViewStyle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const CustomIcon = ({
  name,
  size,
  color,
  onPress,
  style, // Add style prop to the type definition
}: {
  name: string;
  size: number;
  color: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>; // Define the type for the style prop
}) => {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
      onPress={onPress}
      style={style} // Pass the style prop to the MaterialCommunityIcons component
    />
  );
};

type LoginScreenProps = {
  onLogin?: () => void;
};

interface NavigationProps {
  navigate: (screen: string) => void;
}

const LoginScreen = ({onLogin}: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true); // State to track email validation status
  const [isPasswordValid, setPasswordValid] = useState(true); // State to track password validation status
  const navigation = useNavigation<NavigationProps>();

  const validateEmail = (text: string) => {
    const isValid = /\S+@\S+\.\S+/.test(text);
    setEmailValid(isValid);
    return isValid;
  };

  const validatePassword = (text: string) => {
    const isValid = text.length >= 8;
    setPasswordValid(isValid);
    return isValid;
  };

  const isLoginButtonDisabled = () => {
    return !isEmailValid || !isPasswordValid || email === '' || password === '';
  };

  const handleLogin = async () => {
    try {
      const userData = {
        email,
        password,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
      if (onLogin) {
        onLogin();
      }
    }

    navigation.navigate('HomeScreen');
  };

  const handleSignUp = () => {
    // Handle SignUp
  };

  const handleForgotPassword = () => {
    Linking.openURL('https://toggl.com/track/forgot-password/');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/login.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.normalText}> Login to your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            !isEmailValid && {borderColor: 'red'}, // Add red border for invalid email
          ]}
          placeholder="Email"
          onChangeText={text => {
            setEmail(text);
            validateEmail(text); // Validate email on every change
          }}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onBlur={() => validateEmail(email)} // Validate email when the input loses focus
        />
        {!isEmailValid && <Text style={styles.errorText}>Invalid email</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.passwordInput,
              !isPasswordValid && {borderColor: 'red'}, // Add red border for short password
            ]}
            placeholder="Password"
            value={password}
            onChangeText={text => {
              setPassword(text);
              validatePassword(text);
            }}
            secureTextEntry={!isPasswordVisible}
            onBlur={() => validatePassword(password)}
          />
          <CustomIcon
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={20}
            color={colors.primary}
            onPress={togglePasswordVisibility}
            style={styles.iconStyle} // Apply styles for the icon
          />
        </View>
        {!isPasswordValid && (
          <Text style={styles.errorText}>
            Password must be at least 8 characters long
          </Text>
        )}
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isLoginButtonDisabled()
                ? colors.second
                : colors.primary,
            },
          ]}
          onPress={handleLogin}
          disabled={isLoginButtonDisabled()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.account}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUp}>SignUp</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    backgroundColor: 'lightblue',
    width: 400,
    borderBottomLeftRadius: 150, // Set the radius for the bottom left corner
    borderBottomRightRadius: 150,
    marginBottom: 25,
  },
  image: {
    width: 250,
    height: 250,
    marginLeft: 65,
    alignItems: 'center',
  },
  welcomeContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: colors.primary,
    fontSize: 24,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  normalText: {
    color: colors.primary,
    fontSize: 12,
    marginTop: 2,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '95%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginStart: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items with space in between
  },
  passwordContainer: {
    width: '95%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items with space in between
    paddingHorizontal: 10, // Add horizontal padding to create space for the icon
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginStart: 10,
  },
  passwordInput: {
    flex: 1, // Expand the TextInput to take available space
    height: 40, // Specify the height explicitly
  },
  iconStyle: {
    padding: 8, // Add padding to the icon to make it clickable
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#2b648b',
    marginTop: 10,
    marginStart: 10,
  },
  account: {
    color: '#2b648b',
    marginTop: 10,
  },
  signUpContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  signUp: {
    color: '#2b648b',
    marginTop: 10,
    textDecorationLine: 'underline',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default LoginScreen;
