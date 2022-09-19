import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value };
  }
  if (action.type === 'RESET') {
    return { isTouched: false, value: '' };
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const [valueIsValid, errorHelperText] = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value, // The input given by the user
    isValid: valueIsValid, // Whether input is valid
    hasError, // Whether the input has error, trigger only after the user start inputting
    errorHelperText, // Hint that is given to the user when there is an error
    valueChangeHandler, // A handler function that change the value and touch state
    inputBlurHandler, // A handler function that marks the input as touched when user leave the input
    reset, // A function that resets the input as if the user never touch it
  };
};

export default useInput;