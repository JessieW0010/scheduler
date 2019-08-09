import React, { useState } from "react";

// return an object with a property mode
export default function useVisualMode(initial) {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([]);

  function transition(change, replace = FALSE) {
    setHistory((prev) => [...prev, mode]);
    return setMode(change);
  }

  return { mode , transition: setMode }
}