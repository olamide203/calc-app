import { createContext, useEffect, useReducer } from 'react';
import { Expression } from 'hyoka';

// create the input context
const InputContext = createContext();

// actioons
const ACTIONS = {
  DISPLAY: 'display',
  EVALUATE: 'evaluate',
  RESET: 'reset',
  DELETE_BACKWARD: 'deleteBackward',
  DELETE_FORWARD: 'deleteForward',
  DELETE_SELECTION: 'deleteSelection',
  SELECTION_CHANGE: 'selectionChange',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.DISPLAY:
      return {
        ...state,
        expression: `${state.expression.substring(0, state.selectionStart)}${
          action.payload.data
        }${state.expression.substring(state.selectionEnd)}`,
        evaluation: '',
        selectionStart: state.selectionStart + action.payload.data.length,
        selectionEnd: state.selectionStart + action.payload.data.length,
      };
      break;
    case ACTIONS.EVALUATE:
      try {
        return {
          ...state,
          evaluation: new Expression(
            state.expression.replace(/[×]/g, '*')
          ).evaluate(),
        };
      } catch (error) {
        console.log(error);
        return {
          ...state,
          evaluation: 'SYNTAX ERROR',
        };
      }
      break;
    case ACTIONS.RESET:
      return {
        expression: '',
        evaluation: '',
        selectionStart: 1,
        selectionEnd: 1,
      };
      break;
    case ACTIONS.DELETE_BACKWARD:
      return {
        ...state,
        expression: `${state.expression.substring(
          0,
          state.selectionStart - 1
        )}${state.expression.substring(state.selectionStart)}`,
        evaluation: '',
        selectionStart: state.selectionStart - 1,
        selectionEnd: state.selectionEnd - 1,
      };
      break;
    case ACTIONS.DELETE_FORWARD:
      return {
        ...state,
        expression: `${state.expression.substring(
          0,
          state.selectionStart
        )}${state.expression.substring(state.selectionStart + 1)}`,
        evaluation: '',
      };
      break;
    case ACTIONS.DELETE_SELECTION:
      return {
        ...state,
        expression: `${state.expression.substring(
          0,
          state.selectionStart
        )}${state.expression.substring(state.selectionEnd)}`,
        selectionEnd: state.selectionStart,
        evaluation: '',
      };
      break;
    case ACTIONS.SELECTION_CHANGE:
      return {
        ...state,
        selectionStart: action.payload.selectionStart,
        selectionEnd: action.payload.selectionEnd,
      };
      break;
    default:
      return state;
  }
}
export const InputProvider = ({ children }) => {
  const [inputState, dispatch] = useReducer(reducer, {
    expression: 'sin(π/2)',
    evaluation: new Expression('sin(π/2)').evaluate(),
    selectionStart: 8,
    selectionEnd: 8,
  });

  return (
    <InputContext.Provider value={{ inputState, dispatch, ACTIONS }}>
      {children}
    </InputContext.Provider>
  );
};

export default InputContext;
