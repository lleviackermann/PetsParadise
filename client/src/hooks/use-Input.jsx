import { useReducer } from "react";
const initialInputState = {
  value: "",
  checked: false,
};

const validation = (type, value) => {
  if (type === "email") {
    return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value);
  }
  if (type === "name") {
    return /^[A-Z][a-zA-Z0-9]{6,}$/.test(value);
  }
  if (type === "password") {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(value);
  }
};

const inputStateReducer = (state, action) => {
  if (action.type === "CHANGE") {
    return { value: action.value, checked: state.checked };
  }

  if (action.type === "BLUR") {
    console.log(action);
    return { value: state.value, checked: true };
  }
  //   if (action.type === "RESET") {
  //     return initialInputState;
  //   }
  return initialInputState;
};

const useInput = (type) => {
  const [initialState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );
  const validValue = validation(type, initialState.value);
  const error = !validValue && initialState.checked;
  //   console.log(type, error, validValue);

  const inputChangeHandler = (event) => {
    // alert(event.target.value);
    dispatch({ type: "CHANGE", value: event.target.value });
  };
  const inputBlurHandler = (event) => {
    console.log("Blur handler called");
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };
  return {
    value: initialState.value,
    isValid: validValue,
    error,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
