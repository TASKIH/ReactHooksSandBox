import React, {useReducer} from 'react';

let reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "increment":
      return {...state, count: state.count + action.count };
    case "decrement":
      return {...state, count: state.count - action.count};
    default:
      return;
  }
};

const initialState = {count: 0};
const CounterContext = React.createContext(initialState);


function CounterProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CounterContext.Provider value={{state, dispatch}}>
      {props.children}
    </CounterContext.Provider>
  )
}

export { CounterContext, CounterProvider};