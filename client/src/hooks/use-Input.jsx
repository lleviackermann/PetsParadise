import { useReducer } from "react";
const initialInputState = {
  value: "",
  checked: false,
};

let employeePasswords = [
  "doctor@1",
  "doctor@2",
  "doctor@3",
  "doctor@4",
  "employee@1",
  "employee@2",
  "employee@3",
  "employee@4",
  "employee@5",
  "employee@6",
  "admin123",
  "manager@1",
];

const validation = (type, value) => {
  if (type === "email") {
    // /^a\d{4}/
    if (/^a.{4}/.test(value)) {
      return true;
    }
    if (/^E\d{3}/.test(value) && value.length == 4) {
      return true;
    }
    if (/^M\d{3}/.test(value) && value.length == 4) {
      return true;
    }
    return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value);
  }
  if (type === "name") {
    return /^[A-Z][a-zA-Z]{2,}$/.test(value);
  }
  if (type === "password") {
    if (employeePasswords.includes(value) || value.startsWith("employee@")) {
      return true;
    }
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(value);
  }
};

const inputStateReducer = (state, action) => {
  if (action.type === "CHANGE") {
    return { value: action.value, checked: state.checked };
  }

  if (action.type === "BLUR") {
    return { value: state.value, checked: true };
  }
  return initialInputState;
};

const useInput = (type) => {
  const [initialState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );
  const validValue = validation(type, initialState.value);
  const error = !validValue && initialState.checked;

  const inputChangeHandler = (event) => {
    dispatch({ type: "CHANGE", value: event.target.value });
  };
  const inputBlurHandler = (event) => {
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
