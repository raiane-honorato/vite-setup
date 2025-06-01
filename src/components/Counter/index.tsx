import { useState } from "react";

export function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <h1>Counter: {counter}</h1>

      <button onClick={() => setCounter((prev) => prev + 1)}>Increment</button>
    </>
  );
}
