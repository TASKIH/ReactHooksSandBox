import React, {useCallback, useContext, useEffect, useReducer, useState} from 'react';
import {CounterContext, CounterProvider} from './Context';

import './App.css';

import PubSub from 'pubsub-js';


function Counter() {
  const {state, dispatch} = useContext(CounterContext);

  const dataObj = {test: '1a2', test2: 'b2b'};
  return (
    <div>
      <h5>Count: {state.count}</h5>
      <button onClick={() => {PubSub.publish('SubscTest', dataObj)}}>publish</button>
      <button onClick={() => {dispatch({type: "increment", count:2});}}>+</button>
      <button onClick={() => {dispatch({type: "decrement", count:2});}}>-</button>
    </div>
  );
}
function SeparateComponent() {
  const {state} = useContext(CounterContext);
  const [suscribeToken, setSuscribeToken] = useState();

  const subscFunc = useCallback((elm, val) => {
    console.log(elm);
    console.log(val);
  });

  useEffect(() => {
    setSuscribeToken(PubSub.subscribe('SubscTest', subscFunc));
    return () => {
      PubSub.unsubscribe(suscribeToken);
    }
  },[]);

  return (<div>
          <h1>Shared Count: {state.count}</h1>
          {/* TODO: FETCH*/}
          <button onClick={() => {}}>
            Fetch Again
          </button>
        </div>
      );
}

function App() {
  return (
    <div className="App">
      <CounterProvider>
        <Counter />
        <SeparateComponent />
      </CounterProvider>
    </div>
  );
}

export default App;
