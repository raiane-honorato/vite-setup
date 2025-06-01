import { css } from "@emotion/react";
import { useState } from "react";

export function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <div css={styles.counter}>Counter: {counter}</div>

      <button onClick={() => setCounter((prev) => prev + 1)}>Increment</button>
    </>
  );
}

const styles = {
  counter: css`
    color: blue;
  `,
};
