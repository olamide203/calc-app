import { createContext, useEffect, useReducer } from 'react';
import { Expression } from 'hyoka';
import useLocalStorage from 'use-local-storage';

// create the input context
const InputContext = createContext();

// actioons
const ACTIONS = {
  DISPLAY: 'display',
  EVALUATE: 'evaluate',
  RESET: 'reset',
  ENTER: 'enter',
  SELECT: 'select',
  DELETE_SELECTION: 'deleteSelection',
  DELETE: 'delete',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.DISPLAY:
      return {
        ...state,
        expression: action.payload.data,
        evaluation: '',
        start: action.payload.start,
        end: action.payload.end,
      };
    case ACTIONS.ENTER:
      return {
        ...state,
        expression: `${state.expression.slice(0, state.start)}${
          action.payload.data
        }${state.expression.slice(state.end)}`,
        start: state.start + 1,
        end: state.start + 1,
      };
    case ACTIONS.DELETE_SELECTION:
      return {
        ...state,
        expression: `${state.expression.slice(
          0,
          state.start
        )}${state.expression.slice(state.end)}`,
        start: Math.max(state.start, 0),
        end: Math.max(state.start, 0),
      };
    case ACTIONS.DELETE:
      return {
        ...state,
        expression: `${state.expression.slice(
          0,
          state.start - 1
        )}${state.expression.slice(state.end)}`,
        start: Math.max(state.start - 1, 0),
        end: Math.max(state.start - 1, 0),
      };
    case ACTIONS.SELECT:
      return {
        ...state,
        start: action.payload.start,
        end: action.payload.end,
      };
    case ACTIONS.EVALUATE:
      try {
        return {
          ...state,
          evaluation:
            state.expression &&
            new Expression(state.expression.replace(/[×]/g, '*')).evaluate(),
        };
      } catch (error) {
        return {
          ...state,
          evaluation: 'SYNTAX ERROR',
        };
      }
    case ACTIONS.RESET:
      return {
        expression: '',
        evaluation: '',
        start: 0,
        end: 0,
      };
    default:
      return state;
  }
}
export const InputProvider = ({ children }) => {
  const [expression, storeExpression] = useLocalStorage('expression', '6/3*2');
  let evaluation;
  try {
    evaluation = new Expression(expression).evaluate();
  } catch (error) {
    evaluation = '';
  }
  const [inputState, dispatch] = useReducer(reducer, {
    expression,
    evaluation,
    start: expression.length,
    end: expression.length,
  });

  return (
    <InputContext.Provider value={{ inputState, dispatch, ACTIONS }}>
      {children}
    </InputContext.Provider>
  );
};

export default InputContext;
