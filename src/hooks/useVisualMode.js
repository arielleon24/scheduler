import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); ///history represents previous state* 

  function transition(newState, replace = false) {
    let newHistory = [...history] 
    if (replace) {
      newHistory.pop();
      newHistory = [...newHistory, newState];
      setMode(newState);
      setHistory(newHistory);
    } else {
      newHistory = [...history, newState]; 
      setMode(newState);
      setHistory(newHistory); 
    }

  };
  
  function back() { 
    const newHistory = [...history]; 
    if (history.length > 1) {
      newHistory.pop(); 
      setHistory(newHistory)
      setMode(history[newHistory.length -1]);
    }
  }

  return { mode, transition, back };
}

